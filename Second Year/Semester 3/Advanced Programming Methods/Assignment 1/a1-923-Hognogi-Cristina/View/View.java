package View;

import Controller.Controller;
import Model.Animals;

import java.util.Scanner;

public class View {
    private final Controller controller;

    public View(Controller controller) {
        this.controller = controller;
    }

    private static void printMenu() {
        System.out.println("\nChoose an option: ");
        System.out.println("1. Display all animals.");
        System.out.println("2. Add a animal.");
        System.out.println("3. Remove a animal.");
        System.out.println("4. Display all the animals that have the weight greater than a given weight.");
        System.out.println("5. Exit.\n");
    }

    private void printAnimals() {
        System.out.println("Animals available are: ");
        Animals[] animals = this.controller.getAnimals();
        if (this.controller.getNrAnimals() == 0) {
            System.out.println("There are no animals.");
        } else {
            for (int i = 0; i < this.controller.getNrAnimals(); i++) {
                System.out.println(i + ". " + animals[i].toString());
            }
        }
    }

    private void addAnimal() throws Exception {
        int weight;
        String type;

        while (true) {
            try {
                System.out.println("Enter type: ");
                Scanner readType = new Scanner(System.in);
                type = readType.nextLine();
                if (type.equals("Bird") || type.equals("Cow") || type.equals("Pig")) {
                    break;
                } else
                    System.out.println("The type must be Bird, Cow or Pig.");
            } catch (Exception e) {
                System.out.println("The type must be Bird, Cow or Pig.");
            }
        }

        while (true) {
            try {
                System.out.println("Enter a weight: ");
                String weightString = new Scanner(System.in).nextLine();
                weight = Integer.parseInt(weightString);

                if (weight > 0)
                    break;
                else
                    System.out.println("Invalid weight! Please try again.");
            } catch (Exception e) {
                System.out.println("Invalid weight! Please try again.");
            }
        }

        try {
            this.controller.addAnimal(type, weight);
            System.out.println("Animal added.");
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private void removeAnimal() throws Exception {
        int index;

        while (true) {
            System.out.println("Enter index from the list: ");
            String indexString = new Scanner(System.in).nextLine();
            try {
                index = Integer.parseInt(indexString);
                if (index >= 0 && index < this.controller.getNrAnimals())
                    break;
                else
                    System.out.println("Invalid index! Please try again.");
            } catch (Exception e) {
                System.out.println("Invalid index! Please try again.");
            }
        }

        try {
            this.controller.removeAnimal(index);
            System.out.println("Animal removed.");
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private void printFilteredAnimals() throws Exception {
        if (this.controller.getNrAnimals() == 0) {
            System.out.println("There are no animals.");
            return;
        }

        int index;
        while (true) {
            System.out.println("Enter a weight available in the list: ");
            String indexString = new Scanner(System.in).nextLine();

            try {
                index = Integer.parseInt(indexString);
                Animals[] filteredAnimals = this.controller.getFilteredAnimals(index);

                if (index > 0 && filteredAnimals[0] != null)
                    break;
                else
                    System.out.println("Incorrect value for weight! Please try again.");
            } catch (Exception e) {
                System.out.println("Incorrect value for weight! Please try again.");
            }
        }

        try {
            System.out.println("Animals with weight greater than " + index + " are: ");
            Animals[] filteredAnimals = this.controller.getFilteredAnimals(index);

            for (int i = 0; i < filteredAnimals.length; i++) {
                if (filteredAnimals[i] != null) {
                    System.out.println(i + ". " + filteredAnimals[i].toString());
                }
            }

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void start() throws Exception {
        boolean done = false;

        while (!done) {
            try {
                printMenu();
                Scanner readOption = new Scanner(System.in);
                int option = readOption.nextInt();

                if (option == 1) {
                    this.printAnimals();
                } else if (option == 2) {
                    this.addAnimal();
                } else if (option == 3) {
                    this.removeAnimal();
                } else if (option == 4) {
                    this.printFilteredAnimals();
                } else if (option == 5) {
                    done = true;
                } else {
                    System.out.println("Invalid option!");
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }
}