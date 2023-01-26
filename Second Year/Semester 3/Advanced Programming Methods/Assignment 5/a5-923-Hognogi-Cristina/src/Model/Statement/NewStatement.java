package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Type.InterType;
import Model.Type.RefType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;
import Model.Value.RefValue;

// Class for the WriteHeap statement
public class NewStatement implements InterStatement {
    private final String varName;
    private final InterExpression expression;

    public NewStatement(String varName, InterExpression expression) {
        this.varName = varName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterHeap heap = state.getHeap();

        if (symTable.containsKey(varName)) {
            InterValue varValue = symTable.lookUp(varName);

            if ((varValue.getType() instanceof RefType)) {
                InterValue evaluated = expression.eval(symTable, heap);
                InterType locationType = ((RefValue) varValue).getLocationType();

                if (locationType.equals(evaluated.getType())) {
                    int newPosition = heap.add(evaluated);
                    symTable.put(varName, new RefValue(newPosition, locationType));
                    state.setSymTable(symTable);
                    state.setHeap(heap);
                } else
                    throw new StatExeExecption(String.format("%s not of %s", varName, evaluated.getType()));
            } else {
                throw new StatExeExecption(String.format("%s in not of RefType", varName));
            }
        } else {
            throw new StatExeExecption(String.format("%s not in symTable", varName));
        }
        return null;
    }

    @Override
    public String toString() {
        return String.format("New(%s, %s)", varName, expression);
    }
}
