package Repository;

import Model.ProgramState.ProgramState;
import java.util.ArrayList;
import java.util.List;

public class Repository implements InterRepository {
    private List<ProgramState> programStates;

    public Repository(ProgramState programState){
        this.programStates = new ArrayList<>();
        this.addProgram(programState);
    }

    @Override
    public void addProgram(ProgramState programState) {
        this.programStates.add(programState);
    }

    @Override
    public ProgramState getCurrentState() {
        return this.programStates.get(0);
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