package Repository;

import Exceptions.InterpreterException;
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
    private final String logFilePath;

    public Repository(ProgramState programState, String logFilePath) throws IOException {
        this.logFilePath = logFilePath;
        this.programStates = new ArrayList<>();
        this.addProgram(programState);
        this.emptyLogFile();
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
    public void logPrgStaExe(ProgramState programState) throws InterpreterException, IOException {
        PrintWriter logFile = new PrintWriter((new BufferedWriter(new FileWriter(this.logFilePath, true))));
        logFile.println(programState.programStateToString());

        logFile.close();
    }

    @Override
    public void emptyLogFile() throws IOException {
        PrintWriter logFile = new PrintWriter(new BufferedWriter(new FileWriter(this.logFilePath, false)));
        logFile.close();
    }
}