#include "ServiceUser.h"
#include <string>
#include <algorithm>

UserService::UserService(Repository &repository1, UserRepository *userRepository1) : repository{repository1} {
	this->userRepository = userRepository1;
	this->repoTypeSelected = false;
	/// Constructor for the UserService class
	/// \param repository1 - the admin repository
	/// \param userRepository1 - the user repository
}

UserService::UserService(Repository &repository1) : repository(repository1) {
	this->repoTypeSelected = false;
	/// Constructor for the UserService class
	/// \param repository1 - the admin repository
}

std::vector<TrenchCoat> UserService::getAllUserService() {
	/// Method to get all the elements from the user repository
	/// \return - the elements from the user repository

	if (this->userRepository->getAllUserRepo().empty()) {
		std::string error;
		error += std::string("The shopping list is empty!");

		if (!error.empty())
			throw UserException(error);
	}

	return this->userRepository->getAllUserRepo();
}

int UserService::getNrElemsUserService() {
	/// Method to get the number of elements from the user repository
	/// \return - the number of elements

	if (this->userRepository->getAllUserRepo().empty()) {
		std::string error;
		error += std::string("The shopping list is empty!");

		if (!error.empty())
			throw UserException(error);
	}

	return this->userRepository->getNrElems();
}

void UserService::addUserService(TrenchCoat trenchCoat, int &sum_price) {
	/// Method to add a new trench coat to the user repository
	/// \param trenchCoat - the trenchCoat to be added
	/// \param sum_price - the sum of the total price the user is having in the shopping basket

	int size = trenchCoat.sizeGetter();
	int price = trenchCoat.priceGetter();
	std::string colour = trenchCoat.colourGetter();

	int delete_index = this->repository.findBySizeAndColour(size, colour);

	if (delete_index != -1) {
		sum_price = sum_price + price;
	}

	if (this->repository.getAllRepo()[delete_index].quantityGetter() != 0) {
		int new_quantity1 = this->repository.getAllRepo()[delete_index].quantityGetter() - 1;

		TrenchCoat trenchCoat1 = TrenchCoat(this->repository.getAllRepo()[delete_index].sizeGetter(),
											this->repository.getAllRepo()[delete_index].colourGetter(),
											this->repository.getAllRepo()[delete_index].priceGetter(), new_quantity1,
											this->repository.getAllRepo()[delete_index].photographGetter());

		this->repository.updateRepo(delete_index, trenchCoat1);
		this->userRepository->addUserRepo(trenchCoat1);

		if (new_quantity1 == 0)
			this->repository.deleteRepo(delete_index);
	}
}


void
UserService::updateUserServ(int new_size, std::string new_colour, int new_price, int new_quantity,
							std::string new_photograph,
							int idx) {
	/// Method to update an element from the repository
	/// \param new_size - the new size of the trench coat
	/// \param new_colour - the new colour of the trench coat
	/// \param new_price - the new price of the trench coat
	/// \param new_quantity - the new quantity of the trench coat
	/// \param new_photograph - the new link of the photograph of the trench coat

	if (idx != -1) {
		TrenchCoat trenchCoat = TrenchCoat(new_size, new_colour, new_price, new_quantity, new_photograph);
		this->userRepository->updateUserRepo(trenchCoat, idx);
	}
}

int UserService::checkExiCoat(int size, std::string colour) {
	/// Method to check list of trench coats based on their size and colour existens
	/// \param size -  the size
	/// \param colour - the colour
	/// \return - the element who have been found, otherwise -1

	int j = 0;
	for (auto i: this->userRepository->getAllUserRepo()) {
		if (size == i.sizeGetter() && colour == i.colourGetter())
			return j;
		++j;
	}

	return -1;
}

int UserService::countNrCoatsFilt(int size) {
	/// Counts the number of trench coats having a given size
	/// \param size - the size given to check against
	/// \return - the total quantity of trench coats found with the given size

	int cnt = 0;
	for (auto i: this->repository.getAllRepo()) {
		if (i.sizeGetter() == size)
			cnt += i.quantityGetter();
	}

	return cnt;
}

std::string &UserService::getFileService() {
	/// Function to get the file to service

	return this->userRepository->getFilename();
}

void UserService::repositoryType(const std::string &fileType) {
	/// Function to set the file type for repository
	/// \param fileType - choose the type of the file
	std::vector<TrenchCoat> userVector;
	std::string userFile;

	if (fileType == "CSV") {
		userFile = R"(C:\Users\hogno\Documents\Fukulta\C++\OOP\a11-12-913-Hognogi-Cristina\shoppingBasket.csv)";

		if (!this->repoTypeSelected) {
			this->repoTypeSelected = true;
		} else {
			userVector = this->getAllUserService();
		}

		auto *repo = new UserRepositoryCSV{userVector, userFile};
		this->userRepository = repo;
		this->userRepository->writeToFile();

	} else if (fileType == "HTML") {
		userFile = R"(C:\Users\hogno\Documents\Fukulta\C++\OOP\a11-12-913-Hognogi-Cristina\shoppingBasket.html)";

		if (!this->repoTypeSelected) {
			this->repoTypeSelected = true;
		} else {
			userVector = this->getAllUserService();
		}

		auto *repo = new UserRepositoryHTML{userVector, userFile};
		this->userRepository = repo;
		this->userRepository->writeToFile();

	} else {
		std::string error;
		error += std::string("The filename is invalid!\n");
		if (!error.empty())
			throw UserException(error);
	}
}

void UserService::listFiltered(const std::string &size_str, std::vector<TrenchCoat> &filt) {
	std::vector<TrenchCoat> d{}, v = this->repository.getAllRepo();
	if (size_str == "Null") {
		for (auto i: this->repository.getAllRepo()) {
			d.push_back(i);
		}
	} else {
		int size = stoi(size_str);
		std::copy_if(v.begin(), v.end(), std::back_inserter(d), [&size](TrenchCoat &trenchCoat) {
			return ((trenchCoat.sizeGetter() == size));
		});
	}
	filt = d;
}