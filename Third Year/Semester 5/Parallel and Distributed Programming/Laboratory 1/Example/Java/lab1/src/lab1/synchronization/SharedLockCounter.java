package lab1.synchronization;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class SharedLockCounter extends SimpleCounter {

    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock writeLock = lock.writeLock();
    private final Lock readLock = lock.readLock();

    @Override
    public void incrementCount() {
        try {
            writeLock.lock();
            int count = super.getCount();
            simulateMoreProcessingTime(1L);
            super.setCount(count + 1);
        } finally {
            writeLock.unlock();
        }
    }

    @Override
    public int getCount() {
        try {
            readLock.lock();
            simulateMoreProcessingTime(10L);
            return super.getCount();
        } finally {
            readLock.unlock();
        }
    }

    @Override
    public void setCount(int count) {
        try {
            writeLock.lock();
            super.setCount(count);
        } finally {
            writeLock.unlock();
        }
    }
}
