#ifndef A11_12_913_HOGNOGI_CRISTINA_REPOUSERCSV_H
#define A11_12_913_HOGNOGI_CRISTINA_REPOUSERCSV_H

#include "../Repository/RepoUser.h"

class UserRepositoryCSV: public UserRepository {
public:
	UserRepositoryCSV(const std::vector<TrenchCoat> &shoppingBasket, const std::string &userFilename);

	std::vector<TrenchCoat> &getAllUserRepo() override;
	unsigned int getNrElems() override;
	unsigned int getCap() override;

	void addUserRepo(const TrenchCoat &trenchCoat) override;
	void updateUserRepo(const TrenchCoat &trenchCoat, int idx) override;

	void writeToFile() override;
	std::string &getFilename() override;

	int findBySizeAndColourUser(int size, std::string colour) override;

	~UserRepositoryCSV();
};

#endif //A11_12_913_HOGNOGI_CRISTINA_REPOUSERCSV_H
