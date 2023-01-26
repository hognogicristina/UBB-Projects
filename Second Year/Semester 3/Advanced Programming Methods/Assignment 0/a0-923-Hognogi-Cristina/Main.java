import java.util.Scanner;

public class Main {
    // AT HOME PROBLEM 4
    public static void main(String[] args) { // without it the code can't be run (driver code)
        // class and subclass
        System.out.println("CLASS AND SUBCLASS");
        Class parent = new Class();
        Subclass child = new Subclass();

        // override
        System.out.println("");
        System.out.println("OVERRIDE");
        System.out.println(parent.fct(3));
        System.out.println(child.fct(3));

        // static fields and methods
        System.out.println("");
        System.out.println("STATIC FIELDS AND METHODS");
        Car car = new Car(4, "Audi");
        System.out.println(car.getWheels() + " wheels and Model " + car.getModel());

        // exception
        System.out.println("");
        System.out.println("EXCEPTION");
        try {
            int data = 50/0;
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // IN CLASS PROBLEM 3
    /* public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int sum = 0;
        double arm = 0;
        int n = 0;

        while (true) {
            System.out.println("Enter a number: ");
            String test = input.nextLine();
            if (test.equals("")) break;
            try {
                sum += Integer.parseInt(test);
                ++n;
            } catch (NegativeArraySizeException e) {
                e.printStackTrace();
            }
        }
        arm = (int)sum/n;
        System.out.println("The average of all integer numbers is: " + arm);
    } // Don't forget to write into the console! */
}
