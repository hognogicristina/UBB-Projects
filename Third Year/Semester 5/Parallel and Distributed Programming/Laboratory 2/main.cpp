#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <chrono>

using namespace std;

mutex mtx; // Create a mutex (mutual exclusion) to protect shared resources.
condition_variable cv; // Create a condition variable for synchronization.
bool ready = false; // A boolean flag used for synchronization.

vector<int> vector1 = {1, 2, 3, 4, 5};
vector<int> vector2 = {2, 4, 6, 8, 10};
vector<int> products;
int sum = 0;

void producer() {
    for (size_t i = 0; i < vector1.size(); ++i) {
        unique_lock<mutex> lock(mtx); // Acquire a lock on the mutex for critical section protection.
        int product = vector1[i] * vector2[i]; // Calculate the product of corresponding elements in vector1 and vector2.
        products.push_back(product); // Add the product to the products vector.
        cout << "Producer: Produced " << product << " from " << vector1[i] << " and " << vector2[i] << endl;
        ready = true; // Set the 'ready' flag to indicate data is ready for consumption.
        cv.notify_one(); // Notify the waiting consumer thread.
        lock.unlock();
        this_thread::sleep_for(chrono::milliseconds(500));
    }
}

void consumer() {
    for (size_t i = 0; i < vector1.size(); ++i) {
        unique_lock<mutex> lock(mtx); // Acquire a lock on the mutex for critical section protection.
        cv.wait(lock, [] { return ready; }); // Wait for the 'ready' flag to be true (signaled by the producer).
        int product = products.back(); // Retrieve the latest product from the products vector.
        products.pop_back(); // Remove the product from the products vector.
        sum += product; // Add the product to the running sum.
        cout << "Consumer: Partial Sum " << sum << " after consuming " << product << endl; 
        ready = false; // Reset the 'ready' flag.
    }
}

int main() {
    thread producerThread(producer);
    thread consumerThread(consumer);

    producerThread.join();
    consumerThread.join();

    cout << "Final Result: " << sum << endl;

    return 0;
}
