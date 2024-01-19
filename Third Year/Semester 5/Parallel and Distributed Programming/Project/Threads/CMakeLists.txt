cmake_minimum_required(VERSION 3.27)
project(Threads)

set(CMAKE_CXX_STANDARD 14)

add_executable(Threads
        Color.cpp
        Color.h
        Graph.cpp
        Graph.h
        GraphColoring.cpp
        GraphColoring.h
        Main.cpp
)