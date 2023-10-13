//A shared mutex is a synchronization primitive that allows multiple threads to read a resource but ensures exclusive access for write operations. 
//This is useful when you have a resource that is frequently read but infrequently updated.
//Requires C++17 or later
#include <iostream>
#include <thread>
#include <vector>
#include <shared_mutex>

std::shared_mutex myMutex;
int sharedResource = 0;

void reader(int id) {
    std::shared_lock<std::shared_mutex> lock(myMutex);
    std::cout << "Reader " << id << " reads " << sharedResource << std::endl;
}

void writer(int id) {
    std::unique_lock<std::shared_mutex> lock(myMutex);
    ++sharedResource;
    std::cout << "Writer " << id << " modifies shared resource to " << sharedResource << std::endl;
}

int main() {
    std::vector<std::thread> threads;

    // Create reader threads
    for (int i = 0; i < 5; ++i) {
        threads.push_back(std::thread(reader, i));
    }

    // Create writer threads
    for (int i = 0; i < 2; ++i) {
        threads.push_back(std::thread(writer, i));
    }

    // Join all threads
    for (auto& t : threads) {
        t.join();
    }

    return 0;
}
