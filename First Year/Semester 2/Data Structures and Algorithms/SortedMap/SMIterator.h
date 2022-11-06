#pragma once
#include "SortedMap.h"

//DO NOT CHANGE THIS PART
class SMIterator{
	friend class SortedMap;
private:
	const SortedMap& map;

	// Constructor receives a reference of the container.
	// after creation the iterator will refer to the first element of the container, or it will be invalid if the container is empty
	SMIterator(const SortedMap &mapionar);

	// TODO - Representation
	int length;
	int index;
	int k;
	TElem *array;
	// representation specific for the iterator

public:
	void first();
	void next();
	bool valid() const;
	TElem getCurrent() const;
};

