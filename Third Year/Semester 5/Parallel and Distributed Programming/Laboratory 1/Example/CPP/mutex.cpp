#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void critical_section(int id) {
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << "Thread-" << id << " entering critical section" << std::endl;
    std::cout << "Thread-" << id << " leaving critical section" << std::endl;
}

int main() {
    std::thread t1(critical_section, 1);
    std::thread t2(critical_section, 2);
    t1.join();
    t2.join();
    return 0;
}
