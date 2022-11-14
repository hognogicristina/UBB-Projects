package Model.Type;

import Model.Value.StringValue;
import Model.Value.InterValue;

public class StringType implements InterType {
    @Override
    public boolean equals(InterType another) {
        // check if two objects are the same
        if (another instanceof StringType)
            return true;

        return false;
        // instanceof returns true if the object is an instance of the specified type (or of a subclass or implementor thereof)
    }

    @Override
    public String toString() {
        return "string";
    }

    @Override
    public InterValue defaultValue() {
        return new StringValue("");
    }
}
