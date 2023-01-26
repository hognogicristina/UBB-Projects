package View;

import java.util.Scanner;
import java.util.Objects;

import Exceptions.*;
import Controller.Controller;
import Model.Expression.ArithExpression;
import Model.Expression.ValueExpression;
import Model.Expression.VarExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.*;
import Model.Type.BoolType;
import Model.Type.IntType;
import Model.Utilities.*;
import Model.Value.BoolValue;
import Model.Value.IntValue;
import Model.Value.InterValue;
import Repository.InterRepository;
import Repository.Repository;

// Class for the user interface
public class View {
    public void start() {
        boolean done = false;
        while (!done) {
            try {
                printMenu();
                Scanner readOption = new Scanner(System.in);
                int option = readOption.nextInt();
                if (option == 0) {
                    done = true;
                } else if (option == 1) {
                    runProgram1();
                } else if (option == 2) {
                    runProgram2();
                } else if (option == 3) {
                    runProgram3();
                } else {
                    System.out.println("Invalid input!");
                }
            } catch (Exception exception) {
                System.out.println(exception.getMessage());
            }
        }
    }

    private void runStatement(InterStatement statement) throws ExpEvalException, UtilitsException, StatExeExecption {
        // create the program state
        InterStack<InterStatement> executionStack = new MyStack<>();
        InterDictionary<String, InterValue> symbolTable = new MyDictionary<>();
        InterList<InterValue> output = new MyList<>();

        ProgramState state = new ProgramState(executionStack, symbolTable, output, statement);

        InterRepository repository = new Repository(state);
        Controller controller = new Controller(repository);

        System.out.println("Do you want to display the steps?[Y/n]");
        Scanner readOption = new Scanner(System.in);
        String option = readOption.next();
        controller.setDisplayFlag(Objects.equals(option, "Y"));

        controller.allSteps();
        System.out.println("Result is " + state.getOut().toString().replace('[', ' ').replace(']', ' '));
    }

    private void runProgram1() throws UtilitsException, ExpEvalException, StatExeExecption {
        InterStatement ex1 = new CompStatement(new DeclStatement("v", new IntType()),
                new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(2))),
                        new PrintStatement(new VarExpression("v"))));
        runStatement(ex1);
    }

    private void runProgram2() throws UtilitsException, ExpEvalException, StatExeExecption {
        InterStatement ex2 = new CompStatement(new DeclStatement("a", new IntType()),
                new CompStatement(new DeclStatement("b", new IntType()),
                        new CompStatement(new AssignStatement("a", new ArithExpression('+', new ValueExpression(new IntValue(2)), new
                                ArithExpression('*', new ValueExpression(new IntValue(3)), new ValueExpression(new IntValue(5))))),
                                new CompStatement(new AssignStatement("b", new ArithExpression('+', new VarExpression("a"), new ValueExpression(new
                                        IntValue(1)))), new PrintStatement(new VarExpression("b"))))));
        runStatement(ex2);
    }

    private void runProgram3() throws UtilitsException, ExpEvalException, StatExeExecption {
        InterStatement ex3 = new CompStatement(new DeclStatement("a", new BoolType()),
                new CompStatement(new DeclStatement("v", new IntType()),
                        new CompStatement(new AssignStatement("a", new ValueExpression(new BoolValue(true))),
                                new CompStatement(new IfStatement(new VarExpression("a"), new AssignStatement("v", new ValueExpression(new IntValue(2))),
                                        new AssignStatement("v", new ValueExpression(new IntValue(3)))), new PrintStatement(new VarExpression("v"))))));
        runStatement(ex3);
    }

    private void printMenu() {
        System.out.println("MENU: ");
        System.out.println("0. Exit.");
        System.out.println("1. Run the first program: \n\tint v;\n\tv = 2;\n\tPrint(v)");
        System.out.println("2. Run the second program: \n\tint a;\n\tint b;\n\ta = 2 + 3 * 5;\n\tb = a + 1;\n\tPrint(b)");
        System.out.println("3. Run the third program: \n\tbool a;\n\tint v;\n\ta = true;\n\t(if(a) then(v = 2) else(v = 3);\n\tPrint(v)");
        System.out.println("Choose an option: ");
    }
}