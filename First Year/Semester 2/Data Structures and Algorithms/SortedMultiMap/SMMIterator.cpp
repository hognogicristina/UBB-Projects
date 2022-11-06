#include "SMMIterator.h"
#include "SortedMultiMap.h"

SMMIterator::SMMIterator(const SortedMultiMap& d) : map(d){
	this->current = map.arr[0].second;
	this->pos = 0;
	this->capacity = 0;
}

void SMMIterator::first(){
	this->current = map.arr[0].second;
	this->pos = 0;
	this->capacity = 0;
}

void SMMIterator::next(){
	this->capacity++;

	if (this->map.isEmpty())
		throw std::exception();

	this->current = this->current->next;

	if (this->current == nullptr) {
		if (this->pos + 1 == this->map.sizeArr)
			return;
		else {
			this->pos++;
			this->current = this->map.arr[pos].second;
		}
	}
}

bool SMMIterator::valid() const{
	return (this->capacity < this->map.capacity);
}

TElem SMMIterator::getCurrent() const{
	if (!this->valid() || this->map.isEmpty())
		throw std::exception();

	TElem pair;

	pair.first = this->map.arr[this->pos].first;
	pair.second = this->current->value;

	return pair;
}


