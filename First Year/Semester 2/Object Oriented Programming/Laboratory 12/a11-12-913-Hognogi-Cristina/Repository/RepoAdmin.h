#ifndef A11_12_913_HOGNOGI_CRISTINA_REPOADMIN_H
#define A11_12_913_HOGNOGI_CRISTINA_REPOADMIN_H

#pragma once
#include <vector>
#include "../Domain/Domain.h"

class Repository {
private:
	std::vector<TrenchCoat> adminRepository{};
	std::string trenchCoatFilename;
public:
	void loadTrenchCoatsFromFile();
	void writeTrenchCoatsToFile();

	explicit Repository(std::vector<TrenchCoat>& adminRepository, std::string& trenchCoatFilename);

	void initialiseRepo();
	std::vector<TrenchCoat> &getAllRepo();

	int getNrElems();
	int getCapacity();

	void addRepo(const TrenchCoat& trenchCoat);

	int findByColour(std::string colour);
	int findBySize(int size);
	int findBySizeAndColour(int size, std::string colour);

	void deleteRepo(int delete_index);
	void updateRepo(int update_index, const TrenchCoat& newTrenchCoat);

	void updateExiRepo(int update_index, TrenchCoat trenchCoat);
};

class RepositoryException : public std::exception {
private:
	std::string message;
public:
	explicit RepositoryException(std::string &messageExc);
	const char *what() const noexcept override;
};

#endif //A11_12_913_HOGNOGI_CRISTINA_REPOADMIN_H
