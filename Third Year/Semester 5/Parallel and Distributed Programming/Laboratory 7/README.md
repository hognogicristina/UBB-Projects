Perform the multiplication of 2 polynomials, by distributing computation across several nodes using MPI. Use both the regular O(n2) algorithm and the Karatsuba algorithm. Compare the performance with the "regular" CPU implementation from lab 5.

The documentation will describe:
- the algorithms,
- the distribution and communication,
- the performance measurements

**Bonus:** do the same for the multiplication of big numbers.

### Install MPI on MacOS

> brew install mpich

### Compile

> mpic++ Main.cpp Polynomial.cpp Utils.cpp -o Main

### Run

> mpiexec -n 4 ./Main

### Results

**A:** -3 + 0x^1 + 1x^2 + 7x^3

**B:** -3 + 0x^1 + 1x^2 + 7x^3 + 9x^4 + 2x^5 + 10x^6 + 10x^7

**Rank:** 0

**PolyKaraCheck:** **Rank:** 1

**Rank:** 2

**Rank:** 3

9 + 0x^1 + -6x^2 + -42x^3 + -26x^4 + 8x^5 + 28x^6 + 35x^7 + 24x^8 + 80x^9 + 70x^10
