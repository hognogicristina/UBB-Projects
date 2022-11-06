#ifndef A14_913_HOGNOGI_CRISTINA_REPOUSER_H
#define A14_913_HOGNOGI_CRISTINA_REPOUSER_H

#pragma once
#include <vector>
#include "../Domain/Domain.h"

class UserRepository {
protected:
	std::vector<TrenchCoat> shoppingBasket{};
	std::string userFilename;
public:
	explicit UserRepository(std::vector<TrenchCoat> &shoppingBasket1);

	UserRepository() = default;

	/// Method to get all the elements of the UserRepository
	virtual std::vector<TrenchCoat> &getAllUserRepo() = 0;

	/// Method to get the number of elements from the UserRepository
	virtual unsigned int getNrElems() = 0;

	/// Method to get the capacity of the dynamic array used in the UserRepository
	virtual unsigned int getCap() = 0;

	/// Method to add an element to the UserRepository
	virtual void addUserRepo(const TrenchCoat &trenchCoat) = 0;

	virtual void updateUserRepo(const TrenchCoat &trenchCoat, int idx);

	/// Method to restore elements of the shopping list to a file
	virtual void writeToFile() = 0;
	/// Getter for the filename where is being restored
	virtual std::string &getFilename() = 0;

	virtual int findBySizeAndColourUser(int size, std::string colour);

	~UserRepository();
};

class UserException: public std::exception {
private:
	std::string message;
public:
	explicit UserException(std::string& _message);

	const char *what() const noexcept override;
};

#endif //A14_913_HOGNOGI_CRISTINA_REPOUSER_H
