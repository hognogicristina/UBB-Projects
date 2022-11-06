#ifndef A14_913_HOGNOGI_CRISTINA_SERVICEADMIN_H
#define A14_913_HOGNOGI_CRISTINA_SERVICEADMIN_H

#pragma once
#include "../Repository/RepoAdmin.h"
#include "../UndoRedo/UndoRedo.h"
#include <memory>

class Service {
private:
	Repository &repository;
	std::vector<std::shared_ptr<UndoRedo>> undoAdmin;
	std::vector<std::shared_ptr<UndoRedo>> redoAdmin;

public:
	explicit Service(Repository &repository);

	std::vector<TrenchCoat> getAllService();

	unsigned int getNrElemsServ();
	unsigned int getCapServ();

	void addServ(int size, const std::string &colour, int price, int quantity, std::string photograph);
	void deleteServ(int size, const std::string &colour);
	void
	updateServ(int old_size, const std::string &old_colour, int new_size, const std::string &new_colour, int new_price,
			   int new_quantity, const std::string &new_photograph);

	void undoLastAction();
	void redoLastAction();
	void clearUndoRedo();

	~Service();
};

#endif //A14_913_HOGNOGI_CRISTINA_SERVICEADMIN_H
