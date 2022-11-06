package Model.Statement;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;

import Model.ProgramState.ProgramState;

public interface InterStatement {
    ProgramState execute(ProgramState state) throws UtilitsException, ExpEvalException, StatExeExecption;
    // which is the execution method for a statement
}
