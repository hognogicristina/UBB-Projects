package Model.Utilities;

import Exceptions.InterpreterException;
import Model.Value.InterValue;

import java.util.HashMap;
import java.util.Set;

// Interface for the heap
public interface InterHeap {
    int getFreeValue();
    HashMap<Integer, InterValue> getContent();
    void setContent(HashMap<Integer, InterValue> newMap);
    int add(InterValue value);
    void update(Integer position, InterValue value) throws InterpreterException;
    InterValue get(Integer position) throws InterpreterException;
    boolean containsKey(Integer position);
    void remove(Integer key) throws InterpreterException;
    Set<Integer> keySet();
}
