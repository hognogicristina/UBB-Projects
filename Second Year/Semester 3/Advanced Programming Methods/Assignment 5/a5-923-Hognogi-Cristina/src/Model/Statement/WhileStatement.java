package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Type.BoolType;
import Model.Utilities.InterStack;
import Model.Value.BoolValue;
import Model.Value.InterValue;

// Class that represents the While statement
public class WhileStatement implements InterStatement{
    private final InterExpression expression;
    private final InterStatement statement;

    public WhileStatement(InterExpression expression, InterStatement statement) {
        this.expression = expression;
        this.statement = statement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterValue value = expression.eval(state.getSymTable(), state.getHeap());
        InterStack<InterStatement> stack = state.getExeStack();

        if (!value.getType().equals(new BoolType()))
            throw new StatExeExecption(String.format("%s is not of BoolType", value));

        if (!(value instanceof BoolValue))
            throw new StatExeExecption(String.format("%s is not a BoolValue", value));

        BoolValue boolValue = (BoolValue) value;

        if (boolValue.getVal()) {
            stack.push(statement);
        }
        return null;
    }

    @Override
    public String toString() {
        return String.format("while(%s){%s}", expression, statement);
    }
}
