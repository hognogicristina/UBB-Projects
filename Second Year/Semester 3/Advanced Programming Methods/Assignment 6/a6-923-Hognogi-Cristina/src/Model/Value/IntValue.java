package Model.Value;

import Model.Type.IntType;

import Model.Type.InterType;

import java.util.Objects;

// Class for the int value
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
    public boolean equals(Object another) {
        if (another instanceof IntValue) {
            IntValue anotherInt = (IntValue) another;
            return this.val == anotherInt.getVal();
        }

        return false;
    }

    @Override
    public InterType getType() {
        return new IntType();
    }
}
