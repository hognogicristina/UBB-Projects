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

    /* Garbage Collector for the heap (removes the unused values from the heap) */
    public List<Integer> getAddrFromSymTable(Collection<InterValue> symTableValues) {
        /* gets the addresses from the symbol table values */
        return symTableValues.stream().filter(v -> v instanceof RefValue).map(v -> {
            /* filter the values that are RefValues and map them to their address */

            RefValue v1 = (RefValue) v; /* cast the value to a RefValue */
            return v1.getAddress(); /* return the address */
        }).collect(Collectors.toList()); /* collect the addresses in a list */
    }

    public List<Integer> getAddrFromHeap(Collection<InterValue> heapValues) {
        /* gets the addresses from the heap values */
        return heapValues.stream() /* get the stream of values */
                .filter(v -> v instanceof RefValue) /* filter the values that are RefValues */
                .map(v -> {
                    RefValue v1 = (RefValue) v;
                    return v1.getAddress();
                })
                .collect(Collectors.toList());
    }

    public Map<Integer, InterValue> safeGarbageCollector(List<Integer> symTableAddr, List<Integer> heapAddr, Map<Integer, InterValue> heap) {
        /* gets the addresses from the symbol table and the heap and returns a new heap with only the values that are used */

        return heap.entrySet().stream() /* get the stream of entries from the heap */
                .filter(e -> (symTableAddr.contains(e.getKey()) || heapAddr.contains(e.getKey()))) /* filter the entries that are used */
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)); /* collect the entries in a map */
    }


    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException, IOException {
        // executes all the steps and displays the current state of the program
        ProgramState program = this.repo.getProgramList().get(0); /* get the first program from the list */
        this.repo.logPrgStaExe(program); /* log the program state */
        display(program);

        while (!program.getExeStack().isEmpty()) { // while the stack is not empty
            oneStep(program);
            /* garbage collector which removes the unreferenced values from the heap */
            program.getHeap().setContent((HashMap<Integer, InterValue>) safeGarbageCollector(getAddrFromSymTable(program.getSymTable()
                    .values()), getAddrFromHeap(program.getHeap().getContent().values()), program.getHeap().getContent()));
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

