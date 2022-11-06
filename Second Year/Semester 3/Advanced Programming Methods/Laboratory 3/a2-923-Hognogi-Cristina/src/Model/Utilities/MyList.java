package Model.Utilities;

import java.util.ArrayList;

public class MyList<T> implements InterList<T> {
    ArrayList<T> myList;

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
}