package Model.Statement;

import Exceptions.InterpreterException;
import Model.ProgramState.ProgramState;

import Model.Expression.InterExpression;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterList;
import Model.Value.InterValue;

// Class that represents a print statement
public class PrintStatement implements InterStatement {
    InterExpression exp;

    public PrintStatement(InterExpression exp) {
        this.exp = exp;
    }

    @Override
    public String toString() {
        return "Print(" + exp.toString() + ")";
    }

    @Override
    public ProgramState execute(ProgramState state) throws InterpreterException {
        InterList<InterValue> out = state.getOut();
        out.add(exp.eval(state.getSymTable(), state.getHeap()));
        state.setOut(out);
        return state;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // returns the type environment
        exp.typeCheck(typeEnv);
        return typeEnv;
    }
}
