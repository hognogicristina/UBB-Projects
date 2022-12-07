package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;

import Model.ProgramState.ProgramState;

import Model.Expression.InterExpression;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Value.InterValue;

// Class that represents an assignment statement
public class AssignStatement implements InterStatement {
    private final String id;
    private final InterExpression exp;

    public AssignStatement(String id, InterExpression exp) {
        this.id = id;
        this.exp = exp;
    }

    @Override
    public String toString() {
        return this.id + " = " + this.exp.toString();
        // example: a = 5 + 2
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, UtilitsException, ExpEvalException {
        // get the symbol table from the program state and set the symbol table in the program state
        InterDictionary<String, InterValue> symTbl = state.getSymTable();

        if (symTbl.containsKey(id)) { // if the symbol table contains the id
            InterValue val = exp.eval(symTbl);
            InterType typId = (symTbl.lookUp(id)).getType();

            if (val.getType().equals(typId)) // value = type of the id
                symTbl.update(id, val);
            else
                throw new StatExeExecption("Declared type of variable " + id + " and type of the assigned expression do not match.");
        } else
            throw new StatExeExecption("The used variable " + id + " was not declared before.");

        state.setSymTable(symTbl);
        return state;
    }

}