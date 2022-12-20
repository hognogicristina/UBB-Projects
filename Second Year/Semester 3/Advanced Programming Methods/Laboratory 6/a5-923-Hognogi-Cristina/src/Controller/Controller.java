package Controller;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Utilities.InterStack;
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
        // before the execution, print the PrgState List into the log file (the program states are printed in the log file)
        programStates.forEach(programState -> {
            try {
                repo.logPrgStaExe(programState);
                display(programState);
            } catch (IOException | UtilitsException e) {
                System.out.println(e.getMessage());
            }
        });

        List<Callable<ProgramState>> callList = programStates.stream() // get the list of callables (each callable is a program state)
                .map((ProgramState p) -> (Callable<ProgramState>) (p::oneStep)) // map each program state to a callable
                .collect(Collectors.toList()); // collect the list of callables

        List<ProgramState> newProgramList = executorService.invokeAll(callList).stream() // run concurrently the callables
                .map(future -> { // get the list of new created program states (completed execution)
                    try {
                        return future.get(); // get the program state
                    } catch (ExecutionException | InterruptedException e) {
                        System.out.println(e.getMessage());
                    }
                    return null;
                })
                .filter(Objects::nonNull) // remove the null program states
                .collect(Collectors.toList()); // collect the list of new program states
        programStates.addAll(newProgramList); // add the new program states to the list of existing program states

        programStates.forEach(programState -> { // update the repository
            try {
                repo.logPrgStaExe(programState);
            } catch (IOException | UtilitsException e) {
                System.out.println(e.getMessage());
            }
        });

        repo.setProgramStates(programStates); // update the repository
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
        // removes the unused values from the heap
        List<Integer> symTableAddresses = Objects.requireNonNull(programStates.stream() // get the list of symbol table addresses
                        .map(p -> getAddrFromSymTable(p.getSymTable().values())) // get the list of addresses from the symbol table values
                        .map(Collection::stream) // map each list of addresses to a stream
                        .reduce(Stream::concat).orElse(null)) // concatenate the streams
                .collect(Collectors.toList()); // collect the list of addresses
        programStates.forEach(p -> { // get the list of heap addresses
            p.getHeap().setContent((HashMap<Integer, InterValue>) safeGarbageCollector(symTableAddresses, getAddrFromHeap(p.getHeap().getContent().values()), p.getHeap().getContent()));
            // update the heap
        });
    }

    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException, IOException, InterruptedException {
        // executes all the steps and displays the current state of the program
        executorService = Executors.newFixedThreadPool(2); // create a new executor service with 2 threads
        List<ProgramState> programStateList = removeCompletedPrograms(repo.getProgramList()); // get the list of program states from the repository

        while (programStateList.size() > 0) { // while there are program states in the list
            conservativeGarbageCollector(programStateList); // garbage collector
            oneStepForAllPrograms(programStateList); // execute one step for all the program states
            programStateList = removeCompletedPrograms(repo.getProgramList()); // get the list of program states from the repository
        }

        executorService.shutdownNow(); // shutdown the executor service
        repo.setProgramStates(programStateList); // update the repository
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

