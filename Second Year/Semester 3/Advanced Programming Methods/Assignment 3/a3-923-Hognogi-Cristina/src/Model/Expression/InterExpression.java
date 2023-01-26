package Model.Expression;

import Exceptions.ExpEvalException;
import Exceptions.UtilitsException;

import Model.Utilities.InterDictionary;
import Model.Value.InterValue;

// Interface for all expressions
public interface InterExpression {
    InterValue eval(InterDictionary<String, InterValue> tbl) throws UtilitsException, ExpEvalException;
}
