#include "GUI.h"

#include <QVBoxLayout>
#include <QFormLayout>
#include <QErrorMessage>
#include <QMessageBox>

GUI::GUI(Service &service1, UserService &userService1, TrenchCoatValidator &validator1, Repository &repository1)
		: service{service1}, userService{userService1}, validator{validator1}, repository{repository1} {

	this->titleWidget = new QLabel(this);
	this->adminButton = new QPushButton(this);
	this->userButton = new QPushButton(this);

	this->initGUI();
	this->connectSignalsAndSlots();
}

void GUI::initGUI() {
	QHBoxLayout * layout = new QHBoxLayout{this};

	QString style = "background-color: azure";
	this->setStyleSheet(style);

	QFont titleFont = this->titleWidget->font();
	this->titleWidget->setText(
			"<p style='text-align:center'><font color=#4D2D52>Welcome to the Trench Coat shop! <br> Select your mode!</font></p>");

	titleFont.setItalic(true);
	titleFont.setPointSize(15);
	titleFont.setStyleHint(QFont::System);
	titleFont.setWeight(static_cast<QFont::Weight>(70));

	this->titleWidget->setFont(titleFont);
	layout->addWidget(this->titleWidget);

	this->adminButton->setText("ADMIN MODE");
	layout->addWidget(this->adminButton);

	QString linearGradient = QString(
			"qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(51, 102, 255, 255), stop:1 rgba(255, 128, 128, 255));");
	this->adminButton->setStyleSheet(QString("background-color: %1").arg(linearGradient));

	this->userButton->setText("USER MODE");
	layout->addWidget(this->userButton);

	QString linearGradient2 = QString(
			"qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:1 rgba(51, 102, 255, 255), stop:0 rgba(255, 128, 128, 255));");
	this->userButton->setStyleSheet(QString("background-color: %1").arg(linearGradient2));
}

GUI::~GUI() = default;

void GUI::connectSignalsAndSlots() {
	QObject::connect(this->adminButton, &QPushButton::clicked, this, &GUI::showAdmin);
	QObject::connect(this->userButton, &QPushButton::clicked, this, &GUI::showUser);
}

void GUI::showAdmin() {
	AdminGUI *admin = new AdminGUI{this, this->service, this->validator, this->repository};
	admin->resize(1300, 700);
	admin->setWindowTitle(QString("Admin Mode"));
	admin->show();
}

AdminGUI::AdminGUI(QWidget *parent, Service &service1, TrenchCoatValidator &validator1, Repository &repository1)
		: service{service1}, validator{validator1}, repository{repository1} {

	this->titleWidget = new QLabel(this);

	this->sizeEdit = new QLineEdit{};
	this->colourEdit = new QLineEdit{};
	this->priceEdit = new QLineEdit{};
	this->quantityEdit = new QLineEdit{};
	this->photoEdit = new QLineEdit{};

	QFont f{"Verdana", 12};

	this->addButton = new QPushButton("ADD");
	this->addButton->setFont(f);

	this->deleteButton = new QPushButton("REMOVE");
	this->deleteButton->setFont(f);

	this->updateButton = new QPushButton("UPDATE");
	this->updateButton->setFont(f);

	this->clearButton = new QPushButton("CLEAR ALL");
	this->clearButton->setFont(f);

	setParent(parent);
	setWindowFlag(Qt::Window);

	this->initAdminGUI();
	this->populateList();
	this->connectSignalsAndSlots();

	this->listModel = new TrenchCoatListModel{this->repository};
}

void AdminGUI::initAdminGUI() {
	QHBoxLayout * layout = new QHBoxLayout{this};

	QFont titleFont = this->titleWidget->font();
	this->titleWidget->setText("<p style='text-align:center'><font color=#4D2D52>ADMIN MODE</font></p>");

	this->trenchCoatListWidget = new QListWidget{};
	this->trenchCoatListWidget->setSelectionMode(QAbstractItemView::SingleSelection);

	titleFont.setItalic(true);
	titleFont.setPointSize(15);
	titleFont.setStyleHint(QFont::System);
	titleFont.setWeight(static_cast<QFont::Weight>(70));

	this->titleWidget->setFont(titleFont);
	layout->addWidget(this->titleWidget);

	trenchCoatListWidget->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");
	layout->addWidget(this->trenchCoatListWidget);

	QWidget * formLayout = new QWidget{};
	QFormLayout * trenchCoatLayout = new QFormLayout{formLayout};

	QFont f{"Verdana", 12};

	QLabel *sizeLabel = new QLabel{"&Size:"};
	sizeLabel->setBuddy(this->sizeEdit);
	sizeEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *colourLabel = new QLabel{"&Colour:"};
	colourLabel->setBuddy(this->colourEdit);
	colourEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *priceLabel = new QLabel{"&Price:"};
	priceLabel->setBuddy(this->priceEdit);
	priceEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *quantityLabel = new QLabel{"&Quantity:"};
	quantityLabel->setBuddy(this->quantityEdit);
	quantityEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *photoLabel = new QLabel{"&Photograph:"};
	photoLabel->setBuddy(this->photoEdit);
	photoEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	sizeLabel->setFont(f);
	colourLabel->setFont(f);
	priceLabel->setFont(f);
	quantityLabel->setFont(f);
	photoLabel->setFont(f);

	this->sizeEdit->setFont(f);
	this->colourEdit->setFont(f);
	this->priceEdit->setFont(f);
	this->quantityEdit->setFont(f);
	this->photoEdit->setFont(f);

	trenchCoatLayout->addRow(sizeLabel, this->sizeEdit);
	trenchCoatLayout->addRow(colourLabel, this->colourEdit);
	trenchCoatLayout->addRow(priceLabel, this->priceEdit);
	trenchCoatLayout->addRow(quantityLabel, this->quantityEdit);
	trenchCoatLayout->addRow(photoLabel, this->photoEdit);

	layout->addWidget(formLayout);

	QWidget * buttonsWidget = new QWidget{};
	QGridLayout * gridLayout = new QGridLayout{buttonsWidget};

	gridLayout->addWidget(this->addButton, 0, 0);
	addButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	gridLayout->addWidget(this->deleteButton, 0, 1);
	deleteButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	gridLayout->addWidget(this->updateButton, 0, 2);
	updateButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	gridLayout->addWidget(this->clearButton, 1, 0);
	clearButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	layout->addWidget(buttonsWidget);
}

void AdminGUI::populateList() {
	this->trenchCoatListWidget->clear();
	std::vector<TrenchCoat> allTrenchCoat = this->service.getAllService();

	for (TrenchCoat &trenchCoat: allTrenchCoat)
		this->trenchCoatListWidget->addItem(QString::fromStdString(trenchCoat.toStringGUI()));
}

void AdminGUI::connectSignalsAndSlots() {
	QObject::connect(this->trenchCoatListWidget, &QListWidget::itemSelectionChanged, [this]() {
		int selectedIndex = this->getSelectedIndex();
		if (selectedIndex < 0)
			return;

		TrenchCoat trenchCoat = this->service.getAllService()[selectedIndex];
		this->sizeEdit->setText(QString::fromStdString(std::to_string(trenchCoat.sizeGetter())));
		this->colourEdit->setText(QString::fromStdString(trenchCoat.colourGetter()));
		this->priceEdit->setText(QString::fromStdString(std::to_string(trenchCoat.priceGetter())));
		this->quantityEdit->setText(QString::fromStdString(std::to_string(trenchCoat.quantityGetter())));
		this->photoEdit->setText(QString::fromStdString(trenchCoat.photographGetter()));
	});

	QObject::connect(this->addButton, &QPushButton::clicked, this, &AdminGUI::addTrenchCoat);
	QObject::connect(this->deleteButton, &QPushButton::clicked, this, &AdminGUI::deleteTrenchCoat);
	QObject::connect(this->updateButton, &QPushButton::clicked, this, &AdminGUI::updateTrenchCoat);
	QObject::connect(this->clearButton, &QPushButton::clicked, this, &AdminGUI::clearTrenchCoat);
}

void AdminGUI::addTrenchCoat() {
	std::string size_str = this->sizeEdit->text().toStdString();
	std::string colour = this->colourEdit->text().toStdString();
	std::string price_str = this->priceEdit->text().toStdString();
	std::string quantity_str = this->quantityEdit->text().toStdString();
	std::string photograph = this->photoEdit->text().toStdString();

	int size, price, quantity;

	try {
		this->validator.validateSizeString(size_str);
		size = std::stoi(size_str);
		this->validator.validateSize(size);

		this->validator.validateColour(colour);

		this->validator.validatePriceString(price_str);
		price = stoi(price_str);
		this->validator.validatePrice(price);

		this->validator.validateQuantityString(quantity_str);
		quantity = stoi(quantity_str);
		this->validator.validateQuantity(quantity);

		this->validator.validatePhotoLink(photograph);

		this->service.addServ(size, colour, price, quantity, photograph);
		this->populateList();

	} catch (ValidationException &exc) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(exc.what());
		error->setWindowTitle("Invalid input!");
		error->exec();

	} catch (RepositoryException &re) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(re.what());
		error->setWindowTitle("Error at adding the trench coat!");
		error->exec();
	}
}

void AdminGUI::deleteTrenchCoat() {
	try {
		std::string size_str = this->sizeEdit->text().toStdString();
		std::string colour = this->colourEdit->text().toStdString();

		this->validator.validateSizeString(size_str);
		int size = std::stoi(size_str);
		this->validator.validateSize(size);

		this->validator.validateColour(colour);

		this->service.deleteServ(size, colour);
		this->populateList();

	} catch (ValidationException &exc) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(exc.what());
		error->setWindowTitle("Invalid input!");
		error->exec();

	} catch (RepositoryException &re) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(re.what());
		error->setWindowTitle("Error at deleting the trench coat!");
		error->exec();
	}
}

void AdminGUI::updateTrenchCoat() {
	int index = this->getSelectedIndex();

	try {
		if (index < 0) {
			QMessageBox *error = new QMessageBox{};
			error->setIcon(QMessageBox::Critical);
			error->setText("No trench coat selected!");
			error->setWindowTitle("Selection error!");
			error->exec();
		} else {
			int old_size = this->service.getAllService()[index].sizeGetter();
			std::string old_colour = this->service.getAllService()[index].colourGetter();

			this->validator.validateSize(old_size);

			this->validator.validateColour(old_colour);

			std::string new_size_str = this->sizeEdit->text().toStdString();
			std::string new_colour = this->colourEdit->text().toStdString();
			std::string new_price_str = this->priceEdit->text().toStdString();
			std::string new_quantity_str = this->quantityEdit->text().toStdString();
			std::string new_photograph = this->photoEdit->text().toStdString();

			this->validator.validateSizeString(new_size_str);
			int new_size = std::stoi(new_size_str);
			this->validator.validateSize(new_size);

			this->validator.validateColour(new_colour);

			this->validator.validatePriceString(new_price_str);
			int new_price = stoi(new_price_str);
			this->validator.validatePrice(new_price);

			this->validator.validateQuantityString(new_quantity_str);
			int new_quantity = stoi(new_quantity_str);
			this->validator.validateQuantity(new_quantity);

			this->validator.validatePhotoLink(new_photograph);

			this->service.updateServ(old_size, old_colour, new_size, new_colour, new_price, new_quantity,
									 new_photograph);
			this->populateList();
		}
	} catch (ValidationException &exc) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(exc.what());
		error->setWindowTitle("Invalid input!");
		error->exec();

	} catch (RepositoryException &re) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(re.what());
		error->setWindowTitle("Error at updating the trench coat!");
		error->exec();
	}
}

void AdminGUI::clearTrenchCoat() {
	this->sizeEdit->clear();
	this->colourEdit->clear();
	this->priceEdit->clear();
	this->quantityEdit->clear();
	this->photoEdit->clear();
}

int AdminGUI::getSelectedIndex() const {
	QModelIndexList selectedIndexes = this->trenchCoatListWidget->selectionModel()->selectedIndexes();
	if (selectedIndexes.empty()) {
		this->sizeEdit->clear();
		this->colourEdit->clear();
		this->priceEdit->clear();
		this->quantityEdit->clear();
		this->photoEdit->clear();

		return -1;
	}
	int selectedIndex = selectedIndexes.at(0).row();
	return selectedIndex;
}

AdminGUI::~AdminGUI() = default;

void GUI::showUser() {
	UserGUI *user = new UserGUI{this, this->service, this->userService, this->validator, this->repository};
	user->resize(1300, 700);
	user->setWindowTitle(QString("User Mode"));
	user->show();
}

UserGUI::UserGUI(QWidget *parent, Service &service1, UserService &userService1, TrenchCoatValidator &validator1,
				 Repository &repository1)
		: service{service1}, userService{userService1}, validator{validator1}, repository{repository1} {

	this->titleWidget = new QLabel(this);
	this->titleWidgetTrenchCoat = new QLabel(this);
	this->titleWidgetFile = new QLabel(this);

	this->trenchCoatListWidget = new QListWidget{};
	this->shoppingBasketListWidget = new QListWidget{};

	this->sizeEdit = new QLineEdit{};
	this->colourEdit = new QLineEdit{};
	this->priceEdit = new QLineEdit{};
	this->quantityEdit = new QLineEdit{};
	this->photoEdit = new QLineEdit{};
	this->sizeFilterEdit = new QLineEdit{};

	this->addButton = new QPushButton("Add to the shopping basket list");
	this->nextButton = new QPushButton("Next trench coat");
	this->filterButton = new QPushButton("Filter by size");
	this->openListButton = new QPushButton("Open file");
	this->clearButton = new QPushButton("Clear all");

	this->csvButton = new QRadioButton("CSV");
	this->htmlButton = new QRadioButton("HTML");

	this->repoTypeSelected = false;
	this->filtered = false;

	setParent(parent);
	setWindowFlag(Qt::Window);

	this->initUserGUI();
	this->populateTrenchCoatList();
	this->connectSignalsAndSlots();
}

void UserGUI::initUserGUI() {
	QVBoxLayout * layout = new QVBoxLayout{this};

	QFont titleFont = this->titleWidget->font();
	this->titleWidget->setText(
			"<p style='text-align:center'><font color=#4D2D52>Select the type of file you want for saving your shopping basket!</font></p>");

	titleFont.setItalic(true);
	titleFont.setPointSize(10);
	titleFont.setStyleHint(QFont::System);
	titleFont.setWeight(static_cast<QFont::Weight>(70));

	this->titleWidget->setFont(titleFont);
	layout->addWidget(this->titleWidget);

	QGridLayout * radioButtonsLayout = new QGridLayout{this};
	radioButtonsLayout->addWidget(this->csvButton, 0, 0);
	csvButton->setStyleSheet("font-size: 15px; height: 25px; width: 120px;");

	radioButtonsLayout->addWidget(this->htmlButton, 1, 0);
	htmlButton->setStyleSheet("font-size: 15px; height: 25px; width: 120px;");

	radioButtonsLayout->addWidget(this->openListButton, 0, 1);
	openListButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	layout->addLayout(radioButtonsLayout);

	QFont titleFontTrenchCoat = this->titleWidgetTrenchCoat->font();
	this->titleWidgetTrenchCoat->setText(
			"<p style='text-align:left'><font color=#4D2D52>Trench coat list!</font></p>");

	titleFontTrenchCoat.setItalic(true);
	titleFontTrenchCoat.setPointSize(10);
	titleFontTrenchCoat.setStyleHint(QFont::System);
	titleFontTrenchCoat.setWeight(static_cast<QFont::Weight>(70));

	this->titleWidgetTrenchCoat->setFont(titleFontTrenchCoat);
	layout->addWidget(this->titleWidgetTrenchCoat);

	QFont titleFontFile = this->titleWidget->font();
	this->titleWidgetFile->setText(
			"<p style='text-align:right'><font color=#4D2D52>Shopping basket!</font></p>");

	titleFontFile.setItalic(true);
	titleFontFile.setPointSize(10);
	titleFontFile.setStyleHint(QFont::System);
	titleFontFile.setWeight(static_cast<QFont::Weight>(70));

	this->titleWidgetFile->setFont(titleFontFile);
	layout->addWidget(this->titleWidgetFile);

	QWidget * buttonsWidget = new QWidget{};
	QGridLayout * gridLayout = new QGridLayout{buttonsWidget};

	gridLayout->addWidget(this->trenchCoatListWidget, 0, 0);
	trenchCoatListWidget->setStyleSheet("background-color: white; font-size: 15px; border: 1px solid black;");

	gridLayout->addWidget(this->shoppingBasketListWidget, 0, 1);
	shoppingBasketListWidget->setStyleSheet("background-color: white; font-size: 15px; border: 1px solid black;");

	layout->addWidget(buttonsWidget);

	QWidget * formLayout = new QWidget{};
	QFormLayout * trenchCoatLayout = new QFormLayout{formLayout};

	QFont f{"Verdana", 12};

	QLabel *sizeLabel = new QLabel{"&Size:"};
	sizeLabel->setBuddy(this->sizeEdit);
	sizeEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *colourLabel = new QLabel{"&Colour:"};
	colourLabel->setBuddy(this->colourEdit);
	colourEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *priceLabel = new QLabel{"&Price:"};
	priceLabel->setBuddy(this->priceEdit);
	priceEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *quantityLabel = new QLabel{"&Quantity:"};
	quantityLabel->setBuddy(this->quantityEdit);
	quantityEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *photoLabel = new QLabel{"&Photograph:"};
	photoLabel->setBuddy(this->photoEdit);
	photoEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	sizeLabel->setFont(f);
	colourLabel->setFont(f);
	priceLabel->setFont(f);
	quantityLabel->setFont(f);
	photoLabel->setFont(f);

	this->sizeEdit->setFont(f);
	this->colourEdit->setFont(f);
	this->priceEdit->setFont(f);
	this->quantityEdit->setFont(f);
	this->photoEdit->setFont(f);

	trenchCoatLayout->addRow(sizeLabel, this->sizeEdit);
	trenchCoatLayout->addRow(colourLabel, this->colourEdit);
	trenchCoatLayout->addRow(priceLabel, this->priceEdit);
	trenchCoatLayout->addRow(quantityLabel, this->quantityEdit);
	trenchCoatLayout->addRow(photoLabel, this->photoEdit);

	layout->addWidget(formLayout);

	trenchCoatLayout->addRow(this->addButton);
	addButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	trenchCoatLayout->addRow(this->nextButton);
	nextButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	QLabel *filterTitle = new QLabel{
			"<p style='text-align:center'><font color=#4D2D52><br>Filter the available trench coats by size</font></p>"};
	QFont filterFont = filterTitle->font();

	filterFont.setPointSize(10);
	filterFont.setStyleHint(QFont::System);
	filterFont.setWeight(static_cast<QFont::Weight>(70));
	filterTitle->setFont(filterFont);

	layout->addWidget(filterTitle);

	QFormLayout * filterDetailsLayout = new QFormLayout{};

	QLabel *sizeFilterLabel = new QLabel{"Size filter:"};
	photoLabel->setBuddy(this->sizeFilterEdit);
	sizeFilterEdit->setStyleSheet(
			"background-color: white; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	sizeFilterLabel->setFont(f);
	this->sizeFilterEdit->setFont(f);
	trenchCoatLayout->addRow(sizeFilterLabel, this->sizeFilterEdit);
	layout->addWidget(formLayout);

	filterDetailsLayout->addRow(this->filterButton);
	filterButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	filterDetailsLayout->addRow(this->clearButton);
	clearButton->setStyleSheet(
			"background-color: antiquewhite; font-size: 15px; height: 25px; width: 120px; border: 1px solid black;");

	layout->addLayout(filterDetailsLayout);
}

void UserGUI::connectSignalsAndSlots() {
	QObject::connect(this->trenchCoatListWidget, &QListWidget::itemSelectionChanged, [this]() {
		int selectedIndex = this->getSelectedIndex();
		if (selectedIndex < 0)
			return;

		TrenchCoat trenchCoat = this->service.getAllService()[selectedIndex];

		this->sizeEdit->setText(QString::fromStdString(std::to_string(trenchCoat.sizeGetter())));
		this->colourEdit->setText(QString::fromStdString(trenchCoat.colourGetter()));
		this->priceEdit->setText(QString::fromStdString(std::to_string(trenchCoat.priceGetter())));
		this->quantityEdit->setText(QString::fromStdString(std::to_string(trenchCoat.quantityGetter())));
		this->photoEdit->setText(QString::fromStdString(trenchCoat.photographGetter()));

		std::string link = std::string("start ").append(trenchCoat.photographGetter());
		system(link.c_str());
	});

	QObject::connect(this->csvButton, &QRadioButton::clicked, [this]() {
		this->userService.repositoryType("CSV");
		this->repoTypeSelected = true;
	});

	QObject::connect(this->htmlButton, &QRadioButton::clicked, [this]() {
		this->userService.repositoryType("HTML");
		this->repoTypeSelected = true;
	});

	QObject::connect(this->openListButton, &QPushButton::clicked, [this]() {
		if (!this->repoTypeSelected) {
			auto *error = new QMessageBox();
			error->setIcon(QMessageBox::Warning);
			error->setText("Please select the type of file you want!");
			error->setWindowTitle("File type warning!");
			error->exec();
		} else {
			std::string link = std::string("start ").append(this->userService.getFileService());
			system(link.c_str());
		}
	});

	QObject::connect(this->addButton, &QPushButton::clicked, this, &UserGUI::addTrenchCoat);
	QObject::connect(this->nextButton, &QPushButton::clicked, this, &UserGUI::nextTrenchCoat);
	QObject::connect(this->filterButton, &QPushButton::clicked, this, &UserGUI::filterTrenchCoats);
	QObject::connect(this->clearButton, &QPushButton::clicked, this, &UserGUI::clearTrenchCoat);
}

void UserGUI::populateTrenchCoatList() {
	this->trenchCoatListWidget->clear();
	std::vector<TrenchCoat> allTrenchCoat = this->service.getAllService();

	for (TrenchCoat &trenchCoat: allTrenchCoat)
		this->trenchCoatListWidget->addItem(QString::fromStdString(trenchCoat.toStringGUI()));
}

void UserGUI::populateShoppingBasketList() {
	this->shoppingBasketListWidget->clear();
	std::vector<TrenchCoat> allTrenchCoat = this->userService.getAllUserService();

	for (TrenchCoat &trenchCoat: allTrenchCoat)
		this->shoppingBasketListWidget->addItem(QString::fromStdString(trenchCoat.toStringGUI()));
}

int UserGUI::getSelectedIndex() const {
	QModelIndexList selectedIndexes = this->trenchCoatListWidget->selectionModel()->selectedIndexes();

	if (selectedIndexes.empty())
		return -1;

	int selectedIndex;
	for (int i = 0; i < selectedIndexes.count(); ++i) {
		selectedIndex = selectedIndexes.at(i).row();
	}

	return selectedIndex;
}

void UserGUI::nextTrenchCoat() {
	int currentIndex = this->getSelectedIndex();
	std::vector<TrenchCoat> allTrenchCoat = this->service.getAllService();

	// Index is invalid -> start from beginning again
	if (currentIndex == -1 || currentIndex >= allTrenchCoat.size())
		this->trenchCoatListWidget->setCurrentRow(0);

	// Move selection to next element
	++currentIndex;
	this->trenchCoatListWidget->setCurrentRow(currentIndex);
	this->trenchCoatListWidget->setFocus();
}

void UserGUI::addTrenchCoat() {
	int currentIndex;

	if (!this->repoTypeSelected) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Warning);

		error->setText("Please select the type of file you want!");
		error->setWindowTitle("File type warning!");
		error->exec();

	} else {
		std::string size_str = this->sizeEdit->text().toStdString();
		std::string colour = this->colourEdit->text().toStdString();
		std::string price_str = this->priceEdit->text().toStdString();
		std::string quantity_str = this->quantityEdit->text().toStdString();
		std::string photograph = this->photoEdit->text().toStdString();

		int size, price, quantity, sum_price = 0;

		try {
			this->validator.validateSizeString(size_str);
			size = std::stoi(size_str);
			this->validator.validateSize(size);

			this->validator.validateColour(colour);

			this->validator.validatePriceString(price_str);
			price = stoi(price_str);
			this->validator.validatePrice(price);

			this->validator.validateQuantityString(quantity_str);
			quantity = stoi(quantity_str);
			this->validator.validateQuantity(quantity);

			this->validator.validatePhotoLink(photograph);

			TrenchCoat trenchCoat = TrenchCoat(size, colour, price, quantity, photograph);
			this->userService.addUserService(trenchCoat, sum_price);

			if (!this->filtered) {
				currentIndex = this->getSelectedIndex();
				++currentIndex;

				this->populateTrenchCoatList();
			} else {
				currentIndex = this->getSelectedIndex();
				++currentIndex;
			}

			this->populateShoppingBasketList();

		} catch (ValidationException &exc) {
			QMessageBox *error = new QMessageBox{};
			error->setIcon(QMessageBox::Critical);
			error->setText(exc.what());
			error->setWindowTitle("Invalid input!");
			error->exec();

		} catch (RepositoryException &re) {
			QMessageBox *error = new QMessageBox{};
			error->setIcon(QMessageBox::Critical);
			error->setText(re.what());
			error->setWindowTitle("Error at buying the trench coat!");
			error->exec();
		}
	}

	this->trenchCoatListWidget->setCurrentRow(currentIndex);
	this->trenchCoatListWidget->setFocus();
}

void UserGUI::filterTrenchCoats() {
	int currentIndex;

	try {
		std::string size_filter = this->sizeFilterEdit->text().toStdString();
		int size;

		if (size_filter.empty()) {
			this->filtered = false;
			this->populateTrenchCoatList();

		} else {
			this->validator.validateSizeString(size_filter);
			size = stoi(size_filter);
			this->validator.validateSize(size);

			std::vector<TrenchCoat> validTrenchCoat;
			this->userService.listFiltered(size_filter, validTrenchCoat);

			if (validTrenchCoat.empty()) {
				std::string error;
				error += std::string("The list of valid trench coats is empty!");
				if (!error.empty())
					throw UserException(error);

			} else {
				this->filtered = true;
				this->trenchCoatListWidget->clear();

				for (TrenchCoat &trenchCoat: validTrenchCoat)
					this->trenchCoatListWidget->addItem(QString::fromStdString(trenchCoat.toStringGUI()));

				currentIndex = this->getSelectedIndex();
				++currentIndex;
			}
		}
	} catch (ValidationException &ve) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(ve.what());
		error->setWindowTitle("Validation error!");
		error->exec();

	} catch (UserException &ue) {
		QMessageBox *error = new QMessageBox{};
		error->setIcon(QMessageBox::Critical);
		error->setText(ue.what());
		error->setWindowTitle("Filter error!");
		error->exec();
	}

	this->trenchCoatListWidget->setCurrentRow(currentIndex);
	this->trenchCoatListWidget->setFocus();
}

void UserGUI::clearTrenchCoat() {
	this->sizeEdit->clear();
	this->colourEdit->clear();
	this->priceEdit->clear();
	this->quantityEdit->clear();
	this->photoEdit->clear();
	this->sizeFilterEdit->clear();
}

UserGUI::~UserGUI() = default;

int TrenchCoatListModel::rowCount(const QModelIndex &parent) const {
	return this->repository.getAllRepo().size();
}

QVariant TrenchCoatListModel::data(const QModelIndex &index, int role) const {
	int row = index.row();
	TrenchCoat currentTrenchCoat = this->repository.getAllRepo()[row];
	if (role == Qt::DisplayRole) {
		return QString::fromStdString(currentTrenchCoat.toStringGUI());
	}

	return QVariant();
}