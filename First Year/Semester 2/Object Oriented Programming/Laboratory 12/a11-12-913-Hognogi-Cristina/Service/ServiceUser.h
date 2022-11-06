#ifndef A11_12_913_HOGNOGI_CRISTINA_SERVICEUSER_H
#define A11_12_913_HOGNOGI_CRISTINA_SERVICEUSER_H

#pragma once

#include "../Repository/RepoUser.h"
#include "../Repository/RepoAdmin.h"
#include "../Repository/RepoUserCSV.h"
#include "../Repository/RepoUserHTML.h"

class UserService {
private:
	Repository &repository;
	UserRepository *userRepository;
	bool repoTypeSelected;
public:
	UserService(Repository &repository1, UserRepository *userRepository1);
	explicit UserService(Repository &repository1);

	std::vector<TrenchCoat> getAllUserService();
	int getNrElemsUserService();

	void addUserService(TrenchCoat trenchCoat, int &sum_price);
	void
	updateUserServ(int new_size, std::string new_colour, int new_price, int new_quantity, std::string new_photograph,
				   int idx);

	int checkExiCoat(int size, std::string colour);
	int countNrCoatsFilt(int size);
	void repositoryType(const std::string &fileType);

	std::string &getFileService();

	void listFiltered(const std::string &size_str, std::vector<TrenchCoat> &filt);
};

#endif //A11_12_913_HOGNOGI_CRISTINA_SERVICEUSER_H