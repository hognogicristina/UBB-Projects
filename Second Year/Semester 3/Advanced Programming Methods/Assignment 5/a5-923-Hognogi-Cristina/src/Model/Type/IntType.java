package Model.Type;

import Model.Value.IntValue;

import Model.Value.InterValue;

// Class for the type of the integer values
public class IntType implements InterType {
    @Override
    public boolean equals(InterType another) {
        if (another instanceof IntType)
            return true;

        return false;
    }

    @Override
    public String toString() {
        return "int";
    }

    @Override
    public InterValue defaultValue() {
        return new IntValue(0);
    }
}
