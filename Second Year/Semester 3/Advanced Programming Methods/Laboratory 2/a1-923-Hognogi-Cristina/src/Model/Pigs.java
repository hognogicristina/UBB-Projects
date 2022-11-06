package Model;

public class Pigs implements Animals {
    private int weight;

    public Pigs(int weight) {
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
        return "Pig with the weight: " + this.weight + " kg.";
    }
}
