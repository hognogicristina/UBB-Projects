package Model.Statement.File;

import Exceptions.InterpreterException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Type.IntType;
import Model.Type.InterType;
import Model.Type.StringType;
import Model.Utilities.InterDictionary;
import Model.Value.IntValue;
import Model.Value.InterValue;
import Model.Value.StringValue;

import java.io.BufferedReader;
import java.io.IOException;

// Class that represents the statement that reads a file
public class ReadFile implements InterStatement {
    private final InterExpression expression;
    private final String varName;

    public ReadFile(InterExpression expression, String varName) {
        this.expression = expression;
        this.varName = varName;
    }
    @Override
    public ProgramState execute(ProgramState state) throws InterpreterException {
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterDictionary<String, BufferedReader> fileTable = state.getFileTable();

        if (symTable.containsKey(varName)) {
            InterValue value = symTable.lookUp(varName);

            if (value.getType().equals(new IntType())) {
                value = expression.eval(symTable, state.getHeap());

                if (value.getType().equals(new StringType())) {
                    StringValue castValue = (StringValue) value;

                    if (fileTable.containsKey(castValue.getValue())) {
                        BufferedReader br = fileTable.lookUp(castValue.getValue());

                        try {
                            String line = br.readLine();
                            if (line == null)
                                line = "0";
                            symTable.put(varName, new IntValue(Integer.parseInt(line)));
                        } catch (IOException e) {
                            throw new InterpreterException(String.format("Could not read from file %s", castValue));
                        }
                    } else {
                        throw new InterpreterException(String.format("The file table does not contain %s", castValue));
                    }
                } else {
                    throw new InterpreterException(String.format("%s does not evaluate to StringType", value));
                }
            } else {
                throw new InterpreterException(String.format("%s is not of type IntType", value));
            }
        } else {
            throw new InterpreterException(String.format("%s is not present in the symTable.", varName));
        }
        return state;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // check if the variable is of type int and the expression is of type string
        if (expression.typeCheck(typeEnv).equals(new StringType()))
            if (typeEnv.lookUp(varName).equals(new IntType()))
                return typeEnv;
            else
                throw new InterpreterException("ReadFile requires an int as its variable parameter.");
        else
            throw new InterpreterException("ReadFile requires a string as es expression parameter.");

    }

    @Override
    public String toString() {
        return String.format("ReadFile(%s, %s)", expression.toString(), varName);
    }
}