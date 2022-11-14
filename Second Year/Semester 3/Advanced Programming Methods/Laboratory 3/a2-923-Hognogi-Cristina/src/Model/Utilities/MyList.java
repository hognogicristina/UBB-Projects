package Model.Utilities;

import java.util.ArrayList;

// Class for the list
public class MyList<T> implements InterList<T> {
    ArrayList<T> myList;

    public MyList() {
        this.myList = new ArrayList<>();
    }

    @Override
    public void add(T e) {
        // add a new element to the list
        this.myList.add(e);
    }

    @Override
    public String toString() {
        return this.myList.toString();
        // example: [1, 2, 3]
    }
}