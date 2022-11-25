package Model.Statement;

import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Exceptions.UtilitsException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Type.RefType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;
import Model.Value.RefValue;

/* WriteHeapStatement implements the IStatement interface, and it is used for writing a value in the heap at a given address. */
public class WriteHeapStatement implements InterStatement{
    private final String varName; /* name of the variable that contains the address of the heap cell */
    private final InterExpression expression; /* expression that will be written in the heap cell */

    public WriteHeapStatement(String varName, InterExpression expression) {
        this.varName = varName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws StatExeExecption, ExpEvalException, UtilitsException {
        /* get the symbol table from the program state */
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterHeap heap = state.getHeap();

        if (symTable.containsKey(varName)) { /* if the variable is in the symbol table */
            InterValue value = symTable.lookUp(varName);

            if (value.getType() instanceof RefType) { /* if the variable is of RefType */
                RefValue refValue = (RefValue) value;

                if (heap.containsKey(refValue.getAddress())) { /* if the address is in the heap */
                    InterValue evaluated = expression.eval(symTable, heap);

                    if (evaluated.getType().equals(refValue.getLocationType())) { /* if the type of the expression is the same as the type of the location */
                        heap.update(refValue.getAddress(), evaluated);
                        state.setHeap(heap);
                    } else
                        throw new StatExeExecption(String.format("%s not of %s", evaluated, refValue.getLocationType()));
                } else
                    throw new StatExeExecption(String.format("The RefValue %s is not defined in the heap", value));
            } else
                throw new StatExeExecption(String.format("%s not of RefType", value));
        } else
            throw new StatExeExecption(String.format("%s not present in the symTable", varName));
        return null;
    }

    @Override
    public String toString() {
        return String.format("WriteHeap(%s, %s)", varName, expression);
        /* example: WriteHeap(v, 10) */
    }
}
