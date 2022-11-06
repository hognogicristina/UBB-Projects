#include "RepoUserCSV.h"
#include <fstream>

UserRepositoryCSV::UserRepositoryCSV(const std::vector<TrenchCoat> &shoppingBasket, const std::string &userFilename) {
	/// Constructor for the UserRepositoryCSV class
	/// \param shoppingBasket - the list of trench coats that the user is buying
	/// \param userFilename - restored elements into a file

	this->shoppingBasket = shoppingBasket;
	this->userFilename = userFilename;
}

std::vector<TrenchCoat> &UserRepositoryCSV::getAllUserRepo() {
	/// Method to get all the elements of the UserRepositoryCSV

	return this->shoppingBasket;
}

unsigned int UserRepositoryCSV::getNrElems() {
	/// Method to get the number of elements from the UserRepositoryCSV

	return this->shoppingBasket.size();
}

unsigned int UserRepositoryCSV::getCap() {
	/// Method to get the capacity of the dynamic array used in the UserRepositoryCSV

	return this->shoppingBasket.capacity();
}

void UserRepositoryCSV::addUserRepo(const TrenchCoat &trenchCoat) {
	/// Method to add an element to the UserRepositoryCSV

	this->shoppingBasket.push_back(trenchCoat);
	this->writeToFile();
}

void UserRepositoryCSV::updateUserRepo(const TrenchCoat &trenchCoat, int idx) {
	/// Method to update an entity based on its index with a new entity
	/// \param trenchCoat - the new trench coat with which the update is done
	/// \param idx - the index of the trench coat to be updated

	UserRepository::updateUserRepo(trenchCoat, idx);
}

void UserRepositoryCSV::writeToFile() {
	/// Method to restore elements of the shopping list to a file

	std::ofstream fout(this->userFilename);

	if (!this->shoppingBasket.empty()) {
		for (auto trenchCoat: this->shoppingBasket) {
			fout << trenchCoat << "\n";
		}
	}
}

std::string &UserRepositoryCSV::getFilename() {
	/// Getter for the filename where is being restored

	return this->userFilename;
}

int UserRepositoryCSV::findBySizeAndColourUser(int size, std::string colour) {
	/// Method to find an entity by size
	/// \param size - the size of the trench coat that we are searching for

	return UserRepository::findBySizeAndColourUser(size, colour);
}

/// Destructor
UserRepositoryCSV::~UserRepositoryCSV() = default;
