package GUI;

import Controller.Controller;
import Exceptions.InterpreterException;
import Model.Expression.*;
import Model.ProgramState.ProgramState;
import Model.Statement.*;
import Model.Statement.File.CloseReadFile;
import Model.Statement.File.OpenReadFile;
import Model.Statement.File.ReadFile;
import Model.Type.BoolType;
import Model.Type.IntType;
import Model.Type.RefType;
import Model.Type.StringType;
import Model.Utilities.MyDictionary;
import Model.Utilities.MyHeap;
import Model.Utilities.MyList;
import Model.Utilities.MyStack;
import Model.Value.BoolValue;
import Model.Value.IntValue;
import Model.Value.StringValue;
import Repository.InterRepository;
import Repository.Repository;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.SelectionMode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProgramChooserController {
    private ProgramExecutorController programExecutorController;

    public void setProgramExecutorController(ProgramExecutorController programExecutorController) {
        this.programExecutorController = programExecutorController;
    }
    @FXML
    private ListView<InterStatement> programsListView;

    @FXML
    private Button displayButton;

    @FXML
    public void initialize() {
        programsListView.setItems(getAllStatements());
        programsListView.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);
    }

    @FXML
    private void displayProgram(ActionEvent actionEvent) {
        InterStatement selectedStatement = programsListView.getSelectionModel().getSelectedItem();
        if (selectedStatement == null) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Error encountered!");
            alert.setContentText("No statement selected!");
            alert.showAndWait();
        } else {
            int id = programsListView.getSelectionModel().getSelectedIndex();
            try {
                selectedStatement.typeCheck(new MyDictionary<>());
                ProgramState programState = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), selectedStatement);
                InterRepository repository = new Repository(programState, "log" + (id + 1) + ".txt");
                Controller controller = new Controller(repository);
                programExecutorController.setController(controller);
            } catch (InterpreterException | IOException exception) {
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("Error encountered!");
                alert.setContentText(exception.getMessage());
                alert.showAndWait();
            }
        }
    }

    @FXML
    private ObservableList<InterStatement> getAllStatements() {
        List<InterStatement> allStatements = new ArrayList<>();

        InterStatement ex1 = new CompStatement(new DeclStatement("v", new IntType()),
                new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(2))),
                        new PrintStatement(new VarExpression("v"))));
        allStatements.add(ex1);

        InterStatement ex2 = new CompStatement(new DeclStatement("a", new IntType()),
                new CompStatement(new DeclStatement("b", new IntType()),
                        new CompStatement(new AssignStatement("a", new ArithExpression('+', new ValueExpression(new IntValue(2)), new
                                ArithExpression('*', new ValueExpression(new IntValue(3)), new ValueExpression(new IntValue(5))))),
                                new CompStatement(new AssignStatement("b", new ArithExpression('+', new VarExpression("a"), new ValueExpression(new
                                        IntValue(1)))), new PrintStatement(new VarExpression("b"))))));

        allStatements.add(ex2);

        InterStatement ex3 = new CompStatement(new DeclStatement("a", new BoolType()),
                new CompStatement(new DeclStatement("v", new IntType()),
                        new CompStatement(new AssignStatement("a", new ValueExpression(new BoolValue(true))),
                                new CompStatement(new IfStatement(new VarExpression("a"),
                                        new AssignStatement("v", new ValueExpression(new IntValue(2))),
                                        new AssignStatement("v", new ValueExpression(new StringValue("a")))),
                                        new PrintStatement(new VarExpression("v"))))));
        allStatements.add(ex3);

        InterStatement ex4 = new CompStatement(new DeclStatement("varf", new StringType()),
                new CompStatement(new AssignStatement("varf", new ValueExpression(new StringValue("test.in"))),
                        new CompStatement(new OpenReadFile(new VarExpression("varf")),
                                new CompStatement(new DeclStatement("varc", new IntType()),
                                        new CompStatement(new ReadFile(new VarExpression("varf"), "varc"),
                                                new CompStatement(new PrintStatement(new VarExpression("varc")),
                                                        new CompStatement(new ReadFile(new VarExpression("varf"), "varc"),
                                                                new CompStatement(new PrintStatement(new VarExpression("varc")),
                                                                        new CloseReadFile(new VarExpression("varf"))))))))));

        allStatements.add(ex4);

        InterStatement ex5 = new CompStatement(new DeclStatement("a", new IntType()),
                new CompStatement(new DeclStatement("b", new IntType()),
                        new CompStatement(new AssignStatement("a", new ValueExpression(new IntValue(5))),
                                new CompStatement(new AssignStatement("b", new ValueExpression(new IntValue(7))),
                                        new IfStatement(new RelatExpression(">", new VarExpression("a"),
                                                new VarExpression("b")), new PrintStatement(new VarExpression("a")),
                                                new PrintStatement(new VarExpression("b")))))));

        allStatements.add(ex5);

        InterStatement ex6 = new CompStatement(new DeclStatement("v", new RefType(new IntType())),
                new CompStatement(new Model.Statement.NewStatement("v", new ValueExpression(new IntValue(20))),
                        new CompStatement(new DeclStatement("a", new RefType(new RefType(new IntType()))),
                                new CompStatement(new Model.Statement.NewStatement("a", new VarExpression("v")),
                                        new CompStatement(new PrintStatement(new VarExpression("v")), new PrintStatement(new VarExpression("a")))))));

        allStatements.add(ex6);

        InterStatement ex7 = new CompStatement(new DeclStatement("v", new RefType(new IntType())),
                new CompStatement(new Model.Statement.NewStatement("v", new ValueExpression(new BoolValue(true))),
                        new CompStatement(new DeclStatement("a", new RefType(new RefType(new IntType()))),
                                new CompStatement(new Model.Statement.NewStatement("a", new VarExpression("v")),
                                        new CompStatement(new PrintStatement(new ReadHeapExpression(new VarExpression("v"))),
                                                new PrintStatement(new ArithExpression('+',new ReadHeapExpression(new ReadHeapExpression(new VarExpression("a"))), new ValueExpression(new IntValue(5)))))))));

        allStatements.add(ex7);

        InterStatement ex8 = new CompStatement(new DeclStatement("v", new RefType(new IntType())),
                new CompStatement(new Model.Statement.NewStatement("v", new ValueExpression(new IntValue(20))),
                        new CompStatement( new PrintStatement(new ReadHeapExpression(new VarExpression("v"))),
                                new CompStatement(new Model.Statement.WriteHeapStatement("v", new ValueExpression(new IntValue(30))),
                                        new PrintStatement(new ArithExpression('+', new ReadHeapExpression(new VarExpression("v")), new ValueExpression(new IntValue(5))))))));

        allStatements.add(ex8);

        InterStatement ex9 = new CompStatement(new DeclStatement("v", new RefType(new IntType())),
                new CompStatement(new Model.Statement.NewStatement("v", new ValueExpression(new IntValue(20))),
                        new CompStatement(new DeclStatement("a", new RefType(new RefType(new IntType()))),
                                new CompStatement(new Model.Statement.NewStatement("a", new VarExpression("v")),
                                        new CompStatement(new Model.Statement.NewStatement("v", new ValueExpression(new IntValue(30))),
                                                new PrintStatement(new ReadHeapExpression(new ReadHeapExpression(new VarExpression("a")))))))));

        allStatements.add(ex9);

        InterStatement ex10 = new CompStatement(new DeclStatement("v", new IntType()),
                new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(4))),
                        new CompStatement(new Model.Statement.WhileStatement(new RelatExpression(">", new VarExpression("v"), new ValueExpression(new IntValue(0))),
                                new CompStatement(new PrintStatement(new VarExpression("v")), new AssignStatement("v",new ArithExpression('-', new VarExpression("v"), new ValueExpression(new IntValue(1)))))),
                                new PrintStatement(new VarExpression("v")))));

        allStatements.add(ex10);

        InterStatement ex11 = new CompStatement(new DeclStatement("v", new IntType()),
                new CompStatement(new DeclStatement("a", new RefType(new IntType())),
                        new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(10))),
                                new CompStatement(new NewStatement("a", new ValueExpression(new IntValue(22))),
                                        new CompStatement(new ForkStatement(new CompStatement(new WriteHeapStatement("a", new ValueExpression(new IntValue(30))),
                                                new CompStatement(new AssignStatement("v", new ValueExpression(new IntValue(32))),
                                                        new CompStatement(new PrintStatement(new VarExpression("v")), new PrintStatement(new ReadHeapExpression(new VarExpression("a"))))))),
                                                new CompStatement(new PrintStatement(new VarExpression("v")), new PrintStatement(new ReadHeapExpression(new VarExpression("a")))))))));
        allStatements.add(ex11);
        return FXCollections.observableArrayList(allStatements);
    }
}