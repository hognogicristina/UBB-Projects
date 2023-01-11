package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;

// Class for variable expression
public class VarExpression implements InterExpression {
    String id;

    public VarExpression(String id) {
        this.id = id;
    }

    @Override
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws ExpEvalException, UtilitsException {
        return typeEnv.lookUp(id);
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws UtilitsException, ExpEvalException {
        return tbl.lookUp(id);
    }

    @Override
    public String toString() {
        return this.id;
    }
}
