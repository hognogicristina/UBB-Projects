package Model.Value;

import Model.Type.InterType;
import Model.Type.RefType;

/* Class for the values */
public class RefValue implements InterValue {
    private final int address; /* address of the value that the reference points to */
    private final InterType locationType; /* type of the value that the reference points to */

    public RefValue(int address, InterType locationType) {
        this.address = address;
        this.locationType = locationType;
    }

    public int getAddress() {
        return this.address;
    }

    public InterType getLocationType() {
        return this.locationType;
    }

    @Override
    public String toString() {
        return String.format("(%d, %s)", address, locationType);
        /* example: (1, int) */
    }

    @Override
    public InterType getType() {
        /* the type of reference is RefType(innerType) because it points to a value of type innerType */
        return new RefType(locationType);
    }
}

