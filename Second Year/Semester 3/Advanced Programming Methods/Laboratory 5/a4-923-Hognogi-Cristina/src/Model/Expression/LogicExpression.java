package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;

import Model.Type.BoolType;
import Model.Value.BoolValue;

import java.util.Objects;

// Class for the logic expressions
public class LogicExpression implements InterExpression {
    InterExpression e1;
    InterExpression e2;
    String op;

    public LogicExpression(InterExpression e1, InterExpression e2, String op) {
        this.e1 = e1;
        this.e2 = e2;
        this.op = op;
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws UtilitsException, ExpEvalException {
        // evaluate the two operands
        InterValue v1, v2;
        v1 = this.e1.eval(tbl, heap);

        if (v1.getType().equals(new BoolType())) { // check if the first operand is a boolean
            v2 = this.e2.eval(tbl, heap);

            if (v2.getType().equals(new BoolType())) { // check if the second operand is a boolean
                BoolValue i1 = (BoolValue) v1;
                BoolValue i2 = (BoolValue) v2;
                boolean n1, n2;
                n1 = i1.getVal();
                n2 = i2.getVal();

                if (Objects.equals(this.op, "and"))
                    return new BoolValue(n1 && n2); // result of the "and" operation
                else if (Objects.equals(this.op, "or"))
                    return new BoolValue(n1 || n2); // result of the "or" operation
            } else
                throw new ExpEvalException("Second operand is not a boolean.");
        }
        else
            throw new ExpEvalException("First operand is not a boolean.");

        return null;
    }

    @Override
    public String toString() {
        return this.e1.toString() + " " + this.op + " " + this.e2.toString();
        // example: 1 < 2, where 1 and 2 are expressions and < is the operator
    }
}
