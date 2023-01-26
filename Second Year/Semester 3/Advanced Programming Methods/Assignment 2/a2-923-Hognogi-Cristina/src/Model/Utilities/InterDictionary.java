package Model.Utilities;

import Exceptions.UtilitsException;

// Interface for the dictionary
public interface InterDictionary<T1, T2> {
    void put(T1 key, T2 value);
    boolean containsKey(T1 key);
    T2 lookUp(T1 key) throws UtilitsException;
    void update(T1 key, T2 value) throws UtilitsException;
}
