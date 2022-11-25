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
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// Class for the controller of the program (service)
public class Controller {
    InterRepository repo;
    boolean displayFlag = false;

    public Controller(InterRepository repo) {
        this.repo = repo;
    }

    public void setDisplayFlag(boolean displayFlag) {
        // displayFlag is a boolean that indicates if the program should display the steps
        this.displayFlag = displayFlag;
    }

    public ProgramState oneStep(ProgramState state) throws UtilitsException, StatExeExecption, ExpEvalException {
        // executes one step of the program and gets the top statement from the stack
        InterStack<InterStatement> stack = state.getExeStack();

        if (stack.isEmpty())
            throw new StatExeExecption("Execution stack is empty!");

        InterStatement currentStatement = stack.pop();
        state.setExeStack(stack);
        return currentStatement.execute(state);
    }

    public Map<Integer, InterValue> unsafeGarbageCollector(List<Integer> symTableAddr, Map<Integer, InterValue> heap) {
        return heap.entrySet().stream().filter(e -> symTableAddr.contains(e.getKey())).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
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


    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException, IOException {
        // executes all the steps and displays the current state of the program
        ProgramState program = this.repo.getProgramList().get(0); /* get the first program from the list */
        this.repo.logPrgStaExe(program); /* log the program state */
        display(program);

        while (!program.getExeStack().isEmpty()) { // while the stack is not empty
            oneStep(program);
            /* garbage collector which removes the unreferenced values from the heap */
            program.getHeap().setContent((HashMap<Integer, InterValue>) safeGarbageCollector(getAddrFromSymTable(program.getSymTable().values()), getAddrFromHeap(program.getHeap().getContent().values()), program.getHeap().getContent()));
            this.repo.logPrgStaExe(program); // log the current state of the program
            display(program);
        }
    }

    private void display(ProgramState programState) {
        // displays the current state of the program if the displayFlag is true
        if (displayFlag) {
            System.out.println(programState.toString());
        }
    }

    public InterRepository getRepository() {
        // returns the repository
        return repo;
    }
}

