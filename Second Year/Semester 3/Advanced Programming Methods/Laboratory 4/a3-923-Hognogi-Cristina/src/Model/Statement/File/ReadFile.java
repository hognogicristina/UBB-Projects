package Model.Statement.File;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Type.IntType;
import Model.Type.StringType;
import Model.Utilities.InterDictionary;
import Model.Value.IntValue;
import Model.Value.InterValue;
import Model.Value.StringValue;

import java.io.BufferedReader;
import java.io.IOException;

/* Class that represents the statement that reads a file */
public class ReadFile implements InterStatement {
    private final InterExpression expression;
    private final String varName;

    public ReadFile(InterExpression expression, String varName) {
        this.expression = expression;
        this.varName = varName;
    }
    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        /* function that reads a file and puts the value in the symbol table */
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterDictionary<String, BufferedReader> fileTable = state.getFileTable();

        if (symTable.containsKey(varName)) { /* check if the variable is defined */
            InterValue value = symTable.lookUp(varName);

            if (value.getType().equals(new IntType())) { /* check if the variable is an integer */
                value = expression.eval(symTable);

                if (value.getType().equals(new StringType())) { /* check if the expression is a string */
                    StringValue castValue = (StringValue) value;

                    if (fileTable.containsKey(castValue.getValue())) { /* check if the file is open */
                        BufferedReader br = fileTable.lookUp(castValue.getValue());

                        try {
                            String line = br.readLine(); /* read the next line from the file */
                            if (line == null) /* if the line is null, put 0 in the variable */
                                line = "0";
                            symTable.put(varName, new IntValue(Integer.parseInt(line))); /* put the value in the symbol table */
                        } catch (IOException e) {
                            throw new StatExeExecption(String.format("Could not read from file %s", castValue));
                        }
                    } else {
                        throw new StatExeExecption(String.format("The file table does not contain %s", castValue));
                    }
                } else {
                    throw new StatExeExecption(String.format("%s does not evaluate to StringType", value));
                }
            } else {
                throw new StatExeExecption(String.format("%s is not of type IntType", value));
            }
        } else {
            throw new StatExeExecption(String.format("%s is not present in the symTable.", varName));
        }
        return state;
    }

    @Override
    public String toString() {
        return String.format("ReadFile(%s, %s)", expression.toString(), varName);
        /* example: ReadFile(var_f, var_c) */
    }
}