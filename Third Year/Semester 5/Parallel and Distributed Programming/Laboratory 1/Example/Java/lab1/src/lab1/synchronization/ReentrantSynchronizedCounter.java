package lab1.synchronization;

public class ReentrantSynchronizedCounter extends SimpleCounter {
    
    private final Object mutex = new Object();

    @Override
    public void incrementCount() {
        synchronized(mutex) {
            synchronized (mutex) {
                synchronized (mutex) {
                    int count = super.getCount();
                    simulateMoreProcessingTime(1L);
                    super.setCount(count + 1);
                }
            }
        }
    }

    @Override
    public int getCount() {
        synchronized(mutex) {
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
