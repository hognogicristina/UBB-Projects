package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;

import Model.ProgramState.ProgramState;

import Model.Expression.InterExpression;
import Model.Utilities.InterStack;
import Model.Value.InterValue;

import Model.Type.BoolType;
import Model.Value.BoolValue;

// Class for the If Statement
public class IfStatement implements InterStatement {
    InterExpression exp;
    InterStatement thenS;
    InterStatement elseS;

    public IfStatement(InterExpression e, InterStatement t, InterStatement el) {
        this.exp = e;
        this.thenS = t;
        this.elseS = el;
    }

    @Override
    public String toString() {
        return "(if(" + exp.toString() + ") then(" + thenS.toString() + ") else(" + elseS.toString() + "))";
        // example: (if(1<2) then(v=2) else(v=3))
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        // get the stack from the state and the symbol table and set the stack in the state
        InterValue res = this.exp.eval(state.getSymTable(), state.getHeap());

        if (res.getType().equals(new BoolType())) { // if boolean
            BoolValue boolRes = (BoolValue) res;
            InterStatement toExecute;

            if (boolRes.getVal()) // if true
                toExecute = thenS;
            else
                toExecute = elseS;

            // get the stack from the state
            InterStack<InterStatement> stack = state.getExeStack();
            stack.push(toExecute);
            state.setExeStack(stack);

            return state;
        } else
            throw new StatExeExecption("The condition of if has not the type bool");
    }
}
