package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Type.IntType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.IntValue;
import Model.Value.InterValue;

// Class for arithmetic expressions
public class ArithExpression implements InterExpression {
    InterExpression e1;
    InterExpression e2;
    char op; // 1-plus, 2-minus, 3-star, 4-divide

    public ArithExpression(char op, InterExpression e1, InterExpression e2) {
        this.e1 = e1;
        this.e2 = e2;
        this.op = op;
    }


    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws ExpEvalException, UtilitsException {
        // evaluate the two operands
        InterValue v1, v2;
        v1 = this.e1.eval(tbl, heap);

        if (v1.getType().equals(new IntType())) { // check if the first operand is an integer
            v2 = this.e2.eval(tbl, heap);

            if (v2.getType().equals(new IntType())) { // check if the second operand is an integer
                IntValue i1 = (IntValue) v1;
                IntValue i2 = (IntValue) v2;
                int n1, n2;
                n1 = i1.getVal();
                n2 = i2.getVal();

                if (this.op == '+')
                    return new IntValue(n1 + n2);
                else if (this.op == '-')
                    return new IntValue(n1 - n2);
                else if (this.op == '*')
                    return new IntValue(n1 * n2);
                else if (this.op == '/')
                    if (n2 == 0) throw new ExpEvalException("Division by zero.");
                    else return new IntValue(n1 / n2);
            } else
                throw new ExpEvalException("Second operand is not an integer");
        } else
            throw new ExpEvalException("First operand is not an integer.");
        return null;
    }

    @Override
    public String toString() {
        return this.e1.toString() + " " + this.op + " " + this.e2.toString();
        // example: 2 + 3
    }
}
