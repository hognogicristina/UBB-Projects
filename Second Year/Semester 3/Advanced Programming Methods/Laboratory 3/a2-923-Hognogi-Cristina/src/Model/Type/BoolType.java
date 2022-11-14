package Model.Type;

import Model.Value.BoolValue;

import Model.Value.InterValue;

// Class for the boolean type
public class BoolType implements InterType {
    @Override
    public boolean equals(Object another) {
        // check if two objects are the same
        if (another instanceof BoolType)
            return true;
        return false;
    }

    @Override
    public String toString() {
        return "boolean";
    }

    @Override
    public InterValue defaultValue() {
        // default value for boolean is false
        return new BoolValue(false);
    }
}
