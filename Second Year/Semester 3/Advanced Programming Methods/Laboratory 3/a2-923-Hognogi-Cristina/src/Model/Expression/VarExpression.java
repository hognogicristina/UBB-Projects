package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Utilities.InterDictionary;
import Model.Value.InterValue;

public class VarExpression implements InterExpression {
    String id;

    public VarExpression(String id) {
        this.id = id;
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl) throws UtilitsException, ExpEvalException {
        return tbl.lookUp(id);
    }

    @Override
    public String toString() {
        return this.id;
    }
}
