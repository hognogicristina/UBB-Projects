package lab1.synchronization;

import java.util.concurrent.atomic.AtomicInteger;

public class AtomicVarCounter implements Counter {
    private final AtomicInteger count = new AtomicInteger(0);

    @Override
    public void incrementCount() {
        count.incrementAndGet();
    }

    @Override
    public int getCount() {
        return count.get();
    }

    @Override
    public void setCount(int count) {
        this.count.set(count);
    }
}
