package Model.Utilities;

import Exceptions.UtilitsException;

import java.util.Stack;

public class MyStack<T> implements InterStack<T> {
    Stack<T> myStack; // a field whose type CollectionType is an appropriate
    // generic java library collection

    public MyStack() {
        this.myStack = new Stack<>();
    }

    @Override
    public T pop() throws UtilitsException {
        if (myStack.isEmpty())
            throw new UtilitsException("Stack is empty!");
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
    public int size() {
        return this.myStack.size();
    }

    @Override
    public String toString() {
        return this.myStack.toString();
    }
}
