package Controller;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Utilities.InterStack;
import Repository.InterRepository;

public class Controller {
    InterRepository repo;
    boolean displayFlag = false;

    public Controller(InterRepository repo) {
        this.repo = repo;
    }

    public void setDisplayFlag(boolean displayFlag) {
        this.displayFlag = displayFlag;
    }

    public ProgramState oneStep(ProgramState state) throws UtilitsException, StatExeExecption, ExpEvalException {
        InterStack<InterStatement> stack = state.getExeStack();
        if (stack.isEmpty())
            throw new StatExeExecption("Execution stack is empty!");
        InterStatement currentStatement = stack.pop();
        state.setExeStack(stack);
        return currentStatement.execute(state);
    }

    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException {
        ProgramState program = this.repo.getCurrentState();
        display();
        while(!program.getExeStack().isEmpty()) {
            oneStep(program);
            display();
        }
    }

    private void display() {
        if (displayFlag) {
            System.out.println(this.repo.getCurrentState().toString());
        }
    }

}

