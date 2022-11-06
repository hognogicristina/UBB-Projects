package Repository;

import Model.*;

public interface InterRepository {
    // Abstract class (like a header file)
    // Function name like a header file
    void addAnimal(Animals animal) throws Exception;

    void removeAnimal(int index);

    Animals[] getAnimals();

    int getNrAnimals();
}
