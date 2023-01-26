package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.ProgramState.ProgramState;
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
        // create a new stack and a new symbol table for the new thread
        InterStack<InterStatement> newStack = new MyStack<>();
        newStack.push(statement);
        InterDictionary<String, InterValue> newSymTable = new MyDictionary<>();

        for (Map.Entry<String, InterValue> entry : state.getSymTable().getContent().entrySet()) {
            newSymTable.put(entry.getKey(), entry.getValue());
        }

        return new ProgramState(newStack, newSymTable, state.getOut(), state.getFileTable(), state.getHeap());
    }

    @Override
    public String toString() {
        return String.format("Fork(%s", statement.toString());
    }
}
