#include <iostream>
#include <chrono>

using namespace std;
using namespace std::chrono;

int gcd_euclidean(int x, int y) {
    /// Compute the GCD of 2 numbers using the Euclidean algorithm

    if (x == 0 || x == y)
        return y;
    else if (y == 0)
        return x;
    while (y > 0) {
        int temp = x % y;
        x = y;
        y = temp;
    }
    return x;
}

int gcd_prime_factors(int x, int y) {
    /// Compute the GCD of 2 numbers by decomposing the numbers into products of prime factors
    /// The GCD is the product of the common factors, taken at the lowest power.

    if (x == 0 || x == y)
        return y;
    else if (y == 0)
        return x;
    int i = 2;
    int grt_cmn_div = 1;
    while (x > i || y > i) {
        while (x % i == 0 && y % i == 0) {
            grt_cmn_div *= i;
            x /= i;
            y /= i;
        }
        i++;
    }
    return grt_cmn_div;
}

int gcd_brute_force(int x, int y) {
    /// Consider the GCD as being the smallest number between the given two and subtract from this number until it divides both numbers

    if (x == 0 || x == y)
        return y;
    else if (y == 0)
        return x;
    int grt_cmn_div = min(x, y);
    while (x % grt_cmn_div != 0 || y % grt_cmn_div != 0) {
        grt_cmn_div--;
    }
    return grt_cmn_div;
}

int main() {
    int tests[][2] = {
        {18, 12},
        {30, 17},
        {45, 70},
        {255, 300},
        {255, 177},
        {101, 301},
        {4137524, 1227244},
        {56, 90099},
        {899999, 67},
        {182364, 116033},
        {70004, 43602},
        {10662, 78376}
    };

    for (int i = 0; i < 12; i++) {
        int first = tests[i][0];
        int second = tests[i][1];
        cout << "\nx=" << first << ", y=" << second << endl;

        cout << "Start Euclidean GCD" << endl;
        auto start = high_resolution_clock::now();
        int gcd = gcd_euclidean(first, second);
        auto end = high_resolution_clock::now();
        auto duration = duration_cast<microseconds>(end - start);
        cout << "Time elapsed: " << duration.count() << " microseconds" << endl;
        cout << "GCD is " << gcd << endl;

        cout << "Start Prime Factorization GCD" << endl;
        start = high_resolution_clock::now();
        gcd = gcd_prime_factors(first, second);
        end = high_resolution_clock::now();
        duration = duration_cast<microseconds>(end - start);
        cout << "Time elapsed: " << duration.count() << " microseconds" << endl;
        cout << "GCD is " << gcd << endl;

        cout << "Start Brute Force GCD" << endl;
        start = high_resolution_clock::now();
        gcd = gcd_brute_force(first, second);
        end = high_resolution_clock::now();
        duration = duration_cast<microseconds>(end - start);
        cout << "Time elapsed: " << duration.count() << " microseconds" << endl;
        cout << "GCD is " << gcd << endl;
    }

    return 0;
}
