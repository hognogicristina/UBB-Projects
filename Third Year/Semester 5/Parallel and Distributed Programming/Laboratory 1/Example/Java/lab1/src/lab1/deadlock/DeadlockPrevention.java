package lab1.deadlock;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class DeadlockPrevention {

    private final Lock lock1 = new ReentrantLock(true);
    private final Lock lock2 = new ReentrantLock(true);

    public static void main(String[] args) {
        
    }

    public void operation1() {
        lock1.lock();
        print("lock1 acquired, waiting to acquire lock2");
        sleep(100);

        lock2.lock();
        print("lock2 acquired");

        print("executing first operation");

        lock2.unlock();
        lock1.unlock();
        print("unlocked both locks");
    }

    public void operation2() {
        lock1.lock();
        print("lock1 acquired, waiting to acquire lock2");
        sleep(100);

        lock2.lock();
        print("lock2 acquired");

        print("executing second operation");

        lock1.unlock();
        lock2.unlock();
        print("unlocked both locks");
    }

    private void print(String s) {
        System.out.println(Thread.currentThread().getName() + " - " + s);
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
