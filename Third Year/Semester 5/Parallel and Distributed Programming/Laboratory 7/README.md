Perform the multiplication of 2 polynomials, by distributing computation across several nodes using MPI. Use both the regular O(n2) algorithm and the Karatsuba algorithm. Compare the performance with the "regular" CPU implementation from lab 5.

The documentation will describe:
- the algorithms,
- the distribution and communication,
- the performance measurements

**Bonus:** do the same for the multiplication of big numbers.

### Install MPI on MacOS

> brew install mpich

### Compile

> mpic++ -std=c++11 Main.cpp Polynomial.cpp Util.cpp -o Main

### Run

> mpiexec -n 4 ./Main

### Results

**A:** 10 + 9x^1 + -7x^2

**B:** 10 + 9x^1 + -7x^2 + -7x^3 + -9x^4 + 10x^5 + -3x^6 + 9x^7 + -3x^8 + 8x^9 + -5x^10 + -2x^11 + 5x^12 + 5x^13 + 4x^14 + -1x^15 + -5x^16 + 0x^17 + -5x^18 + 1x^19

**Rank:** 0

**Rank:** 1

**Rank:** 2

**Rank:** 3

**Karatsuba Multiplication Time:** 2 microseconds

Start: 0 -> End: 0

Start: 0 -> End: 0

Start: 0 -> End: 0

Start: 0 -> End: 3

**Rank:** 2

**Rank:** 3

**Rank:** 0

**MPI Multiplication Time:** 6 microseconds

**Rank:** 1
