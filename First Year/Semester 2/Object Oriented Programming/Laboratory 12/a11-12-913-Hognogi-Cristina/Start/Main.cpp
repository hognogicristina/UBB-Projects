#include "../GUI/GUI.h"

#include <vector>
#include <QApplication>
#include <QGradient>
#include <iostream>

int main(int argc, char *argv[]) {
	QApplication application(argc, argv);

	std::vector<TrenchCoat> dynamicArray;
	dynamicArray.reserve(10);
	std::string filename = "../trenchCoat.txt";

	Repository repo{dynamicArray, filename};
	repo.initialiseRepo();
	Service service{repo};

	UserService userService{repo};
	TrenchCoatValidator validator{};

	GUI gui{service, userService, validator, repo};

	gui.setWindowTitle(QString("Trench Coat Shop"));
	gui.resize(1300, 700);

	gui.show();
	return QApplication::exec();
}