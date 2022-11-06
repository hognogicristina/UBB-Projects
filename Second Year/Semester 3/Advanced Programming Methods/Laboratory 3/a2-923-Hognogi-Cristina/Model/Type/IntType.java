package Model.Type;

import Model.Value.IntValue;

import Model.Value.InterValue;

public class IntType implements InterType {
    @Override
    public boolean equals(Object another) {
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
