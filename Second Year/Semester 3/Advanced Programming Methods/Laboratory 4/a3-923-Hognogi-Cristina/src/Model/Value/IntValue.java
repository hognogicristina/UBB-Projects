package Model.Value;

import Model.Type.IntType;

import Model.Type.InterType;

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
        // example: String.format("%d", 5) -> "5"
    }

    @Override
    public boolean equals(InterValue another) {
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
