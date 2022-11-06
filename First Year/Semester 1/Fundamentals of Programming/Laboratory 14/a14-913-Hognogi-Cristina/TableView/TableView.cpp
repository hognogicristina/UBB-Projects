#include "TableView.h"

TableView::TableView(UserService &userService1, QObject *parent) : userService{userService1},
																		 QAbstractTableModel{parent} {}

int TableView::rowCount(const QModelIndex &parent) const {
	return this->userService.getNrElemsUserService();
}

int TableView::columnCount(const QModelIndex &parent) const {
	return 5;
}

QVariant TableView::data(const QModelIndex &index, int role) const {
	int row = index.row();
	int col = index.column();
	auto trenchCoats = this->userService.getAllUserService();
	TrenchCoat trenchCoat = trenchCoats[row];

	if (role == Qt::DisplayRole  || role == Qt::EditRole) {
		switch (col) {
			case 0:
				return QString::fromStdString(std::to_string(trenchCoat.sizeGetter()));
			case 1:
				return QString::fromStdString(trenchCoat.colourGetter());
			case 2:
				return QString::fromStdString(std::to_string(trenchCoat.priceGetter()));
			case 3:
				return QString::fromStdString(std::to_string(trenchCoat.quantityGetter()));
			case 4:
				return QString::fromStdString(trenchCoat.photographGetter());
			default:
				break;
		}
	}
	return QVariant{};
}

QVariant TableView::headerData(int section, Qt::Orientation orientation, int role) const {
	if (role == Qt::DisplayRole) {
		if (orientation == Qt::Horizontal) {
			switch (section) {
				case 0:
					return QString("Size");
				case 1:
					return QString("Colour");
				case 2:
					return QString("Price");
				case 3:
					return QString("Quantity");
				case 4:
					return QString("Link");
				default:
					break;
			}
		}
	}
	return QVariant();
}

void TableView::propagate() {
	emit layoutChanged();
}
