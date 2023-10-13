package lab1.synchronization;

public class SynchronizedCounter extends SimpleCounter {

    @Override
    public void incrementCount() {
        // Multiple alternatives to choose from:
        // incrementCountWithIntrinsicSynchronizedMethod();
        // incrementCountWithIntrinsicSynchronizedBlock();
        incrementCountWithSynchronizedMutex();
    }

    private synchronized void incrementCountWithIntrinsicSynchronizedMethod() {
        int count = super.getCount();
        simulateMoreProcessingTime(1L);
        super.setCount(count + 1);
    }

    private void incrementCountWithIntrinsicSynchronizedBlock() {
        synchronized(this) {
            int count = super.getCount();
            simulateMoreProcessingTime(1L);
            super.setCount(count + 1);
        }
    }

    private final Object mutex = new Object();

    private void incrementCountWithSynchronizedMutex() {
        synchronized(mutex) {
            int count = super.getCount();
            simulateMoreProcessingTime(1L);
            super.setCount(count + 1);
        }
    }

    @Override
    public int getCount() {
        synchronized(mutex) {
            simulateMoreProcessingTime(10L);
            return super.getCount();
        }
    }

    @Override
    public void setCount(int count) {
        synchronized(mutex) {
            super.setCount(count);
        }
    }
}
