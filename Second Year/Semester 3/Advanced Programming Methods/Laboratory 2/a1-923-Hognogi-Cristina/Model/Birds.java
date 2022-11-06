package Model;

public class Birds implements Animals {
    public int weight;

    public Birds(int weight) {
        this.weight = weight;
    }

    @Override
    public int getWeight() {
        return this.weight;
    }

    @Override
    public void setWeight(int weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Bird with the weight: " + this.weight + " kg.";
    }
}
