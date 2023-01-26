package Model.Expression;

import Exceptions.InterpreterException;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;

// Interface for all expressions
public interface InterExpression {
    // Method for type checking an expression
    InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException;
    InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws InterpreterException;
}
