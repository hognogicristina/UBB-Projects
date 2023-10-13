#include <iostream>
#include <mutex>
#include <thread>

std::mutex mtx1, mtx2;

void deadlock_func1() {
    std::lock_guard<std::mutex> lock1(mtx1);
    std::cout << "Thread 1 acquired lock1, attempting to acquire lock2..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::lock_guard<std::mutex> lock2(mtx2);  // Deadlock
    std::cout << "Thread 1 acquired lock2, no deadlock." << std::endl;
}

void deadlock_func2() {
    std::lock_guard<std::mutex> lock2(mtx2);
    std::cout << "Thread 2 acquired lock2, attempting to acquire lock1..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::lock_guard<std::mutex> lock1(mtx1);  // Deadlock
    std::cout << "Thread 2 acquired lock1, no deadlock." << std::endl;
}

int main() {
    std::thread t1(deadlock_func1);
    std::thread t2(deadlock_func2);
    t1.join();
    t2.join();
    return 0;
}
