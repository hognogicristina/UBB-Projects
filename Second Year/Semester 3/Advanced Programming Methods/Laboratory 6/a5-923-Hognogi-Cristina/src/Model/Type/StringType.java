package Model.Type;

import Model.Value.StringValue;
import Model.Value.InterValue;

// Class for the string type
public class StringType implements InterType {
    @Override
    public boolean equals(InterType another) {
        if (another instanceof StringType)
            return true;

        return false;
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
