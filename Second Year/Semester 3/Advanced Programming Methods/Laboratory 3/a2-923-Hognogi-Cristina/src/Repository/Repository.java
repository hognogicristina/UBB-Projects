package Repository;

import Model.ProgramState.ProgramState;
import java.util.ArrayList;
import java.util.List;

// Class for the repository
public class Repository implements InterRepository {
    private List<ProgramState> programStates;

    public Repository(ProgramState programState) {
        this.programStates = new ArrayList<>(); // initialize the list of program states
        this.addProgram(programState); // add the program state to the list
    }

    @Override
    public void addProgram(ProgramState programState) {
        this.programStates.add(programState);
    }

    @Override
    public ProgramState getCurrentState() {
        return this.programStates.get(0); // the current program state is the first one in the list
    }

    @Override
    public List<ProgramState> getProgramStates() {
        return this.programStates;
    }

    @Override
    public void setProgramStates(List<ProgramState> programStates) {
        this.programStates = programStates;
    }
}