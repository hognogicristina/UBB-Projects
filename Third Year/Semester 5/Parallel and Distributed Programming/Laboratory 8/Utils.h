#include <iostream>
#include "Globals.h"

template<typename T>
void println(T t) {
    std::cout << current_id << ": " << t << "\n";
}