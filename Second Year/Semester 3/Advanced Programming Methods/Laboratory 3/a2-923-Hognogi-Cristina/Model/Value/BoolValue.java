package Model.Value;

import Model.Type.BoolType;

import Model.Type.InterType;

public class BoolValue implements InterValue {
    private final boolean val;

    public BoolValue(boolean v) {
        this.val = v;
    }

    public boolean getVal() {
        return this.val;
    }

    @Override
    public InterType getType() {
        return new BoolType();
    }

    @Override
    public String toString() {
        return this.val ? "true" : "false";
    }
}