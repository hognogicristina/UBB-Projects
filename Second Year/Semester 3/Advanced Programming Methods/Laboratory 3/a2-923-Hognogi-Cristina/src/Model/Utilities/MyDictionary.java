package Model.Utilities;

import Exceptions.UtilitsException;

import java.util.HashMap;

public class MyDictionary<T1, T2> implements InterDictionary<T1, T2> {
    HashMap<T1, T2> dict;

    public MyDictionary() {
        this.dict = new HashMap<>();
    }

    @Override
    public void put(T1 key, T2 value) {
        this.dict.put(key, value);
    }

    @Override
    public boolean containsKey(T1 key) {
        return this.dict.containsKey(key);
    }

    @Override
    public T2 lookUp(T1 key) throws UtilitsException {
        if (!containsKey(key))
            throw new UtilitsException(key + " is not defined.");
        return this.dict.get(key);
    }

    @Override
    public void update(T1 key, T2 value) throws UtilitsException {
        if (!containsKey(key))
            throw new UtilitsException(key + " is not defined.");
        this.dict.put(key, value);
    }

    @Override
    public String toString() {
        return this.dict.toString();
    }
}
