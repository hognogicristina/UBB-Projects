public class Car {
    // static fields
    private static int wheels;
    private static String model;

    public Car(int wheelsNew, String modelNew) {
        wheels = wheelsNew;
        model = modelNew;
    }

    // methods (function - getters)
    public int getWheels() {
        return wheels; // always static because always returns teh same value
    }

    public String getModel() {
        return model;
    }
}
