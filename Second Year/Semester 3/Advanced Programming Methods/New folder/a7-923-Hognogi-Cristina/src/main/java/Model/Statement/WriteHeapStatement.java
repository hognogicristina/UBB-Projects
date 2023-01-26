package Model.Statement;

import Exceptions.InterpreterException;
import Model.Expression.InterExpression;
import Model.ProgramState.ProgramState;
import Model.Type.InterType;
import Model.Type.RefType;
import Model.Utilities.InterDictionary;
import Model.Utilities.InterHeap;
import Model.Value.InterValue;
import Model.Value.RefValue;

// WriteHeapStatement implements the IStatement interface, and it is used for writing a value in the heap at a given address.
public class WriteHeapStatement implements InterStatement{
    private final String varName;
    private final InterExpression expression;

    public WriteHeapStatement(String varName, InterExpression expression) {
        this.varName = varName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws InterpreterException {
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterHeap heap = state.getHeap();

        if (symTable.containsKey(varName)) {
            InterValue value = symTable.lookUp(varName);

            if (value.getType() instanceof RefType) {
                RefValue refValue = (RefValue) value;

                if (heap.containsKey(refValue.getAddress())) {
                    InterValue evaluated = expression.eval(symTable, heap);

                    if (evaluated.getType().equals(refValue.getLocationType())) {
                        heap.update(refValue.getAddress(), evaluated);
                        state.setHeap(heap);
                    } else
                        throw new InterpreterException(String.format("%s not of %s", evaluated, refValue.getLocationType()));
                } else
                    throw new InterpreterException(String.format("The RefValue %s is not defined in the heap", value));
            } else
                throw new InterpreterException(String.format("%s not of RefType", value));
        } else
            throw new InterpreterException(String.format("%s not present in the symTable", varName));
        return null;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // Check if the variable is defined in the typeEnv
        if (typeEnv.lookUp(varName).equals(new RefType(expression.typeCheck(typeEnv))))
            return typeEnv;
        else
            throw new InterpreterException("WriteHeap: right hand side and left hand side have different types.");

    }

    @Override
    public String toString() {
        return String.format("WriteHeap(%s, %s)", varName, expression);
    }
}
