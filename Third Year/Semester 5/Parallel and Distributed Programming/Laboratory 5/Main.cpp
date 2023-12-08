#include <iostream>
#include <vector>
#include <thread>
#include <algorithm>
#include <random>

class Polynomial {
public:
    Polynomial() : n(0), coefficients({}) {}

    Polynomial(int n, const std::vector<int> &coefficients) : n(n), coefficients(coefficients) {}

    std::string to_string() const {
        // returns a string representation of the polynomial
        std::string builder;
        for (int i = 0; i < n; ++i) {
            builder += std::to_string(coefficients[i]);
            if (i != 0) {
                builder += "x^" + std::to_string(i);
            }
            if (i != n - 1) {
                builder += " + ";
            }
        }
        return builder;
    }

    int get_n() const {
        // degree of the polynomial
        return n;
    }

    const std::vector<int> &get_coefficients() const {
        // returns the coefficients of the polynomial
        return coefficients;
    }

private:
    int n;
    std::vector<int> coefficients;
};

class PolynomialOperations {
public:
    static Polynomial add(const Polynomial &A, const Polynomial &B) {
        // adds two polynomials and returns the result
        int size = std::max(A.get_n(), B.get_n()); // size of the result
        std::vector<int> sumList(size, 0); // list of coefficients of the result

        for (int i = 0; i < B.get_n(); ++i) {
            // add the coefficients of the two polynomials
            sumList[i] = A.get_coefficients()[i] + B.get_coefficients()[i];
        }

        for (int i = B.get_n(); i < A.get_n(); ++i) {
            // add the remaining coefficients of the first polynomial
            sumList[i] = A.get_coefficients()[i];
        }

        return Polynomial(size, sumList); // return the result
    }

    static Polynomial subtract(const Polynomial &A, const Polynomial &B) {
        // subtracts two polynomials and returns the result
        int size = std::max(A.get_n(), B.get_n()); // size of the result
        std::vector<int> sumList(size, 0); // list of coefficients of the result

        for (int i = 0; i < B.get_n(); ++i) {
            // subtract the coefficients of the two polynomials
            sumList[i] = A.get_coefficients()[i] - B.get_coefficients()[i];
        }

        for (int i = B.get_n(); i < A.get_n(); ++i) {
            // add the remaining coefficients of the first polynomial
            sumList[i] = A.get_coefficients()[i];
        }

        return Polynomial(size, sumList); // return the result
    }

    static Polynomial shift(const Polynomial &A, int by) {
        // shifts the polynomial by a given number of positions
        std::vector<int> coeff; // list of coefficients of the result
        for (int i = 0; i < by; ++i) {
            // add 0s to the list of coefficients
            coeff.push_back(0);
        }

        for (int i = 0; i < A.get_n(); ++i) {
            // add the coefficients of the polynomial
            coeff.push_back(A.get_coefficients()[i]);
        }

        return Polynomial(A.get_n() + by, coeff); // return the result
    }

    static Polynomial multiply_classic(const Polynomial &A, const Polynomial &B) {
        // multiplies two polynomials sequentially and returns the result
        int size = A.get_n() + B.get_n() - 1; // size of the result
        std::vector<int> productList(size, 0); // list of coefficients of the result

        for (int i = 0; i < A.get_n(); ++i) {
            // multiply the coefficients of the two polynomials
            for (int j = 0; j < B.get_n(); ++j) {
                // add the product of the coefficients to the list of coefficients
                productList[i + j] += A.get_coefficients()[i] * B.get_coefficients()[j];
            }
        }

        return Polynomial(size, productList); // return the result
    }

    static Polynomial multiply_karatsuba(const Polynomial &A, const Polynomial &B) {
        if (A.get_n() < 50 || B.get_n() < 50) {
            return multiply_classic(A, B);
        }

        int m = std::max(A.get_n(), B.get_n()) / 2; // size of the smaller polynomials

        // split the polynomials into smaller polynomials
        Polynomial lowA(m, std::vector<int>(A.get_coefficients().begin(), A.get_coefficients().begin() + m));
        Polynomial highA(A.get_n() - m, std::vector<int>(A.get_coefficients().begin() + m, A.get_coefficients().end()));
        Polynomial lowB(m, std::vector<int>(B.get_coefficients().begin(), B.get_coefficients().begin() + m));
        Polynomial highB(B.get_n() - m, std::vector<int>(B.get_coefficients().begin() + m, B.get_coefficients().end()));

        // compute the three products
        Polynomial result1 = multiply_karatsuba(lowA, lowB);
        Polynomial result2 = multiply_karatsuba(add(lowA, highA), add(lowB, highB));
        Polynomial result3 = multiply_karatsuba(highA, highB);

        // compute the three parts of the result
        Polynomial r1 = shift(result3, 2 * m);
        Polynomial r2 = shift(subtract(subtract(result2, result3), result1), m);

        // return the result
        return add(add(r1, r2), result1);
    }

    static Polynomial multiply_classic_parallel(const Polynomial &A, const Polynomial &B) {
        // multiplies two polynomials in parallel and returns the result
        int size = A.get_n() + B.get_n() - 1; // size of the result
        std::vector<int> product(size, 0); // list of coefficients of the result

        int nrThreads = std::max(1, static_cast<int>(std::thread::hardware_concurrency())); // number of threads
        int nr = std::max(1, size / nrThreads); // number of coefficients to be computed by each thread
        std::vector<std::thread> threads; // list of threads

        for (int i = 0; i < nrThreads; ++i) {
            // create a thread for each part of the result
            int start = i * nr; // start index
            int end = (i == nrThreads - 1) ? size : (i + 1) * nr; // end index

            threads.emplace_back([start, end, &A, &B, &product]() {
                // compute the coefficients of the result
                for (int i = start; i < end; ++i) {
                    // multiply the coefficients of the two polynomials
                    for (int j = 0; j <= i; ++j) {
                        // add the product of the coefficients to the list of coefficients
                        if (j < A.get_n() && (i - j) < B.get_n()) {
                            // if the indices are valid, add the product of the coefficients
                            product[i] += A.get_coefficients()[j] * B.get_coefficients()[i - j];
                        }
                    }
                }
            });
        }

        for (auto &thread : threads) {
            // wait for all threads to finish
            thread.join();
        }

        return Polynomial(size, product); // return the result
    }

    static Polynomial multiply_karatsuba_parallel(const Polynomial &A, const Polynomial &B) {
        if (A.get_n() < 1000 || B.get_n() < 1000) {
            return multiply_classic_parallel(A, B); //
        }

        int m = std::max(A.get_n(), B.get_n()) / 2; // size of the smaller polynomials

        // split the polynomials into smaller polynomials
        Polynomial lowA(m, std::vector<int>(A.get_coefficients().begin(), A.get_coefficients().begin() + m));
        Polynomial highA(A.get_n() - m, std::vector<int>(A.get_coefficients().begin() + m, A.get_coefficients().end()));
        Polynomial lowB(m, std::vector<int>(B.get_coefficients().begin(), B.get_coefficients().begin() + m));
        Polynomial highB(B.get_n() - m, std::vector<int>(B.get_coefficients().begin() + m, B.get_coefficients().end()));

        // compute the three products in parallel
        Polynomial result1;
        Polynomial result2;
        Polynomial result3;

        std::thread thread1([&]() {
            // Compute the first part in a separate thread
            result1 = multiply_karatsuba_parallel(lowA, lowB);
        });

        std::thread thread2([&]() {
            // Compute the last part in a separate thread
            result3 = multiply_karatsuba_parallel(highA, highB);
        });

        // compute the three parts of the result
        result2 = multiply_karatsuba_parallel(add(lowA, highA), add(lowB, highB));

        // wait for the two threads to finish
        thread1.join();
        thread2.join();

        // compute the three parts of the result
        // shift the result of the product of highA * highB to the left by 2 * m positions (correction of partial result)
        Polynomial r1 = shift(result3, 2 * m);
        // calculate the difference between result2 and result3, then shift it left by m positions, and subtract it from result1
        Polynomial r2 = shift(subtract(subtract(result2, result3), result1), m);

        return add(add(r1, r2), result1); // return the result
    }
};

std::vector<int> generateRandomCoefficients(int n) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dis(-10, 10);

    std::vector<int> coefficients(n + 1);
    for (int i = 0; i <= n; ++i) {
        coefficients[i] = dis(gen) * dis(gen);
    }

    return coefficients;
}


int main() {
    int choice;
    std::vector<int> A, B;

    do {
        std::cout << "\nChoose Polynomial Coefficient Generation:\n";
        std::cout << "1. First Example\n";
        std::cout << "2. Second Example\n";
        std::cout << "3. Third Example\n";
        std::cout << "0. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1:
                A = generateRandomCoefficients(100);
                B = generateRandomCoefficients(100);
                break;
            case 2:
                A = generateRandomCoefficients(10000);
                B = generateRandomCoefficients(10000);
                break;
            case 3:
                A = generateRandomCoefficients(100000);
                B = generateRandomCoefficients(100000);
                break;
            case 0:
                std::cout << "Exiting the program.\n";
                return 0;
            default:
                std::cout << "Invalid choice. Please try again.\n";
        }

        int m = A.size();
        int n = B.size();
        Polynomial polyA(m, A);
        std::cout << "Polynomial A: " << polyA.to_string() << std::endl;
        Polynomial polyB(n, B);
        std::cout << "Polynomial B: " << polyB.to_string() << std::endl;

        do {
            std::cout << "\nPolynomial Multiplication Menu:\n";
            std::cout << "1. Sequential Classic\n";
            std::cout << "2. Sequential Karatsuba\n";
            std::cout << "3. Parallel Classic\n";
            std::cout << "4. Parallel Karatsuba\n";
            std::cout << "0. Go Back\n";
            std::cout << "Enter your choice: ";
            std::cin >> choice;

            switch (choice) {
                case 1: {
                    auto start = std::chrono::high_resolution_clock::now();
                    Polynomial polyProduct = PolynomialOperations::multiply_classic(polyA, polyB);
                    auto end = std::chrono::high_resolution_clock::now();
                    std::chrono::duration<double> elapsed = end - start;
                    std::cout << "Sequential Classic result: " << polyProduct.to_string() << std::endl;
                    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;
                    break;
                }
                case 2: {
                    auto start = std::chrono::high_resolution_clock::now();
                    Polynomial polyProductKaratsuba = PolynomialOperations::multiply_karatsuba(polyA, polyB);
                    auto end = std::chrono::high_resolution_clock::now();
                    std::chrono::duration<double> elapsed = end - start;
                    std::cout << "Sequential Karatsuba result: " << polyProductKaratsuba.to_string() << std::endl;
                    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;
                    break;
                }
                case 3: {
                    auto start = std::chrono::high_resolution_clock::now();
                    Polynomial polyProductParallel = PolynomialOperations::multiply_classic_parallel(polyA, polyB);
                    auto end = std::chrono::high_resolution_clock::now();
                    std::chrono::duration<double> elapsed = end - start;
                    std::cout << "Parallel Classic result: " << polyProductParallel.to_string() << std::endl;
                    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;
                    break;
                }
                case 4: {
                    auto start = std::chrono::high_resolution_clock::now();
                    Polynomial polyProduct2 = PolynomialOperations::multiply_karatsuba_parallel(polyA, polyB);
                    auto end = std::chrono::high_resolution_clock::now();
                    std::chrono::duration<double> elapsed = end - start;
                    std::cout << "Parallel Karatsuba result: " << polyProduct2.to_string() << std::endl;
                    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;
                    break;
                }
                case 0:
                    std::cout << "Going back to the coefficient generation menu.\n";
                    break;
                default:
                    std::cout << "Invalid choice. Please try again.\n";
            }
        } while (choice != 0);
    } while (true);

    return 0;
}
