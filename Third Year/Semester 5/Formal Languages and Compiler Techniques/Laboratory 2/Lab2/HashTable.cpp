#include <iostream>
#include <vector>
#include <string>

template <typename T>
class HashTable {
private:
    std::vector<std::vector<T>> hashTable;
    int capacity;

public:
    HashTable(int capacity) : capacity(capacity) {
        hashTable.resize(capacity);
    }

    int getCapacity() {
        return capacity;
    }

    int hash(int key) {
        return key % capacity;
    }

    int hash(const std::string& key) {
        int hash = 5381;
        for (char c : key) {
            hash = ((hash << 5) + hash) + c;
        }
        return std::abs(hash) % capacity;
    }

    bool contains(T key) {
        int hashValue = getHashValue(key);
        for (const T& item : hashTable[hashValue]) {
            if (item == key) {
                return true;
            }
        }
        return false;
    }

    int getHashValue(T key) {
        int hashValue = -1;
        if (std::is_same<T, int>::value) {
            hashValue = hash(key);
        } else if (std::is_same<T, std::string>::value) {
            hashValue = hash(key);
        }
        return hashValue;
    }

    void add(T key) {
        int hashValue = getHashValue(key);
        if (!contains(key)) {
            hashTable[hashValue].push_back(key);
        }
    }

    int getPosition(T key) {
        int hashValue = getHashValue(key);
        if (hashValue != -1) {
            return hashValue;
        }
        return -1; // Key not found or not supported
    }

    friend std::ostream& operator<<(std::ostream& os, const HashTable<T>& table) {
        os << "SymbolTable { items=";
        for (const std::vector<T>& bucket : table.hashTable) {
            os << "[";
            for (const T& item : bucket) {
                os << item << " ";
            }
            os << "]";
        }
        os << " }";
        return os;
    }
};
