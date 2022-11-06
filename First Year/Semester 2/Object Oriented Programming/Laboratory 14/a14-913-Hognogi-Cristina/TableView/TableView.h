#ifndef A14_913_HOGNOGI_CRISTINA_TABLEVIEW_H
#define A14_913_HOGNOGI_CRISTINA_TABLEVIEW_H

#include "../Service/ServiceUser.h"

#include <QtCore/QAbstractTableModel>
#include <QtWidgets/QTableView>
#include <QTableView>
#include <QGridLayout>
#include <QHeaderView>

class TableView: public QAbstractTableModel {
private:
	UserService &userService;
public:
	explicit TableView(UserService &userService1, QObject *parent = nullptr);

	[[nodiscard]] int rowCount(const QModelIndex &parent) const override;
	[[nodiscard]] int columnCount(const QModelIndex &parent) const override;
	[[nodiscard]] QVariant data(const QModelIndex &index, int role) const override;
	[[nodiscard]] QVariant headerData(int section, Qt::Orientation orientation, int role) const override;
	void propagate();
};


#endif //A14_913_HOGNOGI_CRISTINA_TABLEVIEW_H
