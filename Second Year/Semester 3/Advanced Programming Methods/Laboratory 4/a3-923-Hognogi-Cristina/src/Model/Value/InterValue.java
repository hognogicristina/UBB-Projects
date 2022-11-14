package Model.Value;

import Model.Type.InterType;

// Interface for all values
public interface InterValue {
    boolean equals(InterValue another);

    InterType getType();
}
