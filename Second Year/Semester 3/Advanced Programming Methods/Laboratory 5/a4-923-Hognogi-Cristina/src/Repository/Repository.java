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

    public Repository(ProgramState programState, String logFilePath) throws IOException {
        this.logFilePath = logFilePath;
        this.programStates = new ArrayList<>(); // initialize the list of program states
        this.currentIndex = 0;
        this.addProgram(programState); // add the program state to the list
        this.emptyLogFile(); // empty the log file
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
    public List<ProgramState> getProgramList() {
        return this.programStates;
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
    public void logPrgStaExe(ProgramState programState) throws UtilitsException, IOException {
        // writes the current state of the program to the log file (logFilePath) and closes the file after writing is done
        PrintWriter logFile = new PrintWriter((new BufferedWriter(new FileWriter(this.logFilePath, true))));
        logFile.println(programState.programStateToString());

        logFile.close();
    }

    @Override
    public void emptyLogFile() throws IOException {
        /* opens the log file (logFilePath) and closes it immediately, thus emptying it */
        PrintWriter logFile = new PrintWriter(new BufferedWriter(new FileWriter(this.logFilePath, false)));
        logFile.close();
    }
}