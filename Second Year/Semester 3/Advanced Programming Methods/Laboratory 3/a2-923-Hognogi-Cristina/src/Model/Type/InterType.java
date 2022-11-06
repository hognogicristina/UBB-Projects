package Model.Type;

import Model.Value.InterValue;

public interface InterType {
    boolean equals(Object another);
    String toString();
    InterValue defaultValue();
}
