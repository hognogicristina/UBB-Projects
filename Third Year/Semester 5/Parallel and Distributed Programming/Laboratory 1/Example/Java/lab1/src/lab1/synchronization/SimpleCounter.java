package lab1.synchronization;

public class SimpleCounter implements Counter {
    protected int count = 0;
    protected boolean debug = false;

    @Override
    public void incrementCount() {
        int count = getCount();
        count ++;
        if (debug) {
            print("computing new count (count=" + count + ")");
        }
        setCount(count);
    }

    @Override
    public int getCount() {
        if (debug) {
            print("reading count (count=" + count + ")");
        }
        return count;
    }

    @Override
    public void setCount(int count) {
        if (debug) {
            print("writing count (count=" + count + ")");
        }
        this.count = count;
    }

    protected void simulateMoreProcessingTime(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public Counter withDebug() {
        debug = true;
        return this;
    }

    private void print(String s) {
        System.out.println(Thread.currentThread().getName() + " - " + s);
    }
}
