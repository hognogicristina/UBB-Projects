package Model.Utilities;

import Exceptions.InterpreterException;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

// Interface for the dictionary
public interface InterDictionary<T1, T2> {
    void put(T1 key, T2 value);
    boolean containsKey(T1 key);
    T2 lookUp(T1 key) throws InterpreterException;
    void update(T1 key, T2 value) throws InterpreterException;
    Collection<T2> values();
    void remove(T1 key) throws InterpreterException;;
    Set<T1> keySet();
    Map<T1, T2> getContent();
}
