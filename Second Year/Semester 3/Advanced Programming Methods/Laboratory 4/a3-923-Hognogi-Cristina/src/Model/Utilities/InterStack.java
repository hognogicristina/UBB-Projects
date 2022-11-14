package Model.Utilities;

import Exceptions.UtilitsException;

import java.util.List;

// Interface for the stack
public interface InterStack<T> {
    T pop() throws UtilitsException;
    void push(T v);
    boolean isEmpty();

    List<T> getReversed();
}
