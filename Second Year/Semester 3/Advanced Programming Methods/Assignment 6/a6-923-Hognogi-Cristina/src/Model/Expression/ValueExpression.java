package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;

// Class for giving a value to a variable
public class ValueExpression implements InterExpression {
    InterValue e;

    public ValueExpression(InterValue e) {
        this.e = e;
    }

    @Override
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws ExpEvalException {
        return e.getType();
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) {
        return this.e;
    }

    @Override
    public String toString() {
        return this.e.toString();
    }
}
