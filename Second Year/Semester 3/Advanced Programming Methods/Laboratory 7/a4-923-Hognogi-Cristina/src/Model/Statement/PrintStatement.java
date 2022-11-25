package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.ProgramState.ProgramState;

import Model.Expression.InterExpression;
import Model.Utilities.InterList;
import Model.Value.InterValue;

// Class that represents a print statement
public class PrintStatement implements InterStatement {
    InterExpression exp; // expression to be printed

    public PrintStatement(InterExpression exp) {
        this.exp = exp;
    }

    @Override
    public String toString() {
        return "Print(" + exp.toString() + ")";
        // example: Print(1+2)
    }

    @Override
    public ProgramState execute(ProgramState state) throws ExpEvalException, UtilitsException {
        // evaluate the expression (add it to the output list and update the output list)
        InterList<InterValue> out = state.getOut();
        out.add(exp.eval(state.getSymTable(), state.getHeap()));
        state.setOut(out);
        return state;
    }
}
