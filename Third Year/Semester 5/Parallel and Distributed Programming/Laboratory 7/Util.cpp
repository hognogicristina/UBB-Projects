#include "Util.h"
#include "Polynomial.h"
#include <iostream>

Polynomial Util::Multiplication(const Polynomial &A, const Polynomial &B) {
    int DegreeMul = A.getN() + B.getN() - 1;
    Polynomial polyMul(DegreeMul);
    for (int i = 0; i < A.getN(); i++) {
        for (int j = 0; j < B.getN(); j++) {
            polyMul.setCoefficient(i + j, polyMul.getCoefficient(i + j) + A.getCoefficient(i) * B.getCoefficient(j));
        }
    }
    return polyMul;
}

Polynomial Util::MpiMultiplication(const Polynomial &A, const Polynomial &B, int start, int end) {
    std::cout << start << "->" << end << std::endl;
    int DegreeMul = A.getN() + B.getN() - 1;
    Polynomial polyMul(DegreeMul);
    for (int i = start; i < end; i++) {
        for (int j = 0; j < B.getN(); j++) {
            polyMul.setCoefficient(i + j, polyMul.getCoefficient(i + j) + A.getCoefficient(i) * B.getCoefficient(j));
        }
    }
    return polyMul;
}

Polynomial Util::Karatsuba(const Polynomial &A, const Polynomial &B) {
    if (A.getN() < 2 || B.getN() < 2) {
        return Multiplication(A, B);
    }
    int m = std::min(A.getN(), B.getN()) / 2;
    Polynomial lowA = A.GetFirstMCoefficients(m);
    Polynomial highA = A.GetLastMCoefficients(A.getN() - m);
    Polynomial lowB = B.GetFirstMCoefficients(m);
    Polynomial highB = B.GetLastMCoefficients(B.getN() - m);

    Polynomial z1 = Karatsuba(lowA, lowB);
    Polynomial z2 = Karatsuba(lowA.Sum(highA), lowB.Sum(highB));
    Polynomial z3 = Karatsuba(highA, highB);

    Polynomial result1 = z3.Shift(2 * m);
    Polynomial result2 = z2.Difference(z3).Difference(z1).Shift(m);
    Polynomial result3 = result1.Sum(result2).Sum(z1);

    return result3;
}
