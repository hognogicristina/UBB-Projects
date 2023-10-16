#include <iostream>
#include "HashTable.cpp"

int main() {
    HashTable<int> intTable(10);
    intTable.add(5);
    intTable.add(15);
    intTable.add(25);

    std::cout << intTable << std::endl;

    HashTable<std::string> stringTable(10);
    stringTable.add("apple");
    stringTable.add("banana");
    stringTable.add("cherry");

    std::cout << stringTable << std::endl;

    return 0;
}
