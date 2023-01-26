package Model.Statement;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;

import Model.ProgramState.ProgramState;

// Interface for all statements (statements are the basic building blocks of the program)
public interface InterStatement {
    ProgramState execute(ProgramState state) throws UtilitsException, ExpEvalException, StatExeExecption;
}
