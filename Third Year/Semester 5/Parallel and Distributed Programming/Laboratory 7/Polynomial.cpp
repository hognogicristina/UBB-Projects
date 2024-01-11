#include "Polynomial.h"
#include <iostream>
#include <cstdlib>
#include <ctime>

Polynomial::Polynomial(int n) : N(n), Coefficients(n, 0) {}

Polynomial::Polynomial(int n, const std::vector<int> &coefficients) : N(n), Coefficients(coefficients) {}

void Polynomial::GeneratePolynomial() {
    std::srand(std::time(nullptr));
    for (int i = 0; i < N; i++) {
        Coefficients[i] = std::rand() % 21 - 10;
    }
}

int Polynomial::getN() const {
    return N;
}

int Polynomial::getCoefficient(int index) const {
    if (index >= 0 && index < N) {
        return Coefficients[index];
    }

    return 0;
}

void Polynomial::setCoefficient(int index, int value) {
    if (index >= 0 && index < N) {
        Coefficients[index] = value;
    }
}

Polynomial Polynomial::Sum(const Polynomial &B) const {
    int DegreeA = N;
    int DegreeB = B.N;
    int DegreeSum = std::max(DegreeA, DegreeB);

    std::vector<int> CoefficientsSum(DegreeSum, 0);
    for (int i = 0; i < DegreeA; i++) {
        CoefficientsSum[i] += Coefficients[i];
    }
    for (int i = 0; i < DegreeB; i++) {
        CoefficientsSum[i] += B.Coefficients[i];
    }

    return Polynomial{DegreeSum, CoefficientsSum};
}

Polynomial Polynomial::Difference(const Polynomial &B) const {
    int DegreeA = N;
    int DegreeB = B.N;
    int DegreeSum = std::max(DegreeA, DegreeB);

    std::vector<int> CoefficientsSum(DegreeSum, 0);
    for (int i = 0; i < DegreeA; i++) {
        CoefficientsSum[i] += Coefficients[i];
    }
    for (int i = 0; i < DegreeB; i++) {
        CoefficientsSum[i] -= B.Coefficients[i];
    }

    return Polynomial{DegreeSum, CoefficientsSum};
}

Polynomial Polynomial::GetFirstMCoefficients(int m) const {
    std::vector<int> resultCoefficients(Coefficients.begin(), Coefficients.begin() + m);

    return Polynomial{m, resultCoefficients};
}

Polynomial Polynomial::GetLastMCoefficients(int m) const {
    std::vector<int> resultCoefficients(Coefficients.end() - m, Coefficients.end());

    return Polynomial{m, resultCoefficients};
}

Polynomial Polynomial::Shift(int m) const {
    int newSize = N + m;
    std::vector<int> newCoefficients(newSize, 0);

    for (int i = m; i < newSize; i++) {
        newCoefficients[i] = Coefficients[i - m];
    }

    return Polynomial{newSize, newCoefficients};
}

std::string Polynomial::ToString() const {
    std::string str;
    for (int i = 0; i < N; i++) {
        if (i == 0) {
            str += std::to_string(Coefficients[i]);
        } else {
            str += " + " + std::to_string(Coefficients[i]) + "x^" + std::to_string(i);
        }
    }

    return str;
}

std::vector<int> Polynomial::GetCoefficients() const {
    return Coefficients;
}