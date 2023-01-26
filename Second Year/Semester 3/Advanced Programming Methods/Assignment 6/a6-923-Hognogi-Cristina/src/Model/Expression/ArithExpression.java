package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Type.IntType;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.IntValue;
import Model.Value.InterValue;

// Class for arithmetic expressions
public class ArithExpression implements InterExpression {
    InterExpression e1;
    InterExpression e2;
    char op;

    public ArithExpression(char op, InterExpression e1, InterExpression e2) {
        this.e1 = e1;
        this.e2 = e2;
        this.op = op;
    }

    @Override
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws ExpEvalException, UtilitsException {
        InterType type1, type2;
        type1 = e1.typeCheck(typeEnv);
        type2 = e2.typeCheck(typeEnv);
        if (type1.equals(new IntType())) {
            if (type2.equals(new IntType())) {
                return new IntType();
            } else
                throw new ExpEvalException("Second operand is not an integer.");
        } else
            throw new ExpEvalException("First operand is not an integer.");

    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws ExpEvalException, UtilitsException {
        InterValue v1, v2;
        v1 = this.e1.eval(tbl, heap);

        if (v1.getType().equals(new IntType())) {
            v2 = this.e2.eval(tbl, heap);

            if (v2.getType().equals(new IntType())) {
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
    }
}
