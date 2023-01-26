package Exceptions;

// Class for exceptions in the expression evaluator
public class ExpEvalException extends Exception {
    public ExpEvalException(String message) {
        super(message);
    }

    public ExpEvalException() {
        super();
    }
}

