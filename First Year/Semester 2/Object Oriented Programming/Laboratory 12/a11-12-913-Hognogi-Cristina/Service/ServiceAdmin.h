#ifndef A11_12_913_HOGNOGI_CRISTINA_SERVICEADMIN_H
#define A11_12_913_HOGNOGI_CRISTINA_SERVICEADMIN_H

#pragma once
#include "../Repository/RepoAdmin.h"

class Service {
private:
	Repository &repository;

public:
	explicit Service(Repository &repository);

	std::vector<TrenchCoat> getAllService();

	unsigned int getNrElemsServ();
	unsigned int getCapServ();

	void addServ(int size, const std::string &colour, int price, int quantity, std::string photograph);
	void deleteServ(int size, const std::string &colour);
	void updateServ(int old_size, const std::string &old_colour, int new_size, const std::string &new_colour, int new_price, int new_quantity, const std::string &new_photograph);
};

#endif //A11_12_913_HOGNOGI_CRISTINA_SERVICEADMIN_H
