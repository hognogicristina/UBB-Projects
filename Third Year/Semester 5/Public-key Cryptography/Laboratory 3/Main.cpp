#include <iostream>
#include <cmath>
#include <cstdlib>
#include <algorithm>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long t = b;
        b = a % b;
        a = t;
    }
    return a;
}

long long modpow(long long base, long long exp, long long modulus) {
    base %= modulus;
    long long result = 1;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % modulus;
        base = (base * base) % modulus;
        exp >>= 1;
    }
    return result;
}

long long pollards_p_minus_1(long long N, long long B = 10) {
    long long a = 2; // You can choose other values for a
    for (long long j = 2; j < B; ++j) {
        a = modpow(a, j, N);
    }
    long long d = gcd(a - 1, N);
    if (d > 1 && d < N) return d;
    return 1; // returns 1 if no factor found
}

int main() {
    long long N;
    long long B;
    std::cout << "Enter the number N to factorize: ";
    std::cin >> N;
    std::cout << "Enter the bound B (0 for default): ";
    std::cin >> B;
    if (B <= 0) B = 10; // Default bound
    long long factor = pollards_p_minus_1(N, B);
    if (factor > 1)
        std::cout << "A non-trivial factor of " << N << " is " << factor << std::endl;
    else
        std::cout << "No non-trivial factor found for " << N << " with bound " << B << std::endl;
    return 0;
}
