package Exceptions;

// Class for exceptions in the expression evaluator
public class StatExeExecption extends Exception {
    public StatExeExecption(String message) {
        super(message);
    }

    public StatExeExecption() {
        super();
    }
}
