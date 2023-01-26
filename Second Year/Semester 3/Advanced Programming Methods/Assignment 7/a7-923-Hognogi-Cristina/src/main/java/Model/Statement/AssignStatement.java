package Model.Statement;

import Exceptions.InterpreterException;
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
    public ProgramState execute(ProgramState state) throws InterpreterException {
        InterDictionary<String, InterValue> symTbl = state.getSymTable();

        if (symTbl.containsKey(id)) {
            InterValue val = exp.eval(symTbl, state.getHeap());
            InterType typId = (symTbl.lookUp(id)).getType();

            if (val.getType().equals(typId))
                symTbl.update(id, val);
            else
                throw new InterpreterException("Declared type of variable " + id + " and type of the assigned expression do not match.");
        } else
            throw new InterpreterException("The used variable " + id + " was not declared before.");

        state.setSymTable(symTbl);
        return state;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // type-check the expression and check if the type of the expression is the same as the type of the variable
        InterType typeVar = typeEnv.lookUp(id);
        InterType typeExpr = exp.typeCheck(typeEnv);
        if (typeVar.equals(typeExpr))
            return typeEnv;
        else
            throw new InterpreterException("Assignment: right hand side and left hand side have different types.");

    }

}