#include "RepoUser.h"

UserException::UserException(std::string &_message) : message(_message) {
	/// Constructor for the UserException class
	/// \param message - the message to be shown
}

const char *UserException::what() const noexcept {
	/// Call exception for the validator class

	return message.c_str();
}

UserRepository::UserRepository(std::vector<TrenchCoat> &shoppingBasket1) {
	/// Constructor for the UserRepository class
	/// \param shoppingBasket1 - the list of trench coats that the user is buying

	this->shoppingBasket = shoppingBasket1;
}

void UserRepository::updateUserRepo(const TrenchCoat &trenchCoat, int idx) {
	/// Method to update an entity based on its index with a new entity
	/// \param trenchCoat - the new trench coat with which the update is done
	/// \param idx - the index of the trench coat to be updated

	this->shoppingBasket[idx] = trenchCoat;
}

int UserRepository::findBySizeAndColourUser(int size, std::string colour) {
	/// Method to find an entity by size
	/// \param size - the size of the trench coat that we are searching for

	int j = 0;
	for (auto i: this->shoppingBasket) {
		if (size == i.sizeGetter() && colour == i.colourGetter()) {
			return j;
		}
		++j;
	}

	return -1;
}

/// Destructor
UserRepository::~UserRepository() = default;
