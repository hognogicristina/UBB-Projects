package Model.Utilities;

import Exceptions.UtilitsException;
import Model.Value.InterValue;

import java.util.HashMap;
import java.util.Set;

/* Class for the heap */
public class MyHeap implements InterHeap {
    HashMap<Integer, InterValue> heap; /* the heap */
    Integer freeLocationValue; /* the first free location in the heap */

    public int newValue() {
        /* returns the first free location in the heap */
        freeLocationValue += 1;

        while (freeLocationValue == 0 || heap.containsKey(freeLocationValue))
            /* while the free location is 0 or the heap contains the free location */
            freeLocationValue += 1;

        return freeLocationValue;
    }

    public MyHeap() {
        /* constructor */
        this.heap = new HashMap<>();
        freeLocationValue = 1; /* the first free location in the heap */
    }

    @Override
    public int getFreeValue() {
        /* returns the first free location in the heap */
        return freeLocationValue;
    }

    @Override
    public HashMap<Integer, InterValue> getContent() {
        /* returns the heap */
        return heap;
    }

    @Override
    public void setContent(HashMap<Integer, InterValue> newMap) {
        /* sets the heap */
        this.heap = newMap;
    }

    @Override
    public int add(InterValue value) {
        /* adds a value to the heap */
        heap.put(freeLocationValue, value);
        Integer toReturn = freeLocationValue;
        freeLocationValue = newValue();
        return toReturn;
    }

    @Override
    public void update(Integer position, InterValue value) throws UtilitsException {
        /* updates the value at a given position in the heap */
        if (!heap.containsKey(position))
            throw new UtilitsException(String.format("%d is not present in the heap", position));
        heap.put(position, value);
    }

    @Override
    public InterValue get(Integer position) throws UtilitsException {
        /* returns the value at a given position in the heap */
        if (!heap.containsKey(position))
            throw new UtilitsException(String.format("%d is not present in the heap", position));
        return heap.get(position);
    }

    @Override
    public boolean containsKey(Integer position) {
        return heap.containsKey(position);
    }

    @Override
    public void remove(Integer key) throws UtilitsException {
        /* removes a value from the heap */
        if (!heap.containsKey(key))
            throw new UtilitsException(String.format("%d is not present in the heap", key));
        heap.remove(key);
    }

    @Override
    public Set<Integer> keySet() {
        /* returns the set of keys in the heap */
        return heap.keySet();
    }

    @Override
    public String toString() {
        return heap.toString();
        /* example: {1->2, 2->3} */
    }
}
