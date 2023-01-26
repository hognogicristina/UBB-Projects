package Model.Utilities;

import Exceptions.UtilitsException;
import Model.Value.InterValue;

import java.util.List;

// Interface for the list
public interface InterList<T> {
    void add(T e);
    String toString();
    T pop() throws UtilitsException;
    boolean isEmpty();
    List<T> getList();
}
