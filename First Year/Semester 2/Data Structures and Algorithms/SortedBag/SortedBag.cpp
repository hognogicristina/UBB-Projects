#include "SortedBag.h"
#include "SortedBagIterator.h"

SortedBag::SortedBag(Relation r) {
	// TODO - Implementation
	this->r = r;
	this->root = NULL;
	this->length = 0;
}

/// O(log2n)
BSTNode *SortedBag::getMinimum(BSTNode *startingRoot) {
	BSTNode *currentNode = this->root;
	BSTNode *minNode = this->root;

	while (currentNode != NULL) {
		minNode = currentNode;
		currentNode = currentNode->getLeft();
	}

	return minNode;
}

/// O(log2n)
void SortedBag::add(TComp e) {
	// TODO - Implementation

	BSTNode *current = this->root;
	BSTNode *parent = NULL;

	while (current != NULL) {
		parent = current;

		/// if there is a realtion between element and current root
		if (this->r(e, current->getValue())) {
			/// current gets the value of the left node
			current = current->getLeft();
		} else {
			/// current gets the value of the right node
			current = current->getRight();
		}
	}

	BSTNode *newNode = new BSTNode{e};

	if (this->root == NULL) {
		this->root = newNode;
	} else if (this->r(e, parent->getValue())) {
		parent->setLeft(newNode);
	} else {
		parent->setRight(newNode);
	}

	++this->length;
}

BSTNode *SortedBag::removeRecursively(BSTNode *node, TComp e, bool &removed) {
	if (node == NULL)
		return node;

	if (e == node->getValue()) {
		removed = true;

		if (node->getLeft() == NULL) {
			BSTNode *right = node->getRight();
			delete node;
			return right;
		} else if (node->getRight() == NULL) {
			BSTNode *left = node->getLeft();
			delete node;
			return left;
		} else {
			BSTNode *maxNode = this->getMinimum(node->getRight());
			node->setValue(maxNode->getValue());
			node->setLeft(this->removeRecursively(node->getLeft(), maxNode->getValue(), removed));
		}
	} else if (this->r(e, node->getValue())) {
		node->setLeft(this->removeRecursively(node->getLeft(), e, removed));
	} else {
		node->setRight(this->removeRecursively(node->getRight(), e, removed));
	}
	return node;
}

/// O(log2n)
bool SortedBag::remove(TComp e) {
	//TODO - Implementation

	// removes one occurence of an element from a sorted bag
	bool removed = false;

	// returns true if an element was removed
	this->root = removeRecursively(this->root, e, removed);

	if (removed)
		--this->length;

	// false otherwise (if e was not part of the sorted bag)
	return removed;
}

/// O(log2n)
bool SortedBag::search(TComp elem) const {
	// TODO - Implementation

	// checks if an element appearch is the sorted bag
	auto current = this->root;

	while (current != NULL) {
		if (current->getValue() == elem)
			return true;
		if (this->r(elem, current->getValue())) {
			current = current->getLeft();
		} else
			current = current->getRight();
	}
	return false;
}

/// O(log2n)
int SortedBag::nrOccurrences(TComp elem) const {
	// TODO - Implementation

	int count = 0;
	auto current = this->root;

	while (current != NULL) {
		if (current->getValue() == elem) {
			++count;
		}
		if (this->r(elem, current->getValue()))
			current = current->getLeft();
		else
			current = current->getRight();

	}
	return count;
}

/// theta(1)
int SortedBag::size() const {
	// TODO - Implementation
	return this->length;
}

/// theta(1)
bool SortedBag::isEmpty() const {
	// TODO - Implementation
	if (this->root == NULL)
		return true;
	return false;
}


SortedBagIterator SortedBag::iterator() const {
	return SortedBagIterator(*this);
}


SortedBag::~SortedBag() {
	// TODO - Implementation
	delete[]this->root;
}
