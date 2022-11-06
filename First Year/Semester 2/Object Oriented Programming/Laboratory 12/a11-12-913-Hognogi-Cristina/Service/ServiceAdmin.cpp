#include "ServiceAdmin.h"
#include <algorithm>

Service::Service(Repository &repository) : repository{repository} {
	/// Constructor for Service class
	/// \param repository - the admin repository
}

std::vector<TrenchCoat> Service::getAllService() {
	/// Method to get all the elements of the repository
	/// \return - the elements from the repository

	return this->repository.getAllRepo();
}

unsigned int Service::getNrElemsServ() {
	/// Method to get the number of elements from the repository
	/// \return - the number of elements from the repository

	return this->repository.getNrElems();
}

unsigned int Service::getCapServ() {
	/// Method to get the capacity of the repository
	/// \return - the capacity

	return this->repository.getCapacity();
}


void Service::addServ(int size, const std::string &colour, int price, int quantity, std::string photograph) {
	/// Method to add an element to the repository
	/// \param size - the size of the trench coat
	/// \param colour - the colour of the trench coat
	/// \param price - the price of the trench coat
	/// \param quantity - the quantity of the trench coat
	/// \param photograph - the link of the photograph of the trench coat
	/// \return - 1 if not added, 0 otherwise

	int length = this->repository.getNrElems();

	for (auto i: this->repository.getAllRepo()) {
		std::string other_colour = i.colourGetter();
		int other_size = i.sizeGetter();
		int other_price = i.priceGetter();
		const std::string other_photograph = i.photographGetter();

		if (other_colour == colour)
			price = other_price;

		if (other_colour == colour)
			photograph = other_photograph;
	}

	this->repository.addRepo(TrenchCoat(size, colour, price, quantity, photograph));
}

void Service::deleteServ(int size, const std::string &colour) {
	/// Method to delete an element from the repository
	/// \param size - the size of the trench coat to be deleted
	/// \param colour - the colour of the trench coat to be deleted
	/// \return - 1 if not deleted, 0 otherwise

	int delete_index = this->repository.findBySizeAndColour(size, colour);
	this->repository.deleteRepo(delete_index);
}

void
Service::updateServ(int old_size, const std::string &old_colour, int new_size, const std::string &new_colour,
					int new_price, int new_quantity, const std::string &new_photograph) {
	/// Method to update an element from the repository
	/// \param old_size - the old size of the trench coat
	/// \param old_colour - the old colour of the trench coat
	/// \param new_size - the new size of the trench coat
	/// \param new_colour - the new colour of the trench coat
	/// \param new_price - the new price of the trench coat
	/// \param new_quantity - the new quantity of the trench coat
	/// \param new_photograph - the new link of the photograph of the trench coat
	/// \return - 1 if not updated, 0 otherwise

	int update_index = this->repository.findBySizeAndColour(old_size, old_colour);
	TrenchCoat new_trench_coat = TrenchCoat(new_size, new_colour, new_price, new_quantity,
											new_photograph);
	this->repository.updateRepo(update_index, new_trench_coat);
}