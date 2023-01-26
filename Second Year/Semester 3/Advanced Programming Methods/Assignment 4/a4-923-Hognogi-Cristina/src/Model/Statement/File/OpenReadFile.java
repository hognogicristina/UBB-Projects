package Model.Statement.File;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Type.StringType;
import Model.Utilities.InterDictionary;
import Model.Value.InterValue;
import Model.Value.StringValue;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

// Class that represents the statement that opens a file for reading
public class OpenReadFile implements InterStatement {
    private final InterExpression expression;

    public OpenReadFile(InterExpression expression) {
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        // function that opens a file and puts it in the file table
        InterValue value = this.expression.eval(state.getSymTable(), state.getHeap());

        if (value.getType().equals(new StringType())) { // check if the expression evaluates to a string
            StringValue fileName = (StringValue) value;
            InterDictionary<String, BufferedReader> fileTable = state.getFileTable();

            if (!fileTable.containsKey(fileName.getValue())) { // check if the file is not already open
                BufferedReader br; // create a new buffer reader

                try {
                    br = new BufferedReader(new FileReader(fileName.getValue())); // open the file
                } catch (FileNotFoundException e) {
                    throw new StatExeExecption(String.format("%s could not be opened", fileName.getValue()));
                }

                fileTable.put(fileName.getValue(), br); // put the file in the file table
                state.setFileTable(fileTable); // update the file table
            } else {
                throw new StatExeExecption(String.format("%s is already opened", fileName.getValue()));
            }
        } else {
            throw new StatExeExecption(String.format("%s does not evaluate to StringType", expression.toString()));
        }
        return state;
    }

    @Override
    public String toString() {
        return String.format("OpenReadFile(%s)", expression.toString());
        // example: OpenReadFile(var_f)
    }
}