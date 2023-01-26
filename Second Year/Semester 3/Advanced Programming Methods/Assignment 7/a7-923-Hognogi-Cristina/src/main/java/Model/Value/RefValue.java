package Model.Value;

import Model.Type.InterType;
import Model.Type.RefType;

// Class for the values
public class RefValue implements InterValue {
    private final int address;
    private final InterType locationType;

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
    }

    @Override
    public InterType getType() {
        return new RefType(locationType);
    }
}

