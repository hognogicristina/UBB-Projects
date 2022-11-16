package Model.Value;

import Model.Type.InterType;
import Model.Type.StringType;

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
    }

    @Override
    public boolean equals(InterValue another) {
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

