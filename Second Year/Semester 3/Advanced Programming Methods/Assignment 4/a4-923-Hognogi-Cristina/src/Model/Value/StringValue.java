package Model.Value;

import Model.Type.InterType;
import Model.Type.StringType;

// Class for the string value
public class StringValue implements InterValue {
    private final String value;

    public StringValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return "\"" + this.value + "\"";
        // example: "hello"
    }

    @Override
    public boolean equals(Object another) {
        // check if two objects are the same
        if (another instanceof StringValue) {
            StringValue anotherStringValue = (StringValue) another;
            return this.value.equals(anotherStringValue.value);
        }

        return false;
    }

    @Override
    public InterType getType() {
        return new StringType();
    }
}

