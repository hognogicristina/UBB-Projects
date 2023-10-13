package lab1;

import lab1.deadlock.Deadlock;
import lab1.deadlock.DeadlockPrevention;
import lab1.synchronization.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Main {

    private static void run(List<Thread> threads) {
        long startTime = System.currentTimeMillis();
        // start all threads
        for (Thread thread : threads) {
            thread.start();
        }
        // wait for all threads to finish
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                throw  new RuntimeException(e);
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Processing time: " + (endTime - startTime) + " ms");
    }
    
    private static List<Thread> createThreads(int numberOfThreads, Runnable task) {
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < numberOfThreads; i++) {
            threads.add(new Thread(task));
        }
        return threads;
    }
    
    private static void runWrong() {
        Counter counter = new SimpleCounter();
        List<Thread> threads = createThreads(1000, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runWrongWithDebug() {
        Counter counter = new SimpleCounter().withDebug();
        List<Thread> threads = createThreads(2, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runAtomicVars() {
        Counter counter = new AtomicVarCounter();
        List<Thread> threads = createThreads(1000, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runSynchronized() {
        Counter counter = new SynchronizedCounter();
        List<Thread> threads = createThreads(1000, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runGranularSynchronized() {
        Counter counter = new GranularSynchronizedCounter();
        List<Thread> threads = createThreads(1000, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runReentrantSynchronized() {
        Counter counter = new ReentrantSynchronizedCounter();
        List<Thread> threads = createThreads(1000, counter::incrementCount);
        run(threads);
        System.out.println("Expected count: " + threads.size() + ", Actual count: " + counter.getCount());
    }

    private static void runExclusiveLock() {
        Counter counter = new SynchronizedCounter();
        List<Thread> readers = createThreads(1000, counter::getCount);
        List<Thread> writers = createThreads(1000, counter::incrementCount);
        run(Stream.concat(readers.stream(), writers.stream()).toList());
        System.out.println("Expected count: " + readers.size() + ", Actual count: " + counter.getCount());
    }

    private static void runSharedLock() {
        Counter counter = new SharedLockCounter();
        List<Thread> readers = createThreads(1000, counter::getCount);
        List<Thread> writers = createThreads(1000, counter::incrementCount);
        run(Stream.concat(readers.stream(), writers.stream()).toList());
        System.out.println("Expected count: " + readers.size() + ", Actual count: " + counter.getCount());
    }

    private static void runDeadlock() {
        Deadlock deadlock = new Deadlock();
        List<Thread> threads = createThreads(1, deadlock::operation1);
        threads.addAll(createThreads(1, deadlock::operation2));
        run(threads);
    }

    private static void runDeadlockPrevention() {
        DeadlockPrevention deadlockPrevention = new DeadlockPrevention();
        List<Thread> threads = createThreads(1, deadlockPrevention::operation1);
        threads.addAll(createThreads(1, deadlockPrevention::operation2));
        run(threads);
    }

    public static void main(String[] args) {
        // 1. un-predictable/wrong result due to concurrency
        //runWrong();
        //runWrongWithDebug();

        // 2. synchronizing threads in order to obtain a correct result

        // 2.1. atomic variables
        //runAtomicVars();

        // 2.2. synchronized
        //runSynchronized();

        // see also: ReentrantLock, Semaphore, CountDownLatch etc.

        // 2.3. The lock behind the synchronized methods and blocks is reentrant (recursive)
        //runReentrantSynchronized();

        // 2.4. synchronized with finer granularity improves performance
        //runGranularSynchronized();

        // 2.5. finer granularity using shared locks => improved performance
        //System.out.println("Exclusive locking:");
        //runExclusiveLock();
        //System.out.println("Shared locking:");
        //runSharedLock();

        // 3. deadlock
        //runDeadlock();
        runDeadlockPrevention();
    }
}