package Model.Utilities;

import Exceptions.InterpreterException;

import java.util.List;

// Interface for the stack
public interface InterStack<T> {
    T pop() throws InterpreterException;
    void push(T v);
    boolean isEmpty();

    List<T> getReversed();
}
