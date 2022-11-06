#include <iostream>

using namespace std;
#pragma once

typedef int TComp;

class BSTNode {
private:
	TComp value;
	BSTNode *left;
	BSTNode *right;
	BSTNode *parent;

public:
	BSTNode(int value = 0, BSTNode *left = NULL, BSTNode *right = NULL, BSTNode *parent = NULL);

	TComp getValue() const;
	void setValue(TComp value);

	BSTNode *getLeft() const;
	void setLeft(BSTNode *left);

	BSTNode *getRight() const;
	void setRight(BSTNode *right);

	BSTNode *getParent() const;
	void setParent(BSTNode *parent);
	bool isLeaf(); /// no children
};