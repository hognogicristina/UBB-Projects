#include "SortedSetIterator.h"
#include <exception>

using namespace std;

// theta(1)
SortedSetIterator::SortedSetIterator(const SortedSet &m) : sortedSet(m) {}

// theta(1)
void SortedSetIterator::first() {
	this->currentIndexInList = sortedSet.head;
}

// theta(1)
void SortedSetIterator::next() {
	if (valid())
		this->currentIndexInList = sortedSet.next[this->currentIndexInList];
	else
		throw std::exception();
}

// theta(1)
TElem SortedSetIterator::getCurrent() {
	if (valid())
		return sortedSet.elements[this->currentIndexInList];
	else
		throw std::exception();
}

// theta(1)
bool SortedSetIterator::valid() const {
	return this->currentIndexInList != -1;
}