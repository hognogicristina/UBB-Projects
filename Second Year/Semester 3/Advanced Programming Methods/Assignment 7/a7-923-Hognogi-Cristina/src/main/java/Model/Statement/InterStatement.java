package Model.Statement;

import Exceptions.InterpreterException;
import Model.ProgramState.ProgramState;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;

// Interface for all statements (statements are the basic building blocks of the program)
public interface InterStatement {
    ProgramState execute(ProgramState state) throws InterpreterException;
    // Method for type checking a statement
    InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException;
}
