#ifndef LABORATORY_7_UTIL_H
#define LABORATORY_7_UTIL_H

#include "Polynomial.h"

class Util {
public:
    static Polynomial Multiplication(const Polynomial &A, const Polynomial &B);

    static Polynomial MpiMultiplication(const Polynomial &A, const Polynomial &B, int start, int end);

    static Polynomial Karatsuba(const Polynomial &A, const Polynomial &B);
};

#endif //LABORATORY_7_UTIL_H
