#include "SortedBagIterator.h"
#include "SortedBag.h"
#include <exception>

using namespace std;

SortedBagIterator::SortedBagIterator(const SortedBag &b) : bag(b), currentNode(NULL), stack{std::stack<BSTNode *>{}} {
	// TODO - Implementation

	this->first();
}

TComp SortedBagIterator::getCurrent() {
	// TODO - Implementation

	if (!this->valid()) {
		// throws exception if the iterator is not valid
		throw std::runtime_error("");
	}

	// returns the value of the current element from the iterator
	return this->currentNode->getValue();
}

bool SortedBagIterator::valid() {
	// TODO - Implementation

	// checks if the iterator is valid
	return this->currentNode != NULL;
}

void SortedBagIterator::next() {
	// TODO - Implementation

	if (!valid()) {
		// throws exception if the iterator is not valid
		throw std::runtime_error("");
	}

	BSTNode *node = stack.top();
	stack.pop();

	if (node->getRight() != NULL) {
		node = node->getRight();
		while (node != NULL) {
			// moves the iterator to the next element
			this->stack.push(node);
			node = node->getLeft();
		}
	}

	if (this->stack.empty() == false) {
		this->currentNode = this->stack.top();
	} else {
		this->currentNode = NULL;
	}
}

void SortedBagIterator::first() {
	// TODO - Implementation

	// sets the iterator to the first element of the container
	this->currentNode = this->bag.root;
	this->stack = std::stack<BSTNode *>{};

	while (this->currentNode != NULL) {
		this->stack.push(this->currentNode);
		this->currentNode = this->currentNode->getLeft();
	}

	if (this->stack.empty() == false) {
		this->currentNode = stack.top();
	} else {
		this->currentNode = NULL;
	}
}

