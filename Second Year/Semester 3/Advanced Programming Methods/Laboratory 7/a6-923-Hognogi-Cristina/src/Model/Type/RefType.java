package Model.Type;

import Model.Value.InterValue;
import Model.Value.RefValue;

// Interface for the types
public class RefType implements InterType {
    private final InterType inner;

    public RefType(InterType inner) {
        this.inner = inner;
    }

    public InterType getInner() {
        return this.inner;
    }

    @Override
    public boolean equals(InterType another) {
        if (another instanceof RefType)
            return inner.equals(((RefType) another).getInner());

        return false;
    }

    @Override
    public String toString() {
        return String.format("Ref(%s)", inner);
    }

    @Override
    public InterValue defaultValue() {
        return new RefValue(0, inner);
    }
}
