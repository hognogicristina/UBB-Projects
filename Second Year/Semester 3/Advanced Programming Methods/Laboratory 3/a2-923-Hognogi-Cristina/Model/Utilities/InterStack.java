package Model.Utilities;

import Exceptions.UtilitsException;

public interface InterStack<T> {
    T pop() throws UtilitsException;
    void push(T v);
    boolean isEmpty();
    int size();
}
