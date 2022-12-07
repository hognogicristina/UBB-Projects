package Model.Value;

import Model.Type.BoolType;

import Model.Type.InterType;

// Class for the boolean value
public class BoolValue implements InterValue {
    private final boolean val;

    public BoolValue(boolean v) {
        this.val = v;
    }

    public boolean getVal() {
        return this.val;
    }

    @Override
    public boolean equals(InterValue another) {
        if (another instanceof BoolValue) {
            BoolValue anotherBool = (BoolValue) another;
            return this.val == anotherBool.getVal();
        }

        return false;
    }

    @Override
    public InterType getType() {
        return new BoolType();
    }

    @Override
    public String toString() {
        return this.val ? "true" : "false";
        // example: if val = true, then return "true"
    }
}
