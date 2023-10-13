#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <mutex>
#include <cstdlib>
#include <ctime>

// Define data structures
struct Product {
    std::string name;
    double unitPrice;
    int quantity;
};

struct BillItem {
    std::string productName;
    int quantity;
};

struct Bill {
    std::vector<BillItem> items;
    double total;
};

struct SalesRecord {
    double totalMoney;
    std::vector<Bill> bills;
};

std::vector<Product> products;   // Shared product data
SalesRecord salesRecord;        // Shared sales record
std::mutex productsMutex;       // Mutex for protecting product data
std::mutex salesMutex;          // Mutex for protecting sales data

void performSale(const std::vector<BillItem>& items) {
    // Decrease product quantities and increase total money
    double total = 0.0;
    std::lock_guard<std::mutex> lock(productsMutex);
    for (const BillItem& item : items) {
        for (Product& product : products) {
            if (product.name == item.productName) {
                if (product.quantity >= item.quantity) {
                    product.quantity -= item.quantity;
                    total += item.quantity * product.unitPrice;
                } else {
                    std::cout << "Insufficient quantity of " << product.name << std::endl;
                }
            }
        }
    }
    std::lock_guard<std::mutex> salesLock(salesMutex);
    salesRecord.totalMoney += total;
    salesRecord.bills.push_back({items, total});
}

void saleThread() {
    // Simulate sales operations with random items
    std::vector<BillItem> items;
    // Generate random items and quantities
    // For simplicity, we'll assume two products: "Product A" and "Product B"
    items.push_back({"Product A", rand() % 5 + 1});
    items.push_back({"Product B", rand() % 5 + 1});
    performSale(items);
}

void inventoryCheck() {
    // Check that all sold products and money are justified by recorded bills
    double totalMoney = 0.0;
    std::lock(productsMutex, salesMutex);
    for (const Bill& bill : salesRecord.bills) {
        totalMoney += bill.total;
        for (const BillItem& item : bill.items) {
            for (Product& product : products) {
                if (product.name == item.productName) {
                    product.quantity += item.quantity;
                }
            }
        }
    }
    if (totalMoney == salesRecord.totalMoney) {
        std::cout << "Inventory check passed." << std::endl;
    } else {
        std::cout << "Inventory check failed." << std::endl;
    }
    productsMutex.unlock();
    salesMutex.unlock();
}

int main() {
    // Seed the random number generator
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    // Initialize products
    products.push_back({"Product A", 100.0, 100});
    products.push_back({"Product B", 50.0, 50});

    // Create and launch sale threads
    const int numSaleThreads = 5;
    std::vector<std::thread> saleThreads;
    for (int i = 0; i < numSaleThreads; i++) {
        saleThreads.emplace_back(saleThread);
    }

    // Wait for all sale threads to finish
    for (std::thread& thread : saleThreads) {
        thread.join();
    }

    // Run inventory check
    inventoryCheck();

    return 0;
}
