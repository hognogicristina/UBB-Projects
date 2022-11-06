#ifndef A11_12_913_HOGNOGI_CRISTINA_GUI_H
#define A11_12_913_HOGNOGI_CRISTINA_GUI_H

#include "../Service/ServiceAdmin.h"
#include "../Service/ServiceUser.h"
#include "../Validator/Validator.h"

#include <QWidget>
#include <QLabel>
#include <QPushButton>
#include <QListWidget>
#include <QLineEdit>
#include <QRadioButton>

class TrenchCoatListModel : public QAbstractListModel {
private:
	Repository &repository;
public:
	explicit TrenchCoatListModel(Repository &repository1) : repository{repository1} {};

	int rowCount(const QModelIndex &parent = QModelIndex()) const override;
	QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;
};

class GUI : public QWidget {
	Q_OBJECT
private:
	Service &service;
	UserService &userService;
	TrenchCoatValidator &validator;
	Repository &repository;

	void initGUI();

	QLabel *titleWidget;
	QPushButton *adminButton;
	QPushButton *userButton;

	void showAdmin();
	void showUser();
	void connectSignalsAndSlots();

public:
	explicit GUI(Service &service1, UserService &userService1, TrenchCoatValidator &validator1, Repository &repository1);
	~GUI() override;
};

class AdminGUI : public QWidget {
	Q_OBJECT
private:
	Service &service;
	TrenchCoatValidator &validator;
	Repository &repository;

	void initAdminGUI();

	QLabel *titleWidget;
	QListWidget *trenchCoatListWidget;

	QLineEdit *sizeEdit;
	QLineEdit *colourEdit;
	QLineEdit *priceEdit;
	QLineEdit *quantityEdit;
	QLineEdit *photoEdit;

	QPushButton *addButton;
	QPushButton *deleteButton;
	QPushButton *updateButton;
	QPushButton *clearButton;

	TrenchCoatListModel *listModel;

	void populateList();
	void connectSignalsAndSlots();
	int getSelectedIndex() const;

	void addTrenchCoat();
	void deleteTrenchCoat();
	void updateTrenchCoat();
	void clearTrenchCoat();
public:
	explicit AdminGUI(QWidget *parent, Service &service1, TrenchCoatValidator &validator1, Repository &repository1);
	~AdminGUI() override;
};

class UserGUI : public QWidget {
	Q_OBJECT
private:
	TrenchCoat selectedTrenchCoat;
	std::vector<TrenchCoat> trenchCoat;

	Service &service;
	UserService &userService;
	TrenchCoatValidator &validator;
	Repository &repository;

	QLabel *titleWidget;
	QLabel *titleWidgetTrenchCoat;
	QLabel *titleWidgetFile;

	QListWidget *trenchCoatListWidget;
	QListWidget *shoppingBasketListWidget;

	QLineEdit *sizeEdit;
	QLineEdit *colourEdit;
	QLineEdit *priceEdit;
	QLineEdit *quantityEdit;
	QLineEdit *photoEdit;
	QLineEdit *sizeFilterEdit;

	QPushButton *addButton;
	QPushButton *nextButton;
	QPushButton *filterButton;
	QPushButton *clearButton;
	QPushButton *openListButton;

	QRadioButton *csvButton;
	QRadioButton *htmlButton;

	bool repoTypeSelected;
	bool filtered;

	void initUserGUI();

	void populateTrenchCoatList();
	void populateShoppingBasketList();

	void connectSignalsAndSlots();
	int getSelectedIndex() const;

	void addTrenchCoat();
	void nextTrenchCoat();
	void filterTrenchCoats();
	void clearTrenchCoat();

public:
	explicit UserGUI(QWidget *parent, Service &service1, UserService &userService1, TrenchCoatValidator &validator1,
					 Repository &repository1);
	~UserGUI() override;
};


#endif //A11_12_913_HOGNOGI_CRISTINA_GUI_H
