package Model.ProgramState;

import Model.Utilities.InterDictionary;
import Model.Utilities.InterList;
import Model.Utilities.InterStack;

import Model.Value.InterValue;
import Model.Statement.InterStatement;

public class ProgramState {
    InterStack<InterStatement> exeStack;
    InterDictionary<String, InterValue> symTable;
    InterList<InterValue> out;
    InterStatement originalProgram;

    public ProgramState(InterStack<InterStatement> exeStack, InterDictionary<String, InterValue> symTable, InterList<InterValue> out, InterStatement originalProgram) {
        this.exeStack = exeStack;
        this.symTable = symTable;
        this.out = out;
        this.originalProgram = originalProgram;
        this.exeStack.push(originalProgram);
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

    public String toString() {
        return "Execution stack: \n" + exeStack + "\nSymbol table: \n" + symTable.toString() + "\nOutput list: \n" + out.toString();
    }
}
