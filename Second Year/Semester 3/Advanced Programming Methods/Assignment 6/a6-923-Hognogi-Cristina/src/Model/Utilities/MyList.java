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
        this.myList.add(e);
    }

    @Override
    public String toString() {
        return this.myList.toString();
    }

    @Override
    public T pop() throws UtilitsException {
        if (myList.isEmpty())
            throw new UtilitsException("List is empty!");

        return this.myList.remove(0);
    }

    @Override
    public boolean isEmpty() {
        return this.myList.isEmpty();
    }

    @Override
    public List<T> getList() {
        return myList;
    }
}