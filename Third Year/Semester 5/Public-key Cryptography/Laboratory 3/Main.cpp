#include <iostream>
#include <vector>
using namespace std;

/* Pollard’s p − 1 algorithm. It will have an implicit bound B, but it will also allow the use of a bound B given by the user.*/

/// Computes the greatest common divisor of two numbers
int computeGcd(int x, int y) {
    if (x == 0) {
        return y;
    }
    return computeGcd(y % x, x);
}

/// Computes the least common multiple of a list of numbers
int computeLcmList(const vector<int>& numbers) {
    int lcm = numbers[0]; // Initialize lcm to the first number

    for (size_t i = 1; i < numbers.size(); ++i) { // Iterate through the rest of the numbers
        lcm = (lcm / computeGcd(lcm, numbers[i])) * numbers[i]; // Compute the lcm of the current lcm and the current number
    }

    cout << "LCM of k = {";
    for (size_t i = 0; i < numbers.size(); ++i) {
        cout << numbers[i];
        if (i != numbers.size() - 1) {
            cout << ", ";
        }
    }
    cout << "} is " << lcm << endl;

    return lcm;
}

/// Computes the modular exponentiation of a number
int modExp(int base, int exponent, int modulus) {
    long long result = 1; // Use long long to prevent overflow
    long long baseLL = base; // Convert to long long to prevent overflow in calculations

    while (exponent > 0) { // Repeat until exponent is 0
        if (exponent % 2 == 1) { // If exponent is odd
            result = (result * baseLL) % modulus; // Multiply result by base and take the modulus
        }
        exponent >>= 1; // Divide exponent by 2
        baseLL = (baseLL * baseLL) % modulus; // Square base and take the modulus
    }

    return static_cast<int>(result); // Convert back to int
}

/// Pollard's p-1 algorithm
int pollardP1(int n, int a, int B) {
    vector<int> k_list; // List of k values
    for (int i = 1; i <= B; i++) { // Iterate from 1 to B
        k_list.push_back(i); // Add i to the list
    }
    int k = computeLcmList(k_list); // Compute the lcm of the list
    int a_k = modExp(a, k, n); // Compute a^k mod n
    int d = computeGcd(a_k - 1, n); // Compute GCD(a^k - 1, n)

    if (d < 0) d += n; // Ensure d is positive

    cout << "Step 1: k = " << k << endl;
    cout << "Step 2: a^k mod n = " << a_k << endl;
    cout << "Step 3: GCD(a^k - 1, n) = " << d << endl;

    return d;
}

int getNontrivialFactor(int n) {
    int B;
    int a = 2;
    cout << "Enter the bound (13 for implicit): ";
    cin >> B;

    if (B == 0) {
        cout << "B cannot be 0." << endl;
    }

    cout << "Factorizing " << n << " using a = " << a << " and B = " << B << endl;

    int f = pollardP1(n, a, B);

    return f;
}

int main() {
    int n;
    char choice;

    do {
        cout << "Enter a number to factorize n: ";
        cin >> n;

        if (n % 2 == 0) {
            cout << "Please enter an odd number." << endl;
            continue; // Skip the rest of the loop and ask for input again
        }

        int f = getNontrivialFactor(n);

        while (f == 1 || f == n) {
            cout << "Failure: No nontrivial factor found." << endl;
            cout << "Do you want to choose another bound? (y/n): ";
            cin >> choice;
            if (choice != 'y' && choice != 'Y') {
                break;
            }
            int B;
            cout << "Enter a new bound: ";
            cin >> B;
            f = pollardP1(n, 2, B);
        }

        if (f != 1 && f != n) {
            cout << "Nontrivial factor found: " << f << " => " << n << " = " << f << " * " << (n / f) << endl;
        }

        cout << "Do you want to factor another number? (y/n): ";
        cin >> choice;

    } while (choice == 'y' || choice == 'Y');

    return 0;
}
