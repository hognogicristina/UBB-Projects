package Model.Type;

import Model.Value.InterValue;

// Interface for all types
public interface InterType {
    boolean equals(InterType another);
    String toString();
    InterValue defaultValue();
}
