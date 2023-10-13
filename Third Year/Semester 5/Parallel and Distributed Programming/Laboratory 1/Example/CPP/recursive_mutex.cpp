#include <iostream>
#include <thread>
#include <mutex>

/// Why use recursive mutex ? 
//In a multi-threaded environment, you might have re-entrant code where a function could be interrupted and re-invoked 
//before its initial invocation is complete.
//A recursive mutex ensures that the same thread can re-enter the function without being blocked.
///

std::recursive_mutex recursive_mtx;

void recursive_function(int n, const std::string& threadName) {
    if (n <= 0) return;

    {
        std::lock_guard<std::recursive_mutex> lock(recursive_mtx);
        std::cout << threadName << " acquired lock at level " << n << std::endl;

        // Simulate some work
        std::this_thread::sleep_for(std::chrono::milliseconds(100));

        // Recursive call
        recursive_function(n - 1, threadName);

        std::cout << threadName << " releasing lock at level " << n << std::endl;
    }
}

void thread_function(const std::string& threadName) {
    recursive_function(3, threadName);
}

int main() {
    // Start two threads to demonstrate that the mutex still blocks across different threads
    std::thread t1(thread_function, "Thread 1");
    std::thread t2(thread_function, "Thread 2");

    t1.join();
    t2.join();

    // Call the recursive function from the main thread
    std::cout << "Main thread starting recursive function" << std::endl;
    recursive_function(3, "Main Thread");
    std::cout << "Main thread finished recursive function" << std::endl;

    return 0;
}
