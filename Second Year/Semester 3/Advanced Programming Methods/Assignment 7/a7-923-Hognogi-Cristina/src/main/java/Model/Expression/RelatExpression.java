package Model.Expression;

import Exceptions.InterpreterException;
import Model.Type.BoolType;
import Model.Type.IntType;
import Model.Type.InterType;
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
    public InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // Check if the types of the expressions are the same
        InterType type1, type2;
        type1 = exp1.typeCheck(typeEnv);
        type2 = exp2.typeCheck(typeEnv);

        if (type1.equals(new IntType())) {
            if (type2.equals(new IntType())) {
                return new BoolType();
            } else
                throw new InterpreterException("Second operand is not an integer.");
        } else
            throw new InterpreterException("First operand is not an integer.");


    }

    @Override
    public InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws InterpreterException {
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
                throw new InterpreterException("Second operand is not an integer.");
        } else
            throw new InterpreterException("First operand is not an integer.");

        return null;
    }

    @Override
    public String toString() {
        return exp1.toString() + " " + op + " " + exp2.toString();
    }
}

