package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.ProgramState.ProgramState;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterStack;
import Model.Utilities.MyDictionary;
import Model.Utilities.MyStack;
import Model.Value.InterValue;

import java.util.Map;

// Class that creates a new thread
public class ForkStatement implements InterStatement {
    private final InterStatement statement;

    public ForkStatement(InterStatement statement) {
        this.statement = statement;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterStack<InterStatement> newStack = new MyStack<>();
        newStack.push(statement);
        InterDictionary<String, InterValue> newSymTable = new MyDictionary<>();

        for (Map.Entry<String, InterValue> entry : state.getSymTable().getContent().entrySet()) {
            newSymTable.put(entry.getKey(), entry.getValue());
        }

        return new ProgramState(newStack, newSymTable, state.getOut(), state.getFileTable(), state.getHeap());
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws StatExeExecption, ExpEvalException, UtilitsException {
        statement.typeCheck(typeEnv);
        return typeEnv;
    }

    @Override
    public String toString() {
        return String.format("Fork(%s", statement.toString());
    }
}
