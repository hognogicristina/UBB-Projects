package Model.Statement.File;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Type.InterType;
import Model.Type.StringType;
import Model.Utilities.InterDictionary;
import Model.Value.InterValue;
import Model.Value.StringValue;

import java.io.BufferedReader;
import java.io.IOException;

// Class that represents the statement that closes a file
public class CloseReadFile implements InterStatement {
    private final InterExpression expression;

    public CloseReadFile(InterExpression expression) {
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterValue value = expression.eval(state.getSymTable(), state.getHeap());

        if (!value.getType().equals(new StringType()))
            throw new StatExeExecption(String.format("%s does not evaluate to StringValue", expression));

        StringValue fileName = (StringValue) value;
        InterDictionary<String, BufferedReader> fileTable = state.getFileTable();

        if (!fileTable.containsKey(fileName.getValue()))
            throw new StatExeExecption(String.format("%s is not present in the FileTable", value));

        BufferedReader br = fileTable.lookUp(fileName.getValue());

        try {
            br.close();
        } catch (IOException e) {
            throw new StatExeExecption(String.format("Unexpected error in closing %s", value));
        }

        fileTable.remove(fileName.getValue());
        state.setFileTable(fileTable);

        return null;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws StatExeExecption, ExpEvalException, UtilitsException {
        if (expression.typeCheck(typeEnv).equals(new StringType()))
            return typeEnv;
        else
            throw new StatExeExecption("CloseReadFile requires a string expression.");

    }

    @Override
    public String toString() {
        return String.format("CloseReadFile(%s)", expression.toString());
    }
}