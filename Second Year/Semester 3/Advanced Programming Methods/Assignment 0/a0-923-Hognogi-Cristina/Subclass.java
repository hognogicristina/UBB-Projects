public class Subclass extends Class { // inheritance
    public Subclass() {
        System.out.println("Child class.");
    }

    @Override
    // polymorphism (same fct name and parameters but different result)
    public int fct(int x) {
        return x - 1;
    }
}
