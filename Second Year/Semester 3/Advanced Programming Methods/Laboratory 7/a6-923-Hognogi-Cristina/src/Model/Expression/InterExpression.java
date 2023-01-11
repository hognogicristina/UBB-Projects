package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;

// Interface for all expressions
public interface InterExpression {
    InterType typeCheck(InterDictionary<String, InterType> typeEnv) throws ExpEvalException, UtilitsException;
    InterValue eval(InterDictionary<String, InterValue> tbl, InterHeap heap) throws UtilitsException, ExpEvalException;
}
