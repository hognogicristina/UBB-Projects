cmake_minimum_required(VERSION 3.26)
project(Laboratory_1)

set(CMAKE_CXX_STANDARD 14)

add_executable(Laboratory_1
        Example/CPP/atomic.cpp
        Example/CPP/deadlock.cpp
        Example/CPP/mutex.cpp
        Example/CPP/recursive_mutex.cpp
        Example/CPP/shared_mutex.cpp
        Example/CPP/threading.cpp
        main.cpp)
