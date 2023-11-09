#include "Matrix.h"
#include <iostream>
#include <chrono>
#include "ThreadPool.h"
using namespace std;

void mult(Matrix a, Matrix b, Matrix *res) {
    ThreadPool pool(4);
    vector<future<int>> f;

    for (int i = 0; i < a.getRowsNumber(); i++)
        for (int j = 0; j < a.getColsNumber(); j++) {
            f.push_back(pool.enqueue([](int line, int column, Matrix a, Matrix b, Matrix *res) {
                int mul = 0;
                for (int k = 0; k < a.getRowsNumber(); k++)
                    mul += a.get(line, k) * b.get(k, column);
                res->set(line, column, mul);
                return line;
            }, i, j, a, b, res));
        }
}


void add(Matrix a, Matrix b, Matrix *res) {
    ThreadPool pool(4);
    vector<future<int>> f;

    for (int i = 0; i < a.getRowsNumber(); i++) {
        f.push_back(pool.enqueue([](int line, Matrix a, Matrix b, Matrix *res) {
            for (int j = 0; j < a.getColsNumber(); j++)
                res->set(line, j, (a.get(line, j) + b.get(line, j)));
            return line;
        }, i, a, b, res));
    }
}


void mult_async(Matrix a, Matrix b, Matrix *res) {
    vector<future<int>> f;

    for (int i = 0; i < a.getRowsNumber(); i++)
        for (int j = 0; j < a.getColsNumber(); j++) {
            f.push_back(async([](int line, int column, Matrix a, Matrix b, Matrix *res) {
                int mul = 0;
                for (int k = 0; k < a.getRowsNumber(); k++)
                    mul += a.get(line, k) * b.get(k, column);
                res->set(line, column, mul);
                return line;
            }, i, j, a, b, res));
        }
}


void add_async(Matrix a, Matrix b, Matrix *res) {
    vector<future<int>> f;

    for (int i = 0; i < a.getRowsNumber(); i++)
        f.push_back(async([](int line, Matrix a, Matrix b, Matrix *res) {
            for (int j = 0; j < a.getColsNumber(); j++)
                res->set(line, j, (a.get(line, j) + b.get(line, j)));
            return line;
        }, i, a, b, res));
}

int main() {
    Matrix a = Matrix(5, 5);
    Matrix b = Matrix(5, 5);
    Matrix res = Matrix(5, 5);

    cout << "Matrix a: \n";
    cout << a.printMatrix();

    cout << "\nMatrix b: \n";
    cout << b.printMatrix();

    auto start = chrono::high_resolution_clock::now();

    cout << "\nMatrix sum: \n";
    add(a, b, &res);
    cout << res.printMatrix();

    auto finish = chrono::high_resolution_clock::now();
    cout << "\nAddition " << chrono::duration_cast<chrono::nanoseconds>(finish - start).count() % 1000 << " ms\n\n";

    start = chrono::high_resolution_clock::now();

    cout << "Matrix mult: \n";
    mult(a, b, &res);
    cout << res.printMatrix();

    finish = chrono::high_resolution_clock::now();
    cout << "\nMultiplication " << chrono::duration_cast<chrono::nanoseconds>(finish - start).count() % 1000 << " ms\n";

    start = chrono::high_resolution_clock::now();

    cout << "Matrix sum: \n";
    add(a, b, &res);
    cout << res.printMatrix();

    finish = chrono::high_resolution_clock::now();
    cout << "\nAsync Addition " << chrono::duration_cast<chrono::nanoseconds>(finish - start).count() % 1000 << " ms\n\n";

    start = chrono::high_resolution_clock::now();

    cout << "Matrix mult: \n";
    mult(a, b, &res);
    cout << res.printMatrix();

    finish = chrono::high_resolution_clock::now();
    cout << "\nAsync Multiplication " << chrono::duration_cast<chrono::nanoseconds>(finish - start).count() % 1000 << " ms\n";
}