package Model.Expression;

import Exceptions.InterpreterException;
import Model.Type.InterType;
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
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // Check if the expressions are of type bool
        InterType type1, type2;
        type1 = e1.typeCheck(typeEnv);
        type2 = e2.typeCheck(typeEnv);

        if (type1.equals(new BoolType())) {
            if (type2.equals(new BoolType())) {
                return new BoolType();
            } else
                throw new InterpreterException("Second operand is not a boolean.");
        } else
            throw new InterpreterException("First operand is not a boolean.");


    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws InterpreterException {
        InterValue v1, v2;
        v1 = this.e1.eval(tbl, heap);

        if (v1.getType().equals(new BoolType())) {
            v2 = this.e2.eval(tbl, heap);

            if (v2.getType().equals(new BoolType())) {
                BoolValue i1 = (BoolValue) v1;
                BoolValue i2 = (BoolValue) v2;
                boolean n1, n2;
                n1 = i1.getVal();
                n2 = i2.getVal();

                if (Objects.equals(this.op, "and"))
                    return new BoolValue(n1 && n2);
                else if (Objects.equals(this.op, "or"))
                    return new BoolValue(n1 || n2);
            } else
                throw new InterpreterException("Second operand is not a boolean.");
        }
        else
            throw new InterpreterException("First operand is not a boolean.");

        return null;
    }

    @Override
    public String toString() {
        return this.e1.toString() + " " + this.op + " " + this.e2.toString();
    }
}
