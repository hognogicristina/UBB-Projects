package Model.ProgramState;

import Exceptions.UtilitsException;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterList;
import Model.Utilities.InterStack;

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

    public ProgramState(InterStack<InterStatement> exeStack, InterDictionary<String, InterValue> symTable, InterList<InterValue> out, InterDictionary<String, BufferedReader> fileTable, InterStatement originalProgram) {
        this.exeStack = exeStack;
        this.symTable = symTable;
        this.out = out;
        this.fileTable = fileTable;
        this.originalProgram = originalProgram;
        this.exeStack.push(this.originalProgram);
    }

    public InterStack<InterStatement> getExeStack() {
        return exeStack;
        // function that returns the execution stack
    }

    public void setExeStack(InterStack<InterStatement> exeStack) {
        this.exeStack = exeStack;
    }

    public InterDictionary<String, InterValue> getSymTable() {
        return symTable;
        // function that returns the symbol table
    }

    public void setSymTable(InterDictionary<String, InterValue> symTable) {
        this.symTable = symTable;
    }

    public InterList<InterValue> getOut() {
        return out;
        // function that returns the output list
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

    public String exeStackToString() {
        // function that returns the execution stack as a string
        StringBuilder exeStackStringBuilder = new StringBuilder();
        List<InterStatement> stack = exeStack.getReversed();

        for (InterStatement statement : stack) // for each statement in the stack
            exeStackStringBuilder.append(statement.toString()).append("\n");
        // append the string representation of the statement to the string builder

        return exeStackStringBuilder.toString();
    }

    public String symTableToString() throws UtilitsException {
        // function that returns the symbol table as a string
        StringBuilder symTableStringBuilder = new StringBuilder();

        for (String key : symTable.keySet()) // for each key in the symbol table
            symTableStringBuilder.append(String.format("%s -> %s\n", key, symTable.lookUp(key).toString()));
        // append the string representation of the key and the value to the string builder

        return symTableStringBuilder.toString();
    }

    public String outToString() {
        // function that returns the output list as a string
        StringBuilder outStringBuilder = new StringBuilder();

        for (InterValue elem : out.getList()) // for each element in the output list
            outStringBuilder.append(String.format("%s\n", elem.toString()));
        // append the string representation of the element to the string builder

        return outStringBuilder.toString();
    }

    public String fileTableToString() {
        // function that returns the file table as a string
        StringBuilder fileTableStringBuilder = new StringBuilder();

        for (String key : fileTable.keySet()) // for each key in the file table
            fileTableStringBuilder.append(String.format("%s\n", key));
        // append the string representation of the key to the string builder

        return fileTableStringBuilder.toString();
    }

    public String toString() {
        return "Execution stack: \n" + exeStack + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString();
        // example: Execution stack:
        //          a = 5 + 2
        //          b = 3 + 4
        //          Symbol table:
        //          a -> 7
        //          b -> 7
        //          Output list:
        //          7
        //          7
    }

    public String programStateToString() throws UtilitsException {
        return "Execution stack: \n" + exeStackToString() + "Symbol table: \n" + symTableToString() + "Output list: \n" + outToString() + "File table:\n" + fileTableToString() + "\n";
        // example: Execution stack:
        //          a = 5 + 2
        //          b = 3 + 4
        //          Symbol table:
        //          a -> 7
        //          b -> 7
        //          Output list:
        //          7
        //          7
    }
}
