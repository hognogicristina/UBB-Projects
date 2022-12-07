package Model.Utilities;

import Exceptions.UtilitsException;

import java.util.*;

// Class for the stack
public class MyStack<T> implements InterStack<T> {
    Stack<T> myStack;

    public MyStack() {
        this.myStack = new Stack<>();
    }

    @Override
    public T pop() throws UtilitsException {
        // remove the top element from the stack
        if (myStack.isEmpty())
            throw new UtilitsException("Stack is empty!");

        return this.myStack.pop();
    }

    @Override
    public void push(T v) {
        // add a new element
        this.myStack.push(v);
    }

    @Override
    public boolean isEmpty() {
        // check if the stack is empty
        return this.myStack.isEmpty();
    }

    @Override
    public List<T> getReversed() {
        /* return the stack in reversed order
           convert the stack to an array for easier manipulation and then to a list */
        List<T> reversed = Arrays.asList((T[]) this.myStack.toArray());
        Collections.reverse(reversed);
        return this.myStack;
    }

    @Override
    public String toString() {
        return this.myStack.toString();
        // example: LAST IN FIRST OUT (LIFO)
    }
}
