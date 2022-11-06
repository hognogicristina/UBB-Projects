#include "SMIterator.h"
#include "SortedMap.h"
#include <exception>
#include <cmath>

using namespace std;
/// Calculating a hash function with double hash

/// theta(1)
int SortedMap::hCode(TKey k) {
	return abs(int(k));
}

/// theta(1)
TKey SortedMap::h1(TKey k) {
	return hCode(k) % this->capacity;
}

/// theta(1)
TKey SortedMap::h2(TKey k) {
	return 1 + (hCode(k) % (this->capacity - 1));
}

/// theta(1)
int SortedMap::h(TKey k, int i) {
	return (h1(k) + i * h2(k)) % this->capacity;
}

/// O(sqrt(x))
bool SortedMap::prim(int x) {
	if (x < 2 || x > 2 && x % 2 == 0)
		return false;

	for (int d = 3; d * d <= x; d += 2)
		if (x % d == 0)
			return false;

	return true;
}

/// theta(1)
int SortedMap::firstPrimeGreaterThan(int x) {
	++x;
	while (!prim(x))
		++x;
	return x;
}

/// theta(m), where m is the expanded capacity
void SortedMap::resize() {
	int prime = firstPrimeGreaterThan(this->capacity * 2);
	TElem *aux = new TElem[prime];

	int oldCap = this->capacity;
	this->capacity = prime;

	for (int i = 0; i < prime; ++i)
		/// filling aux with the value of an empty pair
		aux[i] = this->empty;

	/// place data from old table to new
	for (int i = 0; i < oldCap; ++i) {
		TElem e = this->hashTable[i];
		int j = 0;
		/// initialize the position to insert element
		int pos = h(e.first, j);

		/// traverse aux and check if the value pair at position pos is not equal to the value of empty (-999999)
		while (j < this->capacity && aux[pos] != this->empty) {
			if (aux[pos].first == e.first)
				/// if key of a value e == e in a pair of <TKey, TValue>
				/// break bcs you can't overwrite a position which already exists
				break;
			++j;
			/// position where to insert element
			pos = h(e.first, j);
		}
		aux[pos] = e;
	}

	/// deleting all hashTable which is not good
	delete[]this->hashTable;
	/// gets the value correct
	this->hashTable = aux;
}

SortedMap::SortedMap(Relation r) {
	// TODO - Implementation
	this->r = r;
	this->capacity = max_capacity;
	this->length = 0;

	this->empty = std::make_pair(-999999, -999999);
	this->deleted = std::make_pair(-999998, -999998);
	this->hashTable = new TElem[max_capacity];

	for (int i = 0; i < max_capacity; ++i)
		this->hashTable[i] = this->empty;
}

/// BC = AC = Theta(1), WC = Theta(capacity) => O(capacity) overall
TValue SortedMap::add(TKey k, TValue v) {
	// TODO - Implementation

	// adds a pair (key, value) to the map
	if (this->length == this->capacity)
		resize();

	int i = 0;
	int pos = h(k, i);

	// if the key already exists in the map, then the value associated to the key is replaced by the new value and the
	/// verifies all the positions until a free spot is found
	while (i < this->capacity && this->hashTable[pos] != this->empty && this->hashTable[pos] != this->deleted) {
		if (this->hashTable[pos].first == k)
			/// if key of a value k == k in a pair of <TKey, TValue>
			break;
		++i;
		/// position where to insert element
		pos = h(k, i);
	}

	// old value is return if the key SMes not exist, a new pair is added and the value null is returned
	TValue old = this->hashTable[pos].second;
	TElem newValue = std::make_pair(k, v);

	/// if an empty spot or deleted element is found then insert at position pos
	if (old == this->empty.second || old == this->deleted.second) {
		++this->length;
		/// gets the new value
		this->hashTable[pos] = newValue;
		return NULL_TVALUE;
	} else {
		this->hashTable[pos] = newValue;
		/// remains the old value
		return old;
	}
}

/// BC = AC = Theta(1), WC = Theta(capacity) => O(capacity) overall
TValue SortedMap::search(TKey k) {
	// TODO - Implementation

	// searches for the key
	int i = 0;
	int pos = h(k, i);

	// returns the value associated with the key if the map contains the key
	/// verifies all the positions until a free spot is found and traverse hashTable[pos] and check if
	/// the value pair at position pos is not equal to the value of empty (-999999)
	while (i < this->capacity && this->hashTable[pos].first != k && this->hashTable[pos] != this->empty) {
		++i;
		/// position where to insert element
		pos = h(k, i);
	}

	// null: NULL_TVALUE otherwise
	/// if an empty spot or hashTable[pos] is equal to the value of empty (-999999)
	if (i == this->capacity || this->hashTable[pos] == this->empty)
		return NULL_TVALUE;
	return this->hashTable[pos].second;
}

/// BC = AC = Theta(1), WC = Theta(capacity) => O(capacity) overall
TValue SortedMap::remove(TKey k) {
	// TODO - Implementation

	// removes a key from the map
	int i = 0;
	int pos = h(k, i);

	// returns the value associated with the key if the key existed
	/// verifies all the positions until a free spot is found and traverse hashTable[pos] and check if
	/// the value pair at position pos is not equal to the value of empty (-999999)
	while (i < this->capacity && this->hashTable[pos].first != k && this->hashTable[pos] != this->empty) {
		++i;
		/// position where to insert element
		pos = h(k, i);
	}

	// null: NULL_TVALUE otherwise
	/// if an empty spot or hashTable[pos] is equal to the value of empty (-999999)
	if (i == this->capacity || this->hashTable[pos] == this->empty)
		return NULL_TVALUE;
	--this->length;

	TValue toReturn = this->hashTable[pos].second;
	this->hashTable[pos] = this->deleted;
	return toReturn;
}

/// theta(1)
int SortedMap::size() const {
	// TODO - Implementation
	return this->length;
}

/// theta(1)
bool SortedMap::isEmpty() const {
	// TODO - Implementation
	return this->length == 0;
}

SMIterator SortedMap::iterator() const {
	return SMIterator(*this);
}

SortedMap::~SortedMap() {
	// TODO - Implementation
	delete[]this->hashTable;
}

/// BC = AC = Theta(1), WC = Theta(capacity) => O(capacity) overall
void SortedMap::replace(TKey k, TValue oldValue, TValue newValue) {
	// replaces the value currently mapped to a key k, with value newValue, only if the current value is equal to oldValue.
	// if the current value is not oldValue, or if k is not in the sortedmap, nothing is changed.

	int i = 0;
	int pos = h(k, i);

	/// verifies all the positions until a free spot is found and traverse hashTable[pos] and check if
	/// the value pair at position pos is not equal to the value of empty (-999999)
	while (i < this->capacity && this->hashTable[pos] != this->empty && this->hashTable[pos] != this->deleted) {
		if (this->hashTable[pos].first == oldValue) {
			/// if key of a value k == k in a pair of <TKey, TValue>
			k == newValue;
			++i;
			/// position where to insert element
			pos = h(k, i);
		} else if (this->hashTable[pos].first != oldValue && reinterpret_cast<TElem *>(k) != this->hashTable) {
			break;
		}
	}
}