package Model.Utilities;

import Exceptions.InterpreterException;

import java.util.List;

// Interface for the list
public interface InterList<T> {
    void add(T e);
    String toString();
    T pop() throws InterpreterException;
    boolean isEmpty();
    List<T> getList();
}
