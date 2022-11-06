#pragma once
// DO NOT INCLUDE SORTEDMAPITERATOR

// DO NOT CHANGE THIS PART
typedef int TKey;
typedef int TValue;

#include <utility>
#define max_capacity 53

typedef std::pair<TKey, TValue> TElem;
#define NULL_TVALUE -111111
#define NULL_TPAIR pair<TKey, TValue>(-111111, -111111);

class SMIterator;

typedef bool(*Relation)(TKey, TKey);

class SortedMap {
	friend class SMIterator;

private:
	// TODO - Representation
	int length;
	int capacity;
	TElem deleted;
	TElem empty;

	/// representation of SortedMap
	Relation r;
	TElem *hashTable;

	/// calculating hash table of a double hash
	int hCode(TKey k);
	TKey h1(TKey k);
	TKey h2(TKey k);
	int h(TKey k, int i);

	/// resize double hash
	bool prim(int x);
	int firstPrimeGreaterThan(int x);
	void resize();

public:
	// implicit constructor
	SortedMap(Relation r);

	// adds a pair (key, value) to the map
	// if the key already exists in the map, then the value associated to the key is replaced by the new value and the
	// old value is returne if the key SMes not exist, a new pair is added and the value null is returned
	TValue add(TKey c, TValue v);

	// searches for the key and returns the value associated with the key if the map contains the key or null: NULL_TVALUE otherwise
	TValue search(TKey c);

	// removes a key from the map and returns the value associated with the key if the key existed ot null: NULL_TVALUE otherwise
	TValue remove(TKey c);

	// returns the number of pairs (key,value) from the map
	int size() const;

	// checks whether the map is empty or not
	bool isEmpty() const;

	// return the iterator for the map
	// the iterator will return the keys following the order given by the relation
	SMIterator iterator() const;

	// destructor
	~SortedMap();

	// replaces the value currently mapped to a key k, with value newValue, only if the current value is equal to oldValue.
	// if the current value is not oldValue, or if k is not in the sortedmap, nothing is changed.
	void replace(TKey k, TValue oldValue, TValue newValue);
};
