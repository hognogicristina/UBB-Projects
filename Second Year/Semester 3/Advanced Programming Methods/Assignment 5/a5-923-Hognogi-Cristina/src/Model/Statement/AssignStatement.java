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
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, UtilitsException, ExpEvalException {
        InterDictionary<String, InterValue> symTbl = state.getSymTable();

        if (symTbl.containsKey(id)) {
            InterValue val = exp.eval(symTbl, state.getHeap());
            InterType typId = (symTbl.lookUp(id)).getType();

            if (val.getType().equals(typId))
                symTbl.update(id, val);
            else
                throw new StatExeExecption("Declared type of variable " + id + " and type of the assigned expression do not match.");
        } else
            throw new StatExeExecption("The used variable " + id + " was not declared before.");

        state.setSymTable(symTbl);
        return state;
    }

}