package Controller;

import Model.*;
import Repository.InterRepository; // transmitted into reference

public class Controller {
    private InterRepository repository;

    public Controller(InterRepository repository) {
        this.repository = repository;
    }

    public void addAnimal(String type, int weight) throws Exception {
        if (type.equals("Bird")) {
            this.repository.addAnimal(new Birds(weight));
        } else if (type.equals("Cow")) {
            this.repository.addAnimal(new Cows(weight));
        } else if (type.equals("Pig")) {
            this.repository.addAnimal(new Pigs(weight));
        } else {
            throw new ArithmeticException("Invalid type!");
        }
    }

    public void removeAnimal(int index) {
        this.repository.removeAnimal(index);
    }

    public Animals[] getAnimals() {
        return this.repository.getAnimals();
    }

    public int getNrAnimals() {
        return this.repository.getNrAnimals();
    }

    public Animals[] getFilteredAnimals(int weight) {
        Animals[] animals = new Animals[this.repository.getNrAnimals()];
        int nrAnimals = 0;

        for (int i = 0; i < this.repository.getNrAnimals(); i++) {
            if (this.repository.getAnimals()[i].getWeight() > weight && this.repository.getAnimals()[i] != null) {
                animals[nrAnimals++] = this.repository.getAnimals()[i];
            }
        }

        return animals;
    }

    public void generate() throws Exception {
        for (int i = 0; i < 2; ++i) {
            try {
                this.repository.addAnimal(new Birds((int) (Math.random() * 10)));
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        }

        for (int i = 0; i < 2; ++i) {
            try {
                this.repository.addAnimal(new Cows((int) (Math.random() * 10)));
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        }

        for (int i = 0; i < 2; ++i) {
            try {
                this.repository.addAnimal(new Pigs((int) (Math.random() * 10)));
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        }
    }
}

