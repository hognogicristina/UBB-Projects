// 4. At a farm, birds, cows and pigs are raised. Show all the animals that have the weight bigger than 3kg.

import Controller.Controller;
import Model.*;
import Repository.Repository;
import View.View;

public class Main {
    public static void main(String[] args) throws Exception {
        try {
            Repository repository = new Repository();
            Controller controller = new Controller(repository);
            View view = new View(controller);

            controller.generate();
            view.start();
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
