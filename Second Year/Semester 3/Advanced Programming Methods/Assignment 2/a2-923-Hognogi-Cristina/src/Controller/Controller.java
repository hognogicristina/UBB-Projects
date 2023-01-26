package Controller;

import Exceptions.UtilitsException;
import Exceptions.ExpEvalException;
import Exceptions.StatExeExecption;
import Model.ProgramState.ProgramState;
import Model.Statement.InterStatement;
import Model.Utilities.InterStack;
import Repository.InterRepository;

// Class for the controller of the program (service)
public class Controller {
    InterRepository repo;
    boolean displayFlag = false;

    public Controller(InterRepository repo) {
        this.repo = repo;
    }

    public void setDisplayFlag(boolean displayFlag) {
        // displayFlag is a boolean that indicates if the program should display the steps
        this.displayFlag = displayFlag;
    }

    public ProgramState oneStep(ProgramState state) throws UtilitsException, StatExeExecption, ExpEvalException {
        // executes one step of the program and gets the top statement from the stack
        InterStack<InterStatement> stack = state.getExeStack();

        if (stack.isEmpty())
            throw new StatExeExecption("Execution stack is empty!");

        InterStatement currentStatement = stack.pop();
        state.setExeStack(stack);
        return currentStatement.execute(state);
    }

    public void allSteps() throws UtilitsException, StatExeExecption, ExpEvalException {
        // executes all the steps and displays the current state of the program
        ProgramState program = this.repo.getCurrentState();
        display();

        while(!program.getExeStack().isEmpty()) { // while the stack is not empty
            oneStep(program);
            display();
        }
    }

    private void display() {
        // displays the current state of the program if the displayFlag is true
        if (displayFlag) {
            System.out.println(this.repo.getCurrentState().toString());
        }
    }

}

