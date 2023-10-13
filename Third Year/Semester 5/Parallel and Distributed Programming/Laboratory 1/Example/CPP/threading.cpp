#include <iostream>
#include <thread>

void print_numbers() {
    for (int i = 0; i < 10; ++i) {
        std::cout << "Number: " << i << std::endl;
    }
}

int main() {
    std::thread t(print_numbers);
    t.join();
    return 0;
}