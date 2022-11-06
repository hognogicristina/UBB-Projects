#include "SMMIterator.h"
#include "SortedMultiMap.h"
#include <iostream>
#include <vector>
#include <exception>

using namespace std;

// Theta(1)
SortedMultiMap::SortedMultiMap(Relation r) {
	// constructor

	this->r = r;
	this->arr = new TPair[1000000];
	this->capacity = 0;
	this->sizeArr = 0;
}

// O(nrElem)
void SortedMultiMap::add(TKey c, TValue v) {
	//adds a new key value pair to the sorted multi map

	++this->capacity;
	Node *newNode = new Node;
	newNode->value = v;

	if (this->sizeArr == 0) {
		this->arr[0].first = c;
		this->arr[0].second = newNode;
		this->sizeArr++;
		return;
	}
	for (int i = 0; i < this->sizeArr; i++) {
		if (c == this->arr[i].first) {
			newNode->next = this->arr[i].second;
			this->arr[i].second = newNode;
			return;
		}
		if (!r(this->arr[i].first, c)) {
			for (int j = this->sizeArr; j > i; --j)
				this->arr[j] = this->arr[j - 1];
			this->arr[i].first = c;
			this->arr[i].second = newNode;
			this->sizeArr++;
			return;
		}
	}

	this->arr[this->sizeArr].first = c;
	this->arr[this->sizeArr].second = newNode;
	this->sizeArr++;
}

// O(nrElem * sll)
vector<TValue> SortedMultiMap::search(TKey c) const {
	//returns the values belonging to a given key

	std::vector<int> vector;

	for (int i = 0; i < this->sizeArr; ++i) {
		if (this->arr[i].first == c) {
			Node *current = this->arr[i].second;
			while (current != nullptr) {
				vector.push_back(current->value);
				current = current->next;
			}
			return vector;
		}
	}

	return vector;
}

// O(nrElem * sll)
bool SortedMultiMap::remove(TKey c, TValue v) {
	//removes a key value pair from the sorted multimap
	//returns true if the pair was removed (it was part of the multimap), false if nothing is removed

	for (int i = 0; i < this->sizeArr; ++i) {
		if (this->arr[i].first == c) {
			Node *current = this->arr[i].second;
			Node *before = new Node;
			int numberOfArguments = 0;
			while (current != nullptr) {
				numberOfArguments++;
				if (current->value == v) {
					before->next = current->next;
					this->capacity--;
					if (numberOfArguments == 1 && current->next == nullptr) {
						for (int j = i; j < this->sizeArr - 1; ++j) {
							this->arr[j] = this->arr[j + 1];
						}
						this->sizeArr--;
					}
					return true;
				}
				before = current;
				current = current->next;
			}
			return false;
		}
	}

	return false;
}

// Theta(sizeArr)
vector<TValue> SortedMultiMap::removeKey(TKey key) {
	// removes a key together with all its values
	// returns a vector with the values that were previously associated to this value (and were removed)

	std::vector<int> vector;

	for (int i = 0; i < this->sizeArr; ++i) {
		if (this->arr[i].first == key) {

			Node *current = this->arr[i].second;
			while (current != nullptr) {
				vector.push_back(current->value);
				this->capacity--;
				current = current->next;
			}

			for (int j = i; j < this->sizeArr - 1; ++j) {
				this->arr[j] = this->arr[j + 1];
			}

			this->sizeArr--;
		}
	}

	return vector;
}

// Theta(1)
int SortedMultiMap::size() const {
	// returns the number of key-value pairs from the sorted multimap
	return this->capacity;
}

// Theta(1)
bool SortedMultiMap::isEmpty() const {
	//verifies if the sorted multi map is empty
	return (this->capacity == 0);
}

// Theta(1)
SMMIterator SortedMultiMap::iterator() const {
	// returns an iterator for the sorted multimap. The iterator will returns the pairs as required by the relation (given to the constructor)
	return SMMIterator(*this);
}
