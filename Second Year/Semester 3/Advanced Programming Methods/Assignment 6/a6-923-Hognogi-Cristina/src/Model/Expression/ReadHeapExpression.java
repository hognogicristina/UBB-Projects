package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;
import Model.Type.InterType;
import Model.Type.RefType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;
import Model.Value.RefValue;

// Class that represents the ReadHeap expression
public class ReadHeapExpression implements InterExpression{
    private final InterExpression expression;

    public ReadHeapExpression(InterExpression expression) {
        this.expression = expression;
    }

    @Override
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws ExpEvalException, UtilitsException {
        InterType type = expression.typeCheck(typeEnv);
        if (type instanceof RefType) {
            RefType refType = (RefType) type;
            return refType.getInner();
        } else
            throw new ExpEvalException("The rH argument is not a RefType.");

    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> symTable, InterHeap heap) throws ExpEvalException, UtilitsException {
        InterValue value = expression.eval(symTable, heap);

        if (value instanceof RefValue) {
            RefValue refValue = (RefValue) value;

            if (heap.containsKey(refValue.getAddress()))
                return heap.get(refValue.getAddress());
            else
                throw new ExpEvalException("The address is not defined on the heap!");
        } else
            throw new ExpEvalException(String.format("%s not of RefType", value));
    }

    @Override
    public String toString() {
        return String.format("ReadHeap(%s)", expression);
    }
}
