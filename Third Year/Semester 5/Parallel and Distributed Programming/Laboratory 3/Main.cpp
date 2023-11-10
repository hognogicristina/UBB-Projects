#include <iostream>
#include <vector>
#include <thread>
#include <future>
#include <random>
#include <stdexcept>

using namespace std;
const int THREAD_COUNT = 10;

// Class for representing a matrix
class Matrix {
private:
    int rows_;
    int columns_;
    vector<vector<int>> matrix_; // The matrix is represented as a vector of vectors
    const int MAX_INITIAL_VALUE = 100;
    const int MIN_INITIAL_VALUE = 10;

public:
    Matrix(int rows, int columns) : rows_(rows), columns_(columns) {
        matrix_ = vector<vector<int>>(rows, vector<int>(columns, 0));
    }

    // Fill the matrix with random values
    void fillMatrixRandomly() {
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<int> distribution(MIN_INITIAL_VALUE, MAX_INITIAL_VALUE);

        for (int i = 0; i < rows_; i++) {
            for (int j = 0; j < columns_; j++) {
                matrix_[i][j] = distribution(gen);
            }
        }
    }

    // Get the number of rows in the matrix
    int getRows() const {
        return rows_;
    }

    // Get the number of columns in the matrix
    int getColumns() const {
        return columns_;
    }

    // Get the element at a specific position in the matrix
    int getElementOnPosition(int x, int y) const {
        if (x < 0 || x >= rows_ || y < 0 || y >= columns_) {
            throw out_of_range("Invalid coordinates");
        }
        return matrix_[x][y];
    }

    // Set the element at a specific position in the matrix
    void setElementOnPosition(int x, int y, int newValue) {
        if (x < 0 || x >= rows_ || y < 0 || y >= columns_) {
            throw out_of_range("Invalid coordinates");
        }
        matrix_[x][y] = newValue;
    }

    // Overload the << operator to print the matrix
    friend ostream &operator<<(ostream &os, const Matrix &matrix) {
        for (int i = 0; i < matrix.rows_; i++) {
            for (int j = 0; j < matrix.columns_; j++) {
                os << matrix.matrix_[i][j] << ' ';
            }
            os << '\n';
        }
        return os;
    }
};

// Class for performing matrix multiplication in a separate thread
class MultiplierThread {
private:
    const Matrix &m1_;
    const Matrix &m2_;
    Matrix &result_;
    int startRow_;
    int startColumn_;
    int positions_;

    // Compute the product of two matrix positions
    void computeProductOnPosition(int x, int y) {
        int sum = 0;
        for (int c = 0; c < m1_.getColumns(); c++) {
            sum += m1_.getElementOnPosition(x, c) * m2_.getElementOnPosition(c, y);
        }
        result_.setElementOnPosition(x, y, sum);
    }

public:
    MultiplierThread(const Matrix &m1, const Matrix &m2, Matrix &result, int startRow, int startColumn, int positions)
            : m1_(m1), m2_(m2), result_(result), startRow_(startRow), startColumn_(startColumn), positions_(positions) {}

    // Overload the () operator to define the thread's execution
    // The thread will compute the product of the matrices on the positions it is assigned
    void operator()() {
        int currentRow = startRow_;
        int currentColumn = startColumn_;
        for (int pos = 0; pos < positions_; pos++) {
            computeProductOnPosition(currentRow, currentColumn);

            currentColumn++;
            if (currentColumn >= result_.getColumns()) {
                currentColumn = 0;
                currentRow++;
            }
        }
    }
};

// Generate tasks for matrix multiplication
vector<MultiplierThread> generateTasks(const Matrix &m1, const Matrix &m2, Matrix &result) {
    vector<MultiplierThread> threads; // The threads will be stored in a vector
    int positions = result.getColumns() * result.getRows(); // The number of positions in the result matrix
    int basePositionsPerThread = positions / THREAD_COUNT; // The number of positions each thread will compute
    int threadsWithAnExtraPosition = positions % THREAD_COUNT; // The number of threads that will compute an extra position
    int coveredPositions = 0;

    for (int threadIndex = 0; threadIndex < THREAD_COUNT; threadIndex++) {
        // Compute the number of positions the current thread will compute
        int positionsForCurrentThread = basePositionsPerThread;

        if (threadIndex < threadsWithAnExtraPosition) {
            positionsForCurrentThread++;
        }

        threads.emplace_back(m1, m2, result, coveredPositions / result.getColumns(), coveredPositions % result.getColumns(),
                             positionsForCurrentThread);
        coveredPositions += positionsForCurrentThread;
    }

    return threads;
}

int main() {
    // Matrices initialization
    Matrix m1(2000, 2000), m2(2000, 2000), m3(100, 100), m4(100, 100), m5(50, 50), m6(50, 50);
    Matrix result1(m1.getRows(), m2.getColumns()), result2(m3.getRows(), m4.getColumns()), result3(m5.getRows(), m6.getColumns());

    m1.fillMatrixRandomly();
    m2.fillMatrixRandomly();
    m3.fillMatrixRandomly();
    m4.fillMatrixRandomly();
    m5.fillMatrixRandomly();
    m6.fillMatrixRandomly();

    // Perform matrix multiplication and measure the time taken for each operation
    auto performMultiplication = [](const Matrix& m1, const Matrix& m2, Matrix& result, int matrixNumber) -> void {
        auto tasks = generateTasks(m1, m2, result);
        vector<thread> threads;
        threads.reserve(tasks.size()); // Reserve space to prevent reallocations

        chrono::steady_clock::time_point begin = chrono::steady_clock::now();
        for (auto& task : tasks) {
            threads.push_back(thread(task));
        }
        chrono::steady_clock::time_point thread_creation_end = chrono::steady_clock::now();

        for (auto& thread : threads) {
            if (thread.joinable()) {
                thread.join();
            }
        }
        chrono::steady_clock::time_point end = chrono::steady_clock::now();

        cout << "Result matrix " << matrixNumber << ":" << endl;
        cout << result << endl;
        cout << "Thread creation for matrix " << matrixNumber << " took "
                  << chrono::duration_cast<chrono::microseconds>(thread_creation_end - begin).count()
                  << " microseconds." << endl;
        cout << "Total time for matrix multiplication " << matrixNumber << " took "
                  << chrono::duration_cast<chrono::microseconds>(end - begin).count()
                  << " microseconds." << endl;
        cout << endl;
    };

    // Perform multiplications and display results
    performMultiplication(m1, m2, result1, 1);
    performMultiplication(m3, m4, result2, 2);
    performMultiplication(m5, m6, result3, 3);

    return 0;
}