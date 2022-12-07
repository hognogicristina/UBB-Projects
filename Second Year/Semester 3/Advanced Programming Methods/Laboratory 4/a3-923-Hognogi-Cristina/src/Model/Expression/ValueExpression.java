package Model.Expression;

import Model.Utilities.InterDictionary;
import Model.Value.InterValue;

// Class for giving a value to a variable
public class ValueExpression implements InterExpression {
    InterValue e;

    public ValueExpression(InterValue e) {
        this.e = e;
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl) {
        return this.e;
    }

    @Override
    public String toString() {
        return this.e.toString();
        // example: 5
    }
}
