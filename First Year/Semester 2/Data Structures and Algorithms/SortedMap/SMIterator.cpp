#include "SMIterator.h"
#include "SortedMap.h"
#include <exception>

#include <algorithm>

using namespace std;

// O(size^2)
SMIterator::SMIterator(const SortedMap &m) : map(m) {
	// TODO - Implementation

	/// contains a reference of the container it iterates over
	this->index = 0;
	this->length = m.length;
	this->array = new TElem[this->length];
	this->k = 0;

	for (int i = 0; i < m.capacity; ++i) {
		/// if an element is different from deleted and empty values
		if (m.hashTable[i] != m.deleted && m.hashTable[i] != m.empty)
			/// add to the new array
			this->array[++this->k] = m.hashTable[i];
	}

	/// sorting after relation r
	for (int i = 0; i < k - 1; ++i) {
		for (int j = i + 1; j < k; ++j) {
			if (!m.r(this->array[i].first, this->array[j].first)) {
				TElem aux;
				aux = this->array[i];
				this->array[i] = this->array[j];
				this->array[j] = aux;
			}
		}
	}
}

// theta(1)
void SMIterator::first() {
	//TODO - Implementation

	/// sets the iterator to the first element of the container
	this->index = 0;
}

// theta(1)
void SMIterator::next() {
	//TODO - Implementation

	/// moves the iterator to the next element
	/// throws exception if the iterator is not valid
	if (!valid())
		throw std::exception();
	++this->index;
}

// theta(1)
bool SMIterator::valid() const {
	//TODO - Implementation

	/// checks if the iterator is valid
	return this->index < this->length;
}

// theta(1)
TElem SMIterator::getCurrent() const {
	// TODO - Implementation

	/// returns the value of the current element from the iterator
	/// throws exception if the iterator is not valid
	if (!valid())
		throw std::exception();
	return this->array[this->index];
}


