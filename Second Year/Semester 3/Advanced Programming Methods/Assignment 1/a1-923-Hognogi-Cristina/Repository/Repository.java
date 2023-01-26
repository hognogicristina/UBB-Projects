package Repository;

import Model.Animals;

public class Repository implements InterRepository { // implements the function
    private int capacity = 50;

    private Animals[] animals = new Animals[this.capacity]; // fixed array
    private int nrAnimals = 0;

    @Override
    public void addAnimal(Animals animal) throws Exception {
        try {
            this.animals[this.nrAnimals++] = animal;
        } catch (Exception e) {
            throw new Exception("The repository is full!");
        }
    }

    @Override
    public void removeAnimal(int index) {
        Animals[] newAnimals = new Animals[this.capacity];
        int j = 0;

        for (int i = 0; i < this.nrAnimals; i++) {
            if (i != index) {
                newAnimals[j] = this.animals[i];
                j++;
            }
        }

        this.animals = newAnimals;
        this.nrAnimals--;
    }

    @Override
    public Animals[] getAnimals() {
        return this.animals;
    }

    @Override
    public int getNrAnimals() {
        return this.nrAnimals;
    }
}