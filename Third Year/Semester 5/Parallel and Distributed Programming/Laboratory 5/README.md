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

**Polynomial A:**
- Coefficients: -3, -1, 3, 8, 0, 2, -6, 8, -7, -1
- Expression: -3 - 1x + 3x^2 + 8x^3 + 0x^4 + 2x^5 - 6x^6 + 8x^7 - 7x^8 - 1x^9

**Polynomial B:**
- Coefficients: -10, -5, 2, -8, -3, -7, -3, -1, -10, 2
- Expression: -10 - 5x + 2x^2 - 8x^3 - 3x^4 - 7x^5 - 3x^6 - 1x^7 - 10x^8 + 2x^9

**Multiplication Result:**
- 30 + 25x - 31x^2 - 73x^3 - 17x^4 - 4x^5 - 7x^6 - 85x^7 - 32x^8 + 80x^9 - 109x^10 - 8x^11 + 5x^12 + 14x^13 + 84x^14 - 82x^15 + 87x^16 - 4x^17 - 2x^18

***Option: 1 (Sequential Classic)***
- Elapsed Time: 0.000010042 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 0.000621167 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 0.000266333 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 0.00882425 seconds

### Second example

**Polynomial A:**
- Coefficients: -14, -1, 31, 8, 0, 22, -16, 8, -7, -11
- Expression: -14 + -1x^1 + 31x^2 + 8x^3 + 0x^4 + 22x^5 + -16x^6 + 8x^7 + -7x^8 + -11x^9

**Polynomial B:**
- Coefficients: -10, -5, 12, -7, -3, -17, -3, -1, -15, 21
- Expression: -10 + -5x^1 + 12x^2 + -7x^3 + -3x^4 + -17x^5 + -3x^6 + -1x^7 + -15x^8 + 21x^9

**Multiplication Result:**
- 140 + 80x^1 + -473x^2 + -149x^3 + 381x^4 + -100x^5 + -40x^6 + -270x^7 + -334x^8 + -47x^9 + -905x^10 + 630x^11 + 156x^12 + -186x^13 + 902x^14 + -416x^15 + 284x^16 + 18x^17 + -231x^18

***Option: 1 (Sequential Classic)***
- Elapsed Time: 0.000047 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 0.000469 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 0.000327125 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 0.00794333 seconds

### Third example

**Polynomial A:**
- Coefficients: -140, -123, 319, 81, 10, 212, -6, 9, -17, -241
- Expression: -140 + -123x^1 + 319x^2 + 81x^3 + 10x^4 + 212x^5 + -6x^6 + 9x^7 + -17x^8 + -241x^9

**Polynomial B:**
- Coefficients: 78, -567, 13, 90, 78, -678, 12, 90, 78, -678
- Expression: 78 + -567x^1 + 13x^2 + 90x^3 + 78x^4 + -678x^5 + 12x^6 + 90x^7 + 78x^8 + -678x^9

**Multiplication Result:**
- 10920 + 69786x^1 + 92803x^2 + -188754x^3 + -62990x^4 + 125955x^5 + -6656x^6 + -216280x^7 + -59727x^8 + 115182x^9 + 108718x^10 + -206413x^11 + -64248x^12 + 2052x^13 + 19800x^14 + 348x^15 + -29118x^16 + -7272x^17 + 163398x^18

***Option: 1 (Sequential Classic)***
- Elapsed Time: 0.000028542 seconds

***Option: 2 (Sequential Karatsuba)***
- Elapsed Time: 0.000627416 seconds

***Option: 3 (Parallel Classic)***
- Elapsed Time: 0.000129959 seconds

***Option: 4 (Parallel Karatsuba)***
- Elapsed Time: 0.00930663 seconds