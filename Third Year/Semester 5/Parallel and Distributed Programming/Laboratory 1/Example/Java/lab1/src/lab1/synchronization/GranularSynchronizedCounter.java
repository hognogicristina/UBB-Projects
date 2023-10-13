package lab1.synchronization;

public class GranularSynchronizedCounter extends SimpleCounter {

    @Override
    public void incrementCount() {
        // incrementCountLessGranular();
        incrementCountMoreGranular();
    }
    public synchronized void incrementCountLessGranular() {
        simulateMoreProcessingTime(10L);
        int count = super.getCount();
        simulateMoreProcessingTime(1L);
        super.setCount(count + 1);
    }

    public void incrementCountMoreGranular() {
        simulateMoreProcessingTime(10L);
        synchronized (this) {
            int count = super.getCount();
            simulateMoreProcessingTime(1L);
            super.setCount(count + 1);
        }
    }

    @Override
    public int getCount() {
        synchronized(this) {
            return super.getCount();
        }
    }

    @Override
    public void setCount(int count) {
        synchronized(this) {
            super.setCount(count);
        }
    }
}
