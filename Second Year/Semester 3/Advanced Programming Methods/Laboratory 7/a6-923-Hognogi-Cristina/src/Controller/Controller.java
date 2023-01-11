package Controller;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Value.InterValue;
import Model.Value.RefValue;
import Repository.InterRepository;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// Class for the controller of the program (service)
public class Controller {
    InterRepository repo;
    boolean displayFlag = false;
    ExecutorService executorService; // for the parallel execution

    public Controller(InterRepository repo) {
        this.repo = repo;
    }

    public void setDisplayFlag(boolean displayFlag) {
        this.displayFlag = displayFlag;
    }

    public void oneStepForAllPrograms(List<ProgramState> programStates) throws InterruptedException, ExpEvalException, UtilitsException, StatExeExecption, IOException {
        programStates.forEach(programState -> {
            try {
                repo.logPrgStaExe(programState);
                display(programState);
            } catch (IOException | UtilitsException e) {
                System.out.println(e.getMessage());
            }
        });

        List<Callable<ProgramState>> callList = programStates.stream()
                .map((ProgramState p) -> (Callable<ProgramState>) (p::oneStep))
                .collect(Collectors.toList());

        List<ProgramState> newProgramList = executorService.invokeAll(callList).stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (ExecutionException | InterruptedException e) {
                        System.out.println(e.getMessage());
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        programStates.addAll(newProgramList);

        System.out.println(newProgramList);

        programStates.forEach(programState -> {
            try {
                repo.logPrgStaExe(programState);
            } catch (IOException | UtilitsException e) {
                System.out.println(e.getMessage());
            }
        });

        repo.setProgramStates(programStates);
    }

    public List<Integer> getAddrFromSymTable(Collection<InterValue> symTableValues) {
        return symTableValues.stream().filter(v -> v instanceof RefValue).map(v -> {
            RefValue v1 = (RefValue) v;
            return v1.getAddress();
        }).collect(Collectors.toList());
    }

    public List<Integer> getAddrFromHeap(Collection<InterValue> heapValues) {
        return heapValues.stream()
                .filter(v -> v instanceof RefValue)
                .map(v -> {
                    RefValue v1 = (RefValue) v;
                    return v1.getAddress();
                })
                .collect(Collectors.toList());
    }

    public Map<Integer, InterValue> safeGarbageCollector(List<Integer> symTableAddr, List<Integer> heapAddr, Map<Integer, InterValue> heap) {
        return heap.entrySet().stream()
                .filter(e -> (symTableAddr.contains(e.getKey()) || heapAddr.contains(e.getKey())))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public List<ProgramState> removeCompletedPrograms(List<ProgramState> inPrgList) {
        // removes the completed programs from the list of programs
        return inPrgList.stream().filter(p -> !p.isNotCompleted()).collect(Collectors.toList());
    }

    public void conservativeGarbageCollector(List<ProgramState> programStates) {
        List<Integer> symTableAddresses = Objects.requireNonNull(programStates.stream()
                        .map(p -> getAddrFromSymTable(p.getSymTable().values()))
                        .map(Collection::stream)
                        .reduce(Stream::concat).orElse(null))
                .collect(Collectors.toList());
        programStates.forEach(p -> {
            p.getHeap().setContent((HashMap<Integer, InterValue>) safeGarbageCollector(symTableAddresses, getAddrFromHeap(p.getHeap().getContent().values()), p.getHeap().getContent()));
        });
    }

    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException, IOException, InterruptedException {
        executorService = Executors.newFixedThreadPool(2);
        List<ProgramState> programStateList = removeCompletedPrograms(repo.getProgramList());

        while (programStateList.size() > 0) {
            conservativeGarbageCollector(programStateList);
            oneStepForAllPrograms(programStateList);
            programStateList = removeCompletedPrograms(repo.getProgramList());
        }

        executorService.shutdownNow();
        repo.setProgramStates(programStateList);
    }

    private void display(ProgramState programState) {
        if (displayFlag) {
            System.out.println(programState.toString());
        }
    }

    public InterRepository getRepository() {
        return repo;
    }
}

