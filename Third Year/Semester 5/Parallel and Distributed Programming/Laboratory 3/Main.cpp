#include <iostream>
#include <vector>
#include <thread>
#include <future>
#include <random>
#include <stdexcept>

const int THREAD_COUNT = 10;

// Class for representing a matrix
class Matrix {
private:
    int rows_;
    int columns_;
    std::vector<std::vector<int>> matrix_;
    const int MAX_INITIAL_VALUE = 100;
    const int MIN_INITIAL_VALUE = 10;

public:
    Matrix(int rows, int columns) : rows_(rows), columns_(columns) {
        matrix_ = std::vector<std::vector<int>>(rows, std::vector<int>(columns, 0));
    }

    // Fill the matrix with random values
    void fillMatrixRandomly() {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<int> distribution(MIN_INITIAL_VALUE, MAX_INITIAL_VALUE);

        for (int i = 0; i < rows_; i++) {
            for (int j = 0; j < columns_; j++) {
                matrix_[i][j] = distribution(gen);
            }
        }
    }

    // Reset all elements in the matrix to 0
    void reset() {
        for (int i = 0; i < rows_; i++) {
            for (int j = 0; j < columns_; j++) {
                matrix_[i][j] = 0;
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
            throw std::out_of_range("Invalid coordinates");
        }
        return matrix_[x][y];
    }

    // Set the element at a specific position in the matrix
    void setElementOnPosition(int x, int y, int newValue) {
        if (x < 0 || x >= rows_ || y < 0 || y >= columns_) {
            throw std::out_of_range("Invalid coordinates");
        }
        matrix_[x][y] = newValue;
    }

    // Overload the << operator to print the matrix
    friend std::ostream &operator<<(std::ostream &os, const Matrix &matrix) {
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
std::vector<MultiplierThread> generateTasks(const Matrix &m1, const Matrix &m2, Matrix &result) {
    std::vector<MultiplierThread> threads;
    int positions = result.getColumns() * result.getRows();
    int basePositionsPerThread = positions / THREAD_COUNT;
    int threadsWithAnExtraPosition = positions % THREAD_COUNT;
    int coveredPositions = 0;

    for (int threadIndex = 0; threadIndex < THREAD_COUNT; threadIndex++) {
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
    // Create matrices and initialize them with random values
    Matrix m1(4, 3);
    Matrix m2(3, 7);
    Matrix result(m1.getRows(), m2.getColumns());

    m1.fillMatrixRandomly();
    m2.fillMatrixRandomly();

    // Generate tasks for matrix multiplication
    std::vector<MultiplierThread> tasks = generateTasks(m1, m2, result);

    // Create threads and execute the tasks
    std::vector<std::thread> threads;
    for (auto &task: tasks) {
        threads.emplace_back(task);
    }

    for (auto &thread: threads) {
        thread.join();
    }

    // Print the result matrix
    std::cout << "Result:" << std::endl;
    std::cout << result << std::endl;

    return 0;
}