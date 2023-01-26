package Model.Utilities;

import Exceptions.InterpreterException;

import java.util.*;

// Class for the stack
public class MyStack<T> implements InterStack<T> {
    Stack<T> myStack;

    public MyStack() {
        this.myStack = new Stack<>();
    }

    @Override
    public T pop() throws InterpreterException {
        if (myStack.isEmpty())
            throw new InterpreterException("Stack is empty!");
        return this.myStack.pop();
    }

    @Override
    public void push(T v) {
        this.myStack.push(v);
    }

    @Override
    public boolean isEmpty() {
        return this.myStack.isEmpty();
    }

    @Override
    public List<T> getReversed() {
        List<T> reversed = Arrays.asList((T[]) this.myStack.toArray());
        Collections.reverse(reversed);
        return reversed;
    }

    @Override
    public String toString() {
        return this.myStack.toString();
    }
}
