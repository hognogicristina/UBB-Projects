package Model.Type;

import Model.Value.InterValue;
import Model.Value.RefValue;

/* Interface for the types */
public class RefType implements InterType {
    private final InterType inner; /* inner type is the type of the value that the reference points to */

    public RefType(InterType inner) {
        this.inner = inner;
    }

    public InterType getInner() {
        return this.inner;
    }

    @Override
    public boolean equals(InterType another) {
        /* two reference types are equal if their inner types are equal */
        if (another instanceof RefType)
            return inner.equals(((RefType) another).getInner());

        return false;
    }

    @Override
    public String toString() {
        return String.format("Ref(%s)", inner);
        /* example: Ref(int) */
    }

    @Override
    public InterValue defaultValue() {
        /* default value for a reference is null */
        return new RefValue(0, inner);
    }
}
