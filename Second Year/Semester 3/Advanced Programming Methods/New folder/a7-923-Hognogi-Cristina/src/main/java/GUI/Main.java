package GUI;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        FXMLLoader programListLoader = new FXMLLoader();
        programListLoader.setLocation(Main.class.getResource("ProgramChooserController.fxml"));
        Parent programListRoot = programListLoader.load();
        Scene programListScene = new Scene(programListRoot, 500, 550);
        ProgramChooserController programChooserController = programListLoader.getController();
        stage.setTitle("Select a program");
        stage.setScene(programListScene);
        stage.show();

        FXMLLoader programExecutorLoader = new FXMLLoader();
        programExecutorLoader.setLocation(Main.class.getResource("ProgramExecutorController.fxml"));
        Parent programExecutorRoot = programExecutorLoader.load();
        Scene programExecutorScene = new Scene(programExecutorRoot, 700, 500);
        ProgramExecutorController programExecutorController = programExecutorLoader.getController();
        programChooserController.setProgramExecutorController(programExecutorController);
        Stage secondaryStage = new Stage();
        secondaryStage.setTitle("Interpreter");
        secondaryStage.setScene(programExecutorScene);
        secondaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
