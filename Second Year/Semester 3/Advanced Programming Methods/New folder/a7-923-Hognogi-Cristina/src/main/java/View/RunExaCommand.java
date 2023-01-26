package View;

import Controller.Controller;
import Exceptions.InterpreterException;

import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;

// Class that implements the command pattern
public class RunExaCommand extends Command {
    private final Controller controller;

    public RunExaCommand(String key, String description, Controller controller) {
        super(key, description);
        this.controller = controller;
    }

    @Override
    public void execute() {
        try {
            System.out.println("Do you want to display the steps?[Y/n]");
            Scanner readOption = new Scanner(System.in);
            String option = readOption.next();
            controller.setDisplayFlag(Objects.equals(option, "Y"));
            controller.allSteps();
        } catch (InterpreterException e) {
            System.out.println(e.getMessage());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
