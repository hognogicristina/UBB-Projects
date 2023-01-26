package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;

import Model.ProgramState.ProgramState;

import Model.Expression.InterExpression;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
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
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterValue res = this.exp.eval(state.getSymTable(), state.getHeap());

        if (res.getType().equals(new BoolType())) {
            BoolValue boolRes = (BoolValue) res;
            InterStatement toExecute;

            if (boolRes.getVal())
                toExecute = thenS;
            else
                toExecute = elseS;

            InterStack<InterStatement> stack = state.getExeStack();
            stack.push(toExecute);
            state.setExeStack(stack);

            return state;
        } else
            throw new StatExeExecption("The condition of if has not the type bool");
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterType typeExpr = exp.typeCheck(typeEnv);
        if (typeExpr.equals(new BoolType())) {
            thenS.typeCheck(typeEnv);
            elseS.typeCheck(typeEnv);
            return typeEnv;
        } else
            throw new StatExeExecption("The condition of IF does not have the type Bool.");

    }
}
