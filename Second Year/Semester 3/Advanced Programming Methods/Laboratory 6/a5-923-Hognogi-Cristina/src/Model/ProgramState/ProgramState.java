package Model.ProgramState;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Utilities.*;

import Model.Value.InterValue;
import Model.Statement.InterStatement;

import java.io.BufferedReader;
import java.util.List;

// Class that represents the state of the program at a given moment
public class ProgramState {
    InterStack<InterStatement> exeStack;
    InterDictionary<String, InterValue> symTable;
    InterList<InterValue> out;
    InterDictionary<String, BufferedReader> fileTable;
    InterStatement originalProgram;
    private InterHeap heap;
    private int id; // id of the program state
    private static int lastId = 0; // last id given to a program state

    public ProgramState(InterStack<InterStatement> exeStack, InterDictionary<String, InterValue> symTable, InterList<InterValue> out, InterDictionary<String, BufferedReader> fileTable, InterHeap heap, InterStatement originalProgram) {
        this.exeStack = exeStack;
        this.symTable = symTable;
        this.out = out;
        this.fileTable = fileTable;
        this.heap = heap;
        this.originalProgram = originalProgram;
        this.exeStack.push(this.originalProgram);
        this.id = setId(); // set the id of the program state
    }

    public ProgramState(InterStack<InterStatement> exeStack, InterDictionary<String, InterValue> symTable, InterList<InterValue> out, InterDictionary<String, BufferedReader> fileTable, InterHeap heap) {
        this.exeStack = exeStack;
        this.symTable = symTable;
        this.out = out;
        this.fileTable = fileTable;
        this.heap = heap;
        this.id = setId();
    }

    public synchronized int setId() {
        // set the id of the program state
        lastId++;
        return lastId;
    }

    public boolean isNotCompleted() {
        // check if the program state is completed
        return exeStack.isEmpty();
    }

    public InterStack<InterStatement> getExeStack() {
        return exeStack;
    }

    public void setExeStack(InterStack<InterStatement> exeStack) {
        this.exeStack = exeStack;
    }

    public InterDictionary<String, InterValue> getSymTable() {
        return symTable;
    }

    public void setSymTable(InterDictionary<String, InterValue> symTable) {
        this.symTable = symTable;
    }

    public InterList<InterValue> getOut() {
        return out;
    }

    public void setOut(InterList<InterValue> out) {
        this.out = out;
    }

    public InterDictionary<String, BufferedReader> getFileTable() {
        return fileTable;
    }

    public void setFileTable(InterDictionary<String, BufferedReader> fileTable) {
        this.fileTable = fileTable;
    }

    public InterHeap getHeap() {
        return heap;
    }

    public void setHeap(InterHeap heap) {
        this.heap = heap;
    }

    public ProgramState oneStep() throws StatExeExecption, ExpEvalException, UtilitsException {
        if (!exeStack.isEmpty()) {
            InterStatement currentStatement = exeStack.pop();
            return currentStatement.execute(this);
        }

        return null;
    }

    public String exeStackToString() {
        StringBuilder exeStackStringBuilder = new StringBuilder();
        List<InterStatement> stack = exeStack.getReversed();

        for (InterStatement statement : stack)
            exeStackStringBuilder.append(statement.toString()).append("\n");

        return exeStackStringBuilder.toString();
    }

    public String symTableToString() throws UtilitsException {
        StringBuilder symTableStringBuilder = new StringBuilder();

        for (String key : symTable.keySet())
            symTableStringBuilder.append(String.format("%s -> %s\n", key, symTable.lookUp(key).toString()));

        return symTableStringBuilder.toString();
    }

    public String outToString() {
        StringBuilder outStringBuilder = new StringBuilder();

        for (InterValue elem : out.getList())
            outStringBuilder.append(String.format("%s\n", elem.toString()));

        return outStringBuilder.toString();
    }

    public String fileTableToString() {
        StringBuilder fileTableStringBuilder = new StringBuilder();

        for (String key : fileTable.keySet())
            fileTableStringBuilder.append(String.format("%s\n", key));

        return fileTableStringBuilder.toString();
    }

    public String heapToString() throws UtilitsException {
        StringBuilder heapStringBuilder = new StringBuilder();
        for (int key : heap.keySet())
            heapStringBuilder.append(String.format("%d -> %s\n", key, heap.get(key)));

        return heapStringBuilder.toString();
    }

    @Override
    public String toString() {
        return "Execution stack: \n" + exeStack.getReversed() + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString() + "\nFile table:\n" + fileTable.toString() + "\nHeap memory:\n" + heap.toString() + "\n";
    }

    public String programStateToString() throws UtilitsException {
        return "Execution stack: \n" + exeStackToString() + "Symbol table: \n" + symTableToString() + "Output list: \n" + outToString() + "File table:\n" + fileTableToString() + "Heap memory:\n" + heapToString();
    }
}
