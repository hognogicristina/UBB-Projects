#include "RepoUserHTML.h"
#include <fstream>

UserRepositoryHTML::UserRepositoryHTML(const std::vector<TrenchCoat> &shoppingBasket, const std::string &userFilename) {
	/// Constructor for the UserRepositoryHTML class
	/// \param shoppingBasket - the list of trench coats that the user is buying
	/// \param userFilename - restored elements into a file

	this->shoppingBasket = shoppingBasket;
	this->userFilename = userFilename;
}

std::vector<TrenchCoat> &UserRepositoryHTML::getAllUserRepo() {
	/// Method to get all the elements of the UserRepositoryHTML

	return this->shoppingBasket;
}

unsigned int UserRepositoryHTML::getNrElems() {
	/// Method to get the number of elements from the UserRepositoryHTML

	return this->shoppingBasket.size();
}

unsigned int UserRepositoryHTML::getCap() {
	/// Method to get the capacity of the dynamic array used in the UserRepositoryHTML

	return this->shoppingBasket.capacity();
}

void UserRepositoryHTML::addUserRepo(const TrenchCoat &trenchCoat) {
	/// Method to add an element to the UserRepositoryHTML

	this->shoppingBasket.push_back(trenchCoat);
	this->writeToFile();
}

void UserRepositoryHTML::updateUserRepo(const TrenchCoat &trenchCoat, int idx) {
	/// Method to update an entity based on its index with a new entity
	/// \param trenchCoat - the new trench coat with which the update is done
	/// \param idx - the index of the trench coat to be updated

	UserRepository::updateUserRepo(trenchCoat, idx);
}

void UserRepositoryHTML::writeToFile() {
	/// Method to restore elements of the shopping list to a file

	std::ofstream fout(this->userFilename);

	fout << "<!DOCTYPE html>\n<html><head><title>Shopping List</title></head><body>\n";
	fout << "<table border=\"1\">\n";
	fout << "<tr><td>Size</td><td>Colour</td><td>Price</td><td>Quantity</td><td>Photo</td></tr>\n";

	for (const TrenchCoat &trenchCoat: this->shoppingBasket) {
		fout << "<tr><td>" << std::to_string(trenchCoat.sizeGetter()) << "</td>" << "<td>" << trenchCoat.colourGetter()
			 << "</td>" << "<td>" << std::to_string(trenchCoat.priceGetter()) << "</td>" << "<td>"
			 << std::to_string(trenchCoat.quantityGetter()) << "</td>" << "<td><a href=\""
			 << trenchCoat.photographGetter() << "\">" << trenchCoat.photographGetter() << "</a></td>" << '\n';
	}
	fout << "</table></body></html>";
	fout.close();
}

std::string &UserRepositoryHTML::getFilename() {
	/// Getter for the filename where is being restored

	return this->userFilename;
}

int UserRepositoryHTML::findBySizeAndColourUser(int size, std::string colour) {
	/// Method to find an entity by size
	/// \param size - the size of the trench coat that we are searching for

	return UserRepository::findBySizeAndColourUser(size, colour);
}

/// Destructor
UserRepositoryHTML::~UserRepositoryHTML() = default;
