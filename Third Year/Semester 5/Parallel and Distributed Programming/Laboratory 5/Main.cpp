#include <iostream>
#include <vector>
#include <thread>
#include <chrono>
#include <random>
#include <algorithm>
#include <cmath>

class Polynomial {
public:
    Polynomial(int n, const std::vector<int>& coefficients) : n(n), coefficients(coefficients) {}

    std::string to_string() const {
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
        return n;
    }

    const std::vector<int>& get_coefficients() const {
        return coefficients;
    }

private:
    int n;
    std::vector<int> coefficients;
};

class PolynomialOperations {
public:
    static Polynomial add(const Polynomial& A, const Polynomial& B) {
        int size = std::max(A.get_n(), B.get_n());
        std::vector<int> sumList(size, 0);

        for (int i = 0; i < B.get_n(); ++i) {
            sumList[i] = A.get_coefficients()[i] + B.get_coefficients()[i];
        }

        for (int i = B.get_n(); i < A.get_n(); ++i) {
            sumList[i] = A.get_coefficients()[i];
        }

        return Polynomial(size, sumList);
    }

    static Polynomial subtract(const Polynomial& A, const Polynomial& B) {
        int size = std::max(A.get_n(), B.get_n());
        std::vector<int> sumList(size, 0);

        for (int i = 0; i < B.get_n(); ++i) {
            sumList[i] = A.get_coefficients()[i] - B.get_coefficients()[i];
        }

        for (int i = B.get_n(); i < A.get_n(); ++i) {
            sumList[i] = A.get_coefficients()[i];
        }

        return Polynomial(size, sumList);
    }

    static Polynomial shift(const Polynomial& A, int by) {
        std::vector<int> coeff;
        for (int i = 0; i < by; ++i) {
            coeff.push_back(0);
        }

        for (int i = 0; i < A.get_n(); ++i) {
            coeff.push_back(A.get_coefficients()[i]);
        }

        return Polynomial(A.get_n() + by, coeff);
    }

    static Polynomial multiply_sequentially(const Polynomial& A, const Polynomial& B) {
        int size = A.get_n() + B.get_n() - 1;
        std::vector<int> productList(size, 0);

        for (int i = 0; i < A.get_n(); ++i) {
            for (int j = 0; j < B.get_n(); ++j) {
                productList[i + j] += A.get_coefficients()[i] * B.get_coefficients()[j];
            }
        }

        return Polynomial(size, productList);
    }

    static Polynomial multiply_karatsuba(const Polynomial& A, const Polynomial& B) {
        if (A.get_n() < 2 || B.get_n() < 2) {
            return multiply_sequentially(A, B);
        }

        int m = std::max(A.get_n(), B.get_n()) / 2;
        Polynomial lowA(m, std::vector<int>(A.get_coefficients().begin(), A.get_coefficients().begin() + m));
        Polynomial highA(A.get_n() - m, std::vector<int>(A.get_coefficients().begin() + m, A.get_coefficients().end()));
        Polynomial lowB(m, std::vector<int>(B.get_coefficients().begin(), B.get_coefficients().begin() + m));
        Polynomial highB(B.get_n() - m, std::vector<int>(B.get_coefficients().begin() + m, B.get_coefficients().end()));

        Polynomial result1 = multiply_karatsuba(lowA, lowB);
        Polynomial result2 = multiply_karatsuba(add(lowA, highA), add(lowB, highB));
        Polynomial result3 = multiply_karatsuba(highA, highB);

        Polynomial r1 = shift(result3, 2 * m);
        Polynomial r2 = shift(subtract(subtract(result2, result3), result1), m);

        return add(add(r1, r2), result1);
    }

    static Polynomial do_multiplication(const Polynomial& A, const Polynomial& B, std::vector<int>& product, int start, int end) {
        for (int i = start; i < end; ++i) {
            if (i > product.size()) {
                return Polynomial(0, {});
            }

            for (int j = 0; j <= i; ++j) {
                if (j < A.get_n() && (i - j) < B.get_n()) {
                    product[i] += A.get_coefficients()[j] * B.get_coefficients()[i - j];
                }
            }
        }

        return Polynomial(product.size(), product);
    }

    static Polynomial multiply_sequentially_parallel(const Polynomial& A, const Polynomial& B) {
        int size = A.get_n() + B.get_n() - 1;
        std::vector<int> product(size, 0);
        int nrThreads = std::max(1, static_cast<int>(size / std::thread::hardware_concurrency()));
        int nr = std::max(1, size / nrThreads);
        int i = 0;
        std::vector<std::thread> threads;

        while (i < nrThreads) {
            int j = i + nr;
            threads.emplace_back(PolynomialOperations::do_multiplication, std::cref(A), std::cref(B), std::ref(product), i, j);
            i += nr;
        }

        for (auto& thread : threads) {
            thread.join();
        }

        return Polynomial(size, product);
    }
};

std::vector<int> generate_small_poly_coefficients() {
    std::vector<int> poly;
    for (int i = 0; i < 10; ++i) {
        poly.push_back(rand() % 20 - 10);
    }
    return poly;
}

std::vector<int> generate_large_poly_coefficients() {
    std::vector<int> poly;
    for (int i = 0; i < 5000; ++i) {
        poly.push_back(rand() % 900000 + 100000);
    }
    return poly;
}

int main() {
    int choice;
    std::vector<int> A, B;

    do {
        std::cout << "\nChoose Polynomial Coefficient Generation:\n";
        std::cout << "1. Small Coefficients\n";
        std::cout << "2. Large Coefficients\n";
        std::cout << "0. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1:
                A = generate_small_poly_coefficients();
                B = generate_small_poly_coefficients();
                break;
            case 2:
                A = generate_large_poly_coefficients();
                B = generate_large_poly_coefficients();
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
                    Polynomial polyProduct = PolynomialOperations::multiply_sequentially(polyA, polyB);
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
                    Polynomial polyProductParallel = PolynomialOperations::multiply_sequentially_parallel(polyA, polyB);
                    auto end = std::chrono::high_resolution_clock::now();
                    std::chrono::duration<double> elapsed = end - start;
                    std::cout << "Parallel Classic result: " << polyProductParallel.to_string() << std::endl;
                    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;
                    break;
                }
                case 4: {
                    auto start = std::chrono::high_resolution_clock::now();
                    Polynomial polyProduct2 = PolynomialOperations::multiply_karatsuba(polyA, polyB);
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
