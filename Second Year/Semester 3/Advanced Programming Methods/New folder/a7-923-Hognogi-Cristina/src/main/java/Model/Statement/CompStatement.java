package Model.Statement;

import Exceptions.InterpreterException;
import Model.ProgramState.ProgramState;
import Model.Type.InterType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterStack;

// Class that represents a compound statement (a statement that contains two other statements)
public class CompStatement implements InterStatement {
    InterStatement first;
    InterStatement second;

    public CompStatement(InterStatement first, InterStatement second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public String toString() {
        return "(" + first.toString() + "; " + second.toString() + ")";
    }

    @Override
    public ProgramState execute(ProgramState state) {
        InterStack<InterStatement> stk = state.getExeStack();
        stk.push(second);
        stk.push(first);
        state.setExeStack(stk);
        return state;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // returns the type environment of the second statement after the type checking of the first statement
        return second.typeCheck(first.typeCheck(typeEnv));
    }
}
