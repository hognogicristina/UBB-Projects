package Repository;

import Exceptions.UtilitsException;
import Model.ProgramState.ProgramState;

import java.io.IOException;
import java.util.List;

// Interface for the repository
public interface InterRepository {
    void addProgram(ProgramState programState);
    ProgramState getCurrentState();

    List<ProgramState> getProgramStates();

    void setProgramStates(List<ProgramState> programStates);
    void logPrgStaExe() throws UtilitsException, IOException;
}
