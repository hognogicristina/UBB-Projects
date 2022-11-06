#include "RepoAdmin.h"
#include <algorithm>
#include <fstream>
#include <iostream>

RepositoryException::RepositoryException(std::string &messageExc) : message(messageExc) {
	/// Constructor for the RepositoryException class
	/// \param message - the message to be shown
}

const char *RepositoryException::what() const noexcept {
	/// Call exception for the validator class

	return message.c_str();
}

void Repository::loadTrenchCoatsFromFile() {
	/// Function to load trench coats from file

	if (!this->trenchCoatFilename.empty()) {
		TrenchCoat trenchCoatFromFile;
		std::ifstream fin(this->trenchCoatFilename);

		while (fin >> trenchCoatFromFile) {
			if (std::find(this->adminRepository.begin(), this->adminRepository.end(), trenchCoatFromFile) ==
				this->adminRepository.end())
				this->adminRepository.push_back(trenchCoatFromFile);
		}

		fin.close();
	}
}

void Repository::writeTrenchCoatsToFile() {
	/// Function to write trench coats to file

	if (!this->trenchCoatFilename.empty()) {
		std::ofstream fout(this->trenchCoatFilename);

		for (auto trenchCoat: this->adminRepository) {
			fout << trenchCoat << "\n";
		}

		fout.close();
	}
}

Repository::Repository(std::vector<TrenchCoat> &adminRepository, std::string &trenchCoatFilename) {
	/// Constructor for the Repository class
	/// \param adminRepository - the dynamic array in which the trench coats will be stored

	this->adminRepository = adminRepository;
	this->trenchCoatFilename = trenchCoatFilename;
}

void Repository::initialiseRepo() {
	/// Method to initialise the repository with a number of entities

	this->loadTrenchCoatsFromFile();
}

std::vector<TrenchCoat> &Repository::getAllRepo() {
	/// Method to get all the elements of the repository
	/// \return - the array of elements

	if (this->adminRepository.empty()) {
		std::string error;
		error += std::string("The database is empty!\n");

		if (!error.empty())
			throw RepositoryException(error);
	}

	return this->adminRepository;
}

int Repository::getNrElems() {
	/// Method to get the number of elements in the repository
	/// \return - the number of elements

	if (this->adminRepository.empty()) {
		std::string error;
		error += std::string("The database is empty!\n");

		if (!error.empty())
			throw RepositoryException(error);

	}

	return this->adminRepository.size();
}

int Repository::getCapacity() {
	/// Method to get the capacity of the repository
	/// \return - the capacity

	return this->adminRepository.capacity();
}

void Repository::addRepo(const TrenchCoat &trenchCoat) {
	/// Method to add an element to the repository
	/// \param trench_coat - the entity to be added

	int existing = this->findBySizeAndColour(trenchCoat.sizeGetter(), trenchCoat.colourGetter());

	if (existing != -1) {
		std::string error;
		error += std::string("The trench coat already exists!\n");

		if (!error.empty())
			throw RepositoryException(error);
	}

	this->adminRepository.push_back(trenchCoat);
	this->writeTrenchCoatsToFile();
}


int Repository::findByColour(std::string colour) {
	/// Method to find an entity by colour
	/// \param colour - the colour of the trench coat that we are searching for

	int searched_index = -1;
	std::vector<TrenchCoat>::iterator it;
	it = std::find_if(this->adminRepository.begin(), this->adminRepository.end(),
					  [&colour](TrenchCoat &trenchCoat) { return trenchCoat.colourGetter() == colour; });

	if (it != this->adminRepository.end()) {
		searched_index = it - this->adminRepository.begin();
	}

	return searched_index;
}

int Repository::findBySize(int size) {
	/// Method to find an entity by size
	/// \param size - the size of the trench coat that we are searching for

	int searched_index = -1;
	std::vector<TrenchCoat>::iterator it;
	it = std::copy_if(this->adminRepository.begin(), this->adminRepository.end(), this->adminRepository.begin(),
					  [&size](TrenchCoat coat) { return coat.sizeGetter() == size; });

	if (it != this->adminRepository.end()) {
		searched_index = it - this->adminRepository.begin();
	}

	return searched_index;
}


int Repository::findBySizeAndColour(int size, std::string colour) {
	/// Method to find an entity by size and colour
	/// \param size - the size of the trench coat that we are searching for
	/// \param colour - the colour of the trench coat that we are searching for

	int j = 0;
	for (auto &i: this->adminRepository) {
		if (size == i.sizeGetter() && colour == i.colourGetter()) {
			return j;
		}
		++j;
	}

	return -1;
}

void Repository::deleteRepo(int delete_index) {
	/// Method to delete an entity based on its index
	/// \param delete_index - the index of the trench coat to be deleted

	if (delete_index == -1) {
		std::string error;
		error += std::string("The trench coat does not exist!\n");

		if (!error.empty())
			throw RepositoryException(error);
	}

	this->adminRepository.erase(this->adminRepository.begin() + delete_index);
	this->writeTrenchCoatsToFile();
}

void Repository::updateRepo(int update_index, const TrenchCoat &newTrenchCoat) {
	/// Method to update an entity based on its index with a new entity
	/// \param update_index - the index of the trench coat to be updated
	/// \param new_trench_coat - the new trench coat with which the update is done

	if (update_index == -1) {
		std::string error;
		error += std::string("The trench coat does not exist!\n");

		if (!error.empty())
			throw RepositoryException(error);
	}

	this->adminRepository[update_index] = newTrenchCoat;
	this->writeTrenchCoatsToFile();
}

void Repository::updateExiRepo(int update_index, TrenchCoat trenchCoat) {
	/// Update a trench that already exists
	/// \param update_index - the index of the trench coat to be updated
	/// \param trench_coat - the trench coat with which the update is done

	this->adminRepository[update_index] = trenchCoat;
	this->writeTrenchCoatsToFile();
}


