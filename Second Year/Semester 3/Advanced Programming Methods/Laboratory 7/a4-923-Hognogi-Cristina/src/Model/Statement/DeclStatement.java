package Model.Statement;

import Exceptions.StatExeExecption;

import Model.ProgramState.ProgramState;

import Model.Utilities.InterDictionary;
import Model.Value.InterValue;
import Model.Type.InterType;

// Class that represents a declaration statement
public class DeclStatement implements InterStatement {
    String name;
    InterType typ;

    public DeclStatement(String name, InterType typ) {
        this.name = name;
        this.typ = typ;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption {
        // get the symbol table and check if the variable is already declared in it and if not add it to the symbol table
        InterDictionary<String, InterValue> symTable = state.getSymTable();

        if (symTable.containsKey(name))
            throw new StatExeExecption("Variable " + name + " already declared!");

        symTable.put(name, typ.defaultValue());
        state.setSymTable(symTable);
        return state;
    }

    @Override
    public String toString() {
        return typ.toString() + " " + name;
        // example: int a
    }
}
