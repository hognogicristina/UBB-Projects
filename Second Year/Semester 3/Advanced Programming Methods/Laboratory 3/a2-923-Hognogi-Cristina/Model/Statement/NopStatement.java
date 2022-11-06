package Model.Statement;

import Model.ProgramState.ProgramState;

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
