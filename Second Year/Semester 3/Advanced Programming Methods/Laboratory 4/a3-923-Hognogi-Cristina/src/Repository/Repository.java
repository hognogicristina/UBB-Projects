package Repository;

import Exceptions.UtilitsException;
import Model.ProgramState.ProgramState;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

// Class for the repository
public class Repository implements InterRepository {
    private List<ProgramState> programStates;
    private int currentIndex;
    private final String logFilePath;

    public Repository(ProgramState programState, String logFilePath) {
        this.logFilePath = logFilePath;
        this.programStates = new ArrayList<>(); // initialize the list of program states
        this.addProgram(programState); // add the program state to the list
    }

    public int getCurrentIndex() {
        return this.currentIndex;
    }

    public void setCurrentIndex(int currentIndex) {
        this.currentIndex = currentIndex;
    }
    @Override
    public void addProgram(ProgramState programState) {
        this.programStates.add(programState);
    }

    @Override
    public ProgramState getCurrentState() {
        return this.programStates.get(this.currentIndex); // get the current program state from the list
    }

    @Override
    public List<ProgramState> getProgramStates() {
        return this.programStates;
    }

    @Override
    public void setProgramStates(List<ProgramState> programStates) {
        this.programStates = programStates;
    }

    @Override
    public void logPrgStaExe() throws UtilitsException, IOException {
        // writes the current state of the program to the log file (logFilePath) and closes the file after writing is done
        PrintWriter logFile = new PrintWriter((new BufferedWriter(new FileWriter(this.logFilePath, true))));
        logFile.println(this.programStates.get(0).programStateToString());

        logFile.close();
    }
}