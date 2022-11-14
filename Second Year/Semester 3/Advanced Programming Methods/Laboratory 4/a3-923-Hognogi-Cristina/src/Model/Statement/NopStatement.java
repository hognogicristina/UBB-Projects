package Model.Statement;

import Model.ProgramState.ProgramState;

// Class that represents a statement that does nothing
public class NopStatement implements InterStatement {
    @Override
    public String toString() {
        return "NopStatement";
    }

    @Override
    public ProgramState execute(ProgramState state) {
        return null;
    }
}
