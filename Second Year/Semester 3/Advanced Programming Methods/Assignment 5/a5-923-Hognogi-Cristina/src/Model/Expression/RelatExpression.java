package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;
import Model.Type.IntType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.BoolValue;
import Model.Value.IntValue;
import Model.Value.InterValue;

import java.util.Objects;

// Class that represents the relational expression
public class RelatExpression implements InterExpression {
    InterExpression exp1;
    InterExpression exp2;
    String op;

    public RelatExpression(String op, InterExpression exp1, InterExpression exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.op = op;
    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws UtilitsException, ExpEvalException {
        InterValue v1, v2;
        v1 = this.exp1.eval(tbl, heap);

        if (v1.getType().equals(new IntType())) {
            v2 = this.exp2.eval(tbl, heap);

            if (v2.getType().equals(new IntType())) {
                IntValue i1 = (IntValue) v1;
                IntValue i2 = (IntValue) v2;
                int n1, n2;
                n1 = i1.getVal();
                n2 = i2.getVal();

                if (Objects.equals(this.op, "<"))
                    return new BoolValue(n1 < n2);
                else if (Objects.equals(this.op, "<="))
                    return new BoolValue(n1 <= n2);
                else if (Objects.equals(this.op, "=="))
                    return new BoolValue(n1 == n2);
                else if (Objects.equals(this.op, "!="))
                    return new BoolValue(n1 != n2);
                else if (Objects.equals(this.op, ">="))
                    return new BoolValue(n1 >= n2);
                else if (Objects.equals(this.op, ">"))
                    return new BoolValue(n1 > n2);
            } else
                throw new ExpEvalException("Second operand is not an integer.");
        }
        else
            throw new ExpEvalException("First operand is not an integer.");

        return null;
    }

    @Override
    public String toString() {
        return exp1.toString() + " " + op + " " + exp2.toString();
    }
}

