package Model.Utilities;

import Exceptions.UtilitsException;

import java.util.ArrayList;
import java.util.List;

// Class for the list
public class MyList<T> implements InterList<T> {
    List<T> myList;

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

    @Override
    public T pop() throws UtilitsException {
        // remove the last element from the list
        if (myList.isEmpty())
            throw new UtilitsException("List is empty!");

        return this.myList.remove(0);
    }

    @Override
    public boolean isEmpty() {
        // check if the list is empty
        return this.myList.isEmpty();
    }

    @Override
    public List<T> getList() {
        return myList;
    }
}