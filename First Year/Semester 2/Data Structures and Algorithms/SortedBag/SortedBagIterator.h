#pragma once
#include <stack>

#include "BSTNode.h"
#include "SortedBag.h"

class SortedBag;
typedef int TComp;

class SortedBagIterator {
	friend class SortedBag;
private:
	const SortedBag &bag;
	SortedBagIterator(const SortedBag &b);

	// TODO - Representation
	BSTNode *currentNode;
	std::stack<BSTNode *> stack;
public:
	// returns the value of the current element from the iterator
	// throws exception if the iterator is not valid
	TComp getCurrent();

	// checks if the iterator is valid
	bool valid();

	// moves the iterator to the next element
	// throws exception if the iterator is not valid
	void next();

	// sets the iterator to the first element of the container
	void first();
};

