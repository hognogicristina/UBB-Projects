# Goal

The goal of this lab is to implement a simple but non-trivial parallel algorithm.

## Requirement

Solve the problem below:

Given a directed graph, find a Hamiltonean cycle, if one exists. Use multiple threads to parallelize the search. Important The search should start from a fixed vertex (no need to take each vertex as the starting point), however, the splitting of the work between threads should happen at several levels, for all possible choices among the neighbors of each current vertex.

### The documentation will describe:

- the algorithms,
- the synchronization used in the parallelized variants,
- the performance measurements


    bool graph1[V][V] = {
        {0, 1, 0, 1, 0, 1, 0, 1, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 0, 1, 0},
        {0, 1, 0, 1, 0, 1, 0, 1, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 0, 1, 0},
        {0, 1, 0, 1, 0, 1, 0, 1, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 0, 1, 0},
        {0, 1, 0, 1, 0, 1, 0, 1, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 0, 1, 0},
        {0, 1, 0, 1, 0, 1, 0, 1, 0, 1},
        {1, 0, 1, 0, 1, 0, 1, 0, 1, 0}
    };

    bool graph2[V][V] = {
            {0, 1, 0, 1, 1, 1, 1, 0, 1, 1},
            {1, 0, 1, 1, 1, 1, 0, 1, 0, 0},
            {0, 1, 0, 1, 0, 0, 0, 0, 1, 0},
            {1, 1, 1, 0, 0, 0, 1, 1, 1, 0},
            {1, 1, 0, 0, 0, 0, 0, 1, 0, 1},
            {1, 1, 0, 0, 0, 0, 1, 0, 0, 1},
            {1, 0, 0, 1, 0, 1, 0, 1, 1, 0},
            {0, 1, 0, 1, 1, 0, 1, 0, 0, 0},
            {1, 0, 1, 1, 0, 0, 1, 0, 0, 0},
            {1, 0, 0, 0, 1, 1, 0, 0, 0, 0}
    };

    bool graph3[V][V] = {
            {0, 1, 0, 1, 1, 1, 0, 0, 1, 0},
            {0, 0, 1, 0, 0, 0, 1, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 1, 0, 1},
            {0, 0, 0, 0, 0, 0, 1, 0, 0, 1},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
    };

1. Hamiltonian Cycle found starting from vertex 0: 0 1 2 3 4 5 6 7 8 9 0
- Time taken for Graph 1: 0.188311 seconds

2. Hamiltonian Cycle found starting from vertex 0: 0 1 2 3 7 4 9 5 6 8 0
- Time taken for Graph 2: 0.0487194 seconds

3. No Hamiltonian Cycle found.
- Time taken for Graph 3: 0.000117834 seconds