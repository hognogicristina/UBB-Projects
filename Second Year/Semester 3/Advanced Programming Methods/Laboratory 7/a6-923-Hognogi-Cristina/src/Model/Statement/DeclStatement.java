package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;

import Exceptions.UtilitsException;
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
        InterDictionary<String, InterValue> symTable = state.getSymTable();

        if (symTable.containsKey(name))
            throw new StatExeExecption("Variable " + name + " already declared!");

        symTable.put(name, typ.defaultValue());
        state.setSymTable(symTable);
        return state;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws StatExeExecption, ExpEvalException, UtilitsException {
        typeEnv.put(name, typ);
        return typeEnv;
    }

    @Override
    public String toString() {
        return typ.toString() + " " + name;
    }
}
