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

// Class for the WriteHeap statement
public class NewStatement implements InterStatement {
    private final String varName;
    private final InterExpression expression;

    public NewStatement(String varName, InterExpression expression) {
        this.varName = varName;
        this.expression = expression;
    }

    @Override
    public ProgramState execute(ProgramState state) throws InterpreterException {
        InterDictionary<String, InterValue> symTable = state.getSymTable();
        InterHeap heap = state.getHeap();

        if (symTable.containsKey(varName)) {
            InterValue varValue = symTable.lookUp(varName);

            if ((varValue.getType() instanceof RefType)) {
                InterValue evaluated = expression.eval(symTable, heap);
                InterType locationType = ((RefValue) varValue).getLocationType();

                if (locationType.equals(evaluated.getType())) {
                    int newPosition = heap.add(evaluated);
                    symTable.put(varName, new RefValue(newPosition, locationType));
                    state.setSymTable(symTable);
                    state.setHeap(heap);
                } else
                    throw new InterpreterException(String.format("%s not of %s", varName, evaluated.getType()));
            } else {
                throw new InterpreterException(String.format("%s in not of RefType", varName));
            }
        } else {
            throw new InterpreterException(String.format("%s not in symTable", varName));
        }
        return null;
    }

    @Override
    public InterDictionary<String, InterType> typeCheck(InterDictionary<String, InterType> typeEnv) throws InterpreterException {
        // check if typeVar and typeExpr are the same
        InterType typeVar = typeEnv.lookUp(varName);
        InterType typeExpr = expression.typeCheck(typeEnv);
        if (typeVar.equals(new RefType(typeExpr)))
            return typeEnv;
        else
            throw new InterpreterException("NEW statement: right hand side and left hand side have different types.");

    }

    @Override
    public String toString() {
        return String.format("New(%s, %s)", varName, expression);
    }
}
