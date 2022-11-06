package Repository;

import Model.ProgramState.ProgramState;
import java.util.List;

public interface InterRepository {
    void addProgram(ProgramState programState);
    ProgramState getCurrentState();

    List<ProgramState> getProgramStates();

    void setProgramStates(List<ProgramState> programStates);
}
