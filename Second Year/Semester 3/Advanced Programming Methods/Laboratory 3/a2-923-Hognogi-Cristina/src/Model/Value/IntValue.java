package Model.Value;

import Model.Type.IntType;

import Model.Type.InterType;

public class IntValue implements InterValue {
    private final int val;

    public IntValue(int v) {
        this.val = v;
    }

    public int getVal() {
        return this.val;
    }

    @Override
    public String toString() {
        return String.format("%d", this.val);
    }

    @Override
    public InterType getType() {
        return new IntType();
    }
}
