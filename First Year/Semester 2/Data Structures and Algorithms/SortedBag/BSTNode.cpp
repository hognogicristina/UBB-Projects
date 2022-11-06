#include "BSTNode.h"


BSTNode::BSTNode(int value, BSTNode *left, BSTNode *right, BSTNode *parent) : value(value), left(left), right(right),
																			  parent(parent) {}

TComp BSTNode::getValue() const {
	return this->value;
}

void BSTNode::setValue(TComp value) {
	this->value = value;
}

BSTNode *BSTNode::getLeft() const {
	return this->left;
}

void BSTNode::setLeft(BSTNode *left) {
	this->left = left;
}

BSTNode *BSTNode::getRight() const {
	return this->right;
}

void BSTNode::setRight(BSTNode *right) {
	this->right = right;
}

BSTNode *BSTNode::getParent() const {
	return this->parent;
}

void BSTNode::setParent(BSTNode *parent) {
	this->parent = parent;
}

bool BSTNode::isLeaf() {
	if (this->left == NULL && this->right == NULL)
		return true;
	return false;
}

