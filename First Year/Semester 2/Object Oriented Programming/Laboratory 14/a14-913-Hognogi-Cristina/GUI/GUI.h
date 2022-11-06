#ifndef A14_913_HOGNOGI_CRISTINA_GUI_H
#define A14_913_HOGNOGI_CRISTINA_GUI_H

#include "../Service/ServiceAdmin.h"
#include "../Service/ServiceUser.h"
#include "../Validator/Validator.h"
#include "../TableView/TableView.h"

#include <QWidget>
#include <QLabel>
#include <QPushButton>
#include <QListWidget>
#include <QLineEdit>
#include <QTextEdit>
#include <QRadioButton>
#include <QShortcut>
#include <QTableView>
#include <QGridLayout>
#include <QHeaderView>

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
	QPushButton *undoButton;
	QPushButton *redoButton;

	QShortcut *shortcutUndo;
	QShortcut *shortcutRedo;

	void populateList();
	void connectSignalsAndSlots();
	int getSelectedIndex() const;

	void addTrenchCoat();
	void deleteTrenchCoat();
	void updateTrenchCoat();
	void clearTrenchCoat();

	void undoGUI();
	void redoGUI();
public:
	explicit AdminGUI(QWidget *parent, Service &service1, TrenchCoatValidator &validator1, Repository &repository1);
	~AdminGUI() override;
};

class UserGUI : public QWidget {
	Q_OBJECT
private:
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
	QPushButton *openTable;

	QRadioButton *csvButton;
	QRadioButton *htmlButton;

	TableView *shoppingBasketTableModel;

	bool repoTypeSelected;
	bool filtered;

	void initUserGUI();
	void createTable();

	void connectSignalsAndSlots();

	void populateTrenchCoatList();
	void populateShoppingBasketList();
	void populateShoppingBasketTable();

	int getSelectedIndex() const;
	void nextTrenchCoat();

	void addTrenchCoat();
	void filterTrenchCoats();
	void clearTrenchCoat();
public:
	explicit UserGUI(QWidget *parent, Service &service1, UserService &userService1, TrenchCoatValidator &validator1,
					 Repository &repository1);
	~UserGUI() override;
};

class TrenchCoatListModel : public QAbstractListModel {
private:
	Repository &repository;
public:
	explicit TrenchCoatListModel(Repository &repository1) : repository{repository1} {};

	int rowCount(const QModelIndex &parent = QModelIndex()) const override;
	QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;
};

#endif //A14_913_HOGNOGI_CRISTINA_GUI_H
