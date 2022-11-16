package View;

import Controller.Controller;
import Model.Expression.ArithExpression;
import Model.Expression.RelatExpression;
import Model.Expression.ValueExpression;
import Model.Expression.VarExpression;
import Model.ProgramState.ProgramState;
import Model.Statement.*;
import Model.Statement.File.CloseReadFile;
import Model.Statement.File.OpenReadFile;
import Model.Statement.File.ReadFile;
import Model.Type.BoolType;
import Model.Type.IntType;
import Model.Type.StringType;
import Model.Utilities.*;
import Model.Value.BoolValue;
import Model.Value.IntValue;
import Model.Value.StringValue;
import Repository.InterRepository;
import Repository.Repository;

/* Class that interprets the program */
public class Interpreter {
    public static void main(String[] args) {
        /* create the program state */
        InterStatement ex1 = new CompStatement(new DeclStatement("v", new IntType()),
                new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(2))),
                        new PrintStatement(new VarExpression("v"))));

        /* create the repository and the controller for the program state created */
        ProgramState prg1 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), ex1);
        InterRepository repo1 = new Repository(prg1, "log1.txt");
        Controller controller1 = new Controller(repo1);

        /* create the program state */
        InterStatement ex2 = new CompStatement(new DeclStatement("a", new IntType()),
                new CompStatement(new DeclStatement("b", new IntType()),
                        new CompStatement(new AssignStatement("a", new ArithExpression('+', new ValueExpression(new IntValue(2)), new
                                ArithExpression('*', new ValueExpression(new IntValue(3)), new ValueExpression(new IntValue(5))))),
                                new CompStatement(new AssignStatement("b", new ArithExpression('+', new VarExpression("a"), new ValueExpression(new
                                        IntValue(1)))), new PrintStatement(new VarExpression("b"))))));

        /* create the repository and the controller for the program state created */
        ProgramState prg2 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), ex2);
        InterRepository repo2 = new Repository(prg2, "log2.txt");
        Controller controller2 = new Controller(repo2);

        /* create the program state */
        InterStatement ex3 = new CompStatement(new DeclStatement("a", new BoolType()),
                new CompStatement(new DeclStatement("v", new IntType()),
                        new CompStatement(new AssignStatement("a", new ValueExpression(new BoolValue(true))),
                                new CompStatement(new IfStatement(new VarExpression("a"),
                                        new AssignStatement("v", new ValueExpression(new IntValue(2))),
                                        new AssignStatement("v", new ValueExpression(new IntValue(3)))),
                                        new PrintStatement(new VarExpression("v"))))));

        /* create the repository and the controller for the program state created */
        ProgramState prg3 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), ex3);
        InterRepository repo3 = new Repository(prg3, "log3.txt");
        Controller controller3 = new Controller(repo3);

        /* create the program state */
        InterStatement ex4 = new CompStatement(new DeclStatement("varf", new StringType()),
                new CompStatement(new AssignStatement("varf", new ValueExpression(new StringValue("test.in"))),
                        new CompStatement(new OpenReadFile(new VarExpression("varf")),
                                new CompStatement(new DeclStatement("varc", new IntType()),
                                        new CompStatement(new ReadFile(new VarExpression("varf"), "varc"),
                                                new CompStatement(new PrintStatement(new VarExpression("varc")),
                                                        new CompStatement(new ReadFile(new VarExpression("varf"), "varc"),
                                                                new CompStatement(new PrintStatement(new VarExpression("varc")),
                                                                        new CloseReadFile(new VarExpression("varf"))))))))));

        /* create the repository and the controller for the program state created */
        ProgramState prg4 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), ex4);
        InterRepository repo4 = new Repository(prg4, "log4.txt");
        Controller controller4 = new Controller(repo4);

        InterStatement ex5 = new CompStatement(new DeclStatement("a", new IntType()),
                new CompStatement(new DeclStatement("b", new IntType()),
                        new CompStatement(new AssignStatement("a", new ValueExpression(new IntValue(5))),
                                new CompStatement(new AssignStatement("b", new ValueExpression(new IntValue(7))),
                                        new IfStatement(new RelatExpression(">", new VarExpression("a"),
                                                new VarExpression("b")), new PrintStatement(new VarExpression("a")),
                                                new PrintStatement(new VarExpression("b")))))));

        /* create the repository and the controller for the program state created */
        ProgramState prg5 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), ex5);
        InterRepository repo5 = new Repository(prg5, "log5.txt");
        Controller controller5 = new Controller(repo5);

        TextMenu menu = new TextMenu();
        /* add the commands to the menu */
        menu.addCommand(new ExitCommand("0", "exit"));
        menu.addCommand(new RunExaCommand("1", ex1.toString(), controller1));
        menu.addCommand(new RunExaCommand("2", ex2.toString(), controller2));
        menu.addCommand(new RunExaCommand("3", ex3.toString(), controller3));
        menu.addCommand(new RunExaCommand("4", ex4.toString(), controller4));
        menu.addCommand(new RunExaCommand("5", ex5.toString(), controller5));
        menu.show();
    }
}
