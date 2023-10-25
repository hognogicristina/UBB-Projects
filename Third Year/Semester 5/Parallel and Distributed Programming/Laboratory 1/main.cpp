#include <iostream>
#include <vector>
#include <unordered_map>
#include <list>
#include <fstream>
#include <ctime>
#include <mutex>
#include <thread>
#include <algorithm>
#include <random>

#define NUM_THREADS 5

struct Transaction {
    // The source and destination IDs are used to lock the accounts in the same order
    int sourceId;
    int destinationId;
    int amount;
    int serialNumber;
};

struct BankAccount {
    // The ID is used to lock the accounts in the same order
    int id;
    int balance;
    int initialBalance;
    std::list<Transaction> transactions;
};

std::unordered_map<int, BankAccount> accounts; // The key is the account ID
std::list<Transaction> transactions; // The list of all transactions
std::mutex accountMutex; // Used to lock the accounts map
std::vector<std::mutex> accountMutexes; // Used to lock the accounts in the same order
std::mutex transactionMutex; // Used to lock the transactions list

std::unordered_map<int, BankAccount> readAccountsFromFile(const std::string &filePath) {
    // read the accounts from the file and return them in a map

    std::unordered_map<int, BankAccount> accounts; // The key is the account ID
    std::ifstream file(filePath);

    if (!file.is_open()) {
        std::cerr << "Error: Unable to open the input file." << std::endl;
        exit(1);
    }

    BankAccount account;
    while (file >> account.id >> account.balance) {
        // The initial balance is used to check the consistency
        account.initialBalance = account.balance; // The initial balance is used to check the consistency
        accounts[account.id] = account; // Add the account to the map
    }
    return accounts;
}

bool isTransactionInAccountLog(int accountId, int serialNumber) {
    // Check if the transaction is in the account log
    for (const auto &transaction: accounts[accountId].transactions) {
        // The serial number is used to check if the transaction is already in the account log
        if (transaction.serialNumber == serialNumber) {
            return true;
        }
    }
    return false;
}

void checkConsistency() {
    bool consistent = true;

    for (auto it = accounts.begin(); it != accounts.end(); ++it) {
        // Iterate over the accounts and check the consistency of each account

        int accountId = it->first; // Get the account ID
        std::unique_lock<std::mutex> lock(accountMutexes[accountId]); // Lock the account
        BankAccount &account = it->second; // Get a non-const reference to the account

        int calculatedBalance = account.initialBalance; // The initial balance is used to check the consistency

        for (const auto &transaction: account.transactions) {
            // Iterate over the transactions of the account and check the consistency of each transaction
            if (transaction.sourceId == accountId) {
                // The transaction is a withdrawal
                calculatedBalance -= transaction.amount; // Subtract the amount from the calculated balance
                if (!isTransactionInAccountLog(transaction.destinationId, transaction.serialNumber)) {
                    // Check if the transaction is in the account log of the destination account
                    consistent = false;
                    break;
                }
            } else {
                calculatedBalance += transaction.amount; // Add the amount to the calculated balance
                if (!isTransactionInAccountLog(transaction.sourceId, transaction.serialNumber)) {
                    // Check if the transaction is in the account log of the source account
                    consistent = false;
                    break;
                }
            }
        }

        if (calculatedBalance != account.balance) {
            // Check if the calculated balance is equal to the actual balance
            consistent = false;
        }

        lock.unlock();
    }

    if (consistent) {
        std::cout << "Consistency check passed" << std::endl;
    } else {
        std::cout << "Consistency check failed" << std::endl;
    }
}

int generateRandomNumberInRange(int min, int max) {
    // Generate a random number in the range [min, max]
    std::random_device rd; // obtain a random number from hardware
    std::mt19937 gen(rd()); // seed the generator
    std::uniform_int_distribution<int> distribution(min, max); // define the range
    return distribution(gen); // generate the number
}

void performTransaction() {
    // Perform a transaction between two random accounts
    Transaction transaction; // The transaction to be performed
    transaction.amount = generateRandomNumberInRange(1, 100); // Generate a random amount
    transaction.sourceId = generateRandomNumberInRange(0, accounts.size()); // Generate a random source account ID
    transaction.destinationId = generateRandomNumberInRange(0, accounts.size()); // Generate a random destination account ID

    while (transaction.sourceId == transaction.destinationId) {
        // Generate a random destination account ID until it is different from the source account ID
        transaction.destinationId = generateRandomNumberInRange(0, accounts.size());
    }

    // Lock the accounts in the same order
    std::unique_lock<std::mutex> lock1(accountMutexes[std::min(transaction.sourceId, transaction.destinationId)]);
    std::unique_lock<std::mutex> lock2(accountMutexes[std::max(transaction.sourceId, transaction.destinationId)]);

    if (accounts[transaction.sourceId].balance >= transaction.amount) {
        // Check if the source account has enough balance to perform the transaction
        transaction.serialNumber = transactions.size(); // Use the size as serial number (assuming unique)
        accounts[transaction.sourceId].balance -= transaction.amount; // Subtract the amount from the source account
        accounts[transaction.sourceId].transactions.push_back(transaction); // Add the transaction to the source account
        accounts[transaction.destinationId].balance += transaction.amount; // Add the amount to the destination account
        accounts[transaction.destinationId].transactions.push_back(transaction); // Add the transaction to the destination account

        transactionMutex.lock(); // Lock the transactions list
        transactions.push_back(transaction); // Add the transaction to the transactions list
        transactionMutex.unlock(); // Unlock the transactions list
    }
}

int main() {
    std::srand(std::time(nullptr)); // Seed the random number generator
    accounts = readAccountsFromFile("accounts.txt");
    accountMutexes = std::vector<std::mutex>(accounts.size()); // Initialize the account mutexes

    std::vector<std::thread> threads; // The threads vector

    for (int i = 0; i < NUM_THREADS; ++i) {
        // Create the threads
        threads.emplace_back(performTransaction);
    }

    for (int i = 0; i < NUM_THREADS; ++i) {
        // Join the threads
        threads[i].join();
        if (i % 2 == 0) {
            // Check the consistency every two threads
            checkConsistency();
        }
    }

    std::thread consistencyThread(checkConsistency); // Create a thread to check the consistency
    consistencyThread.join(); // Join the consistency thread

    std::cout << "Transactions:" << std::endl;
    for (const auto &transaction: transactions) {
        std::cout << "Source: " << transaction.sourceId << " Destination: " << transaction.destinationId
                  << " Amount: " << transaction.amount << " Serial: " << transaction.serialNumber << std::endl;
    }

    return 0;
}