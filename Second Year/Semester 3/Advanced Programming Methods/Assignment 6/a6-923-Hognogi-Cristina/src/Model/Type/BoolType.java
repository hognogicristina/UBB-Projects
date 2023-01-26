package Model.Type;

import Model.Value.BoolValue;
import Model.Value.InterValue;

// Class for the boolean type
public class BoolType implements InterType {
    @Override
    public boolean equals(InterType another) {
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
        return new BoolValue(false);
    }
}
