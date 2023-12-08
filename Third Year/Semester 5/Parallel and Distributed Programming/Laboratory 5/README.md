# Goal

The goal of this lab is to implement a simple but non-trivial parallel algorithm.

## Requirement

Perform the multiplication of 2 polynomials. Use both the regular O(n2) algorithm and the Karatsuba algorithm, and each in both the sequencial form and a parallelized form. Compare the 4 variants.

### The documentation will describe:

the algorithms,
the synchronization used in the parallelized variants,
the performance measurements

###### Bonus: do the same for big numbers.

## Polynomial Multiplication Results and Timings
### First example

**Degree: 100 - 100**

***Option: 1 (Sequential Classic)***
- Elapsed Time: 0.000276792 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 0.000691458 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 0.000437958 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 0.000565834 seconds

### Second example

**Degree: 10000 - 10000**

***Option: 1 (Sequential Classic)***
- Elapsed Time: 0.655187 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 0.312279 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 0.239394 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 0.0968515 seconds

### Third example

**Degree: 100000 - 100000**

***Option: 1 (Sequential Classic)***
- Elapsed Time: 63.2987 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 10.3232 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 23.7064 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 3.54514 seconds