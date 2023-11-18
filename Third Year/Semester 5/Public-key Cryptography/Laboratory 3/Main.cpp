#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

using namespace std;

int computeGcd(int x, int y) {
    // This function implements the Euclidean algorithm to compute GCD
    if (x == 0) {
        return y;
    }
    return computeGcd(y % x, x);
}

int computeLcm(int x, int y) {
    // This function takes two integers and returns the LCM
    int g = computeGcd(x, y);
    return (x * y) / g;
}

int computeLcmList(vector<int>& numbers) {
    // This function takes a vector of integers and returns the LCM of all the numbers
    if (numbers.empty()) {
        return -1;
    } else if (numbers.size() == 1) {
        return numbers[0];
    } else {
        int lcm = computeLcm(numbers[0], numbers[1]);
        for (size_t i = 2; i < numbers.size(); i++) {
            lcm = computeLcm(lcm, numbers[i]);
        }
        return lcm;
    }
}

vector<int> binaryDecomposition(int k) {
    // This function takes an integer and returns a vector of the orders of powers of 2 that compose it
    // e.g. 13 = 1101
    // returns {0, 2, 3}
    vector<int> decomposition;
    while (k > 0) {
        if (k % 2 == 1) {
            decomposition.push_back(1);
        } else {
            decomposition.push_back(0);
        }
        k = k / 2;
    }
    return decomposition;
}

int computeModularSquaring(int a, int k, int n) {
    // This function takes an integer a, an integer k, and an integer n and returns a^k (mod n)
    vector<int> sum = binaryDecomposition(k);
    vector<int> rests;

    int stop = sum.back();
    int aux = a % n;
    for (int i = 0; i <= stop; i++) {
        if (find(sum.begin(), sum.end(), i) != sum.end()) {
            rests.push_back(aux);
        }
        aux = (aux * aux) % n;
    }
    int result = 1;
    for (int i : rests) {
        result = (result * i) % n;
    }
    return result;
}

int pollardP1(int n, int B = 13, int a = 2) {
    // This function takes an integer n and returns a non-trivial factor of n
    // B is the bound
    // a is the base
    vector<int> k_list;
    for (int i = 1; i <= B; i++) {
        k_list.push_back(i);
    }
    int k = computeLcmList(k_list);
    if (a != 2) {
        a = rand() % (n - 2) + 2;
    }
    a = computeModularSquaring(a, k, n);
    int d = computeGcd(a - 1, n);
    return d;
}

int getNontrivialFactor(int n) {
    int B;
    cout << "Enter the bound: ";
    cin >> B;

    if (B == 0) {
        int f = pollardP1(n);
        return f;
    } else {
        int f = pollardP1(n, B);
        if (f == 1 || f == n) {
            cout << "Failure" << endl;
            return getNontrivialFactor(n);
        } else {
            cout << "Nontrivial factor found: " << f << " => " << n << " = " << f << " * " << (n / f) << endl;
            return f;
        }
    }
}

int main() {
    int n;
    cout << "Enter an odd composite number: ";
    cin >> n;
    int f = getNontrivialFactor(n);
    return 0;
}