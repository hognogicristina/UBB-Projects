package Model;

public class Cows implements Animals {
    private int weight;

    public Cows(int weight) {
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
        return "Cow with the weight: " + this.weight + " kg.";
    }
}
