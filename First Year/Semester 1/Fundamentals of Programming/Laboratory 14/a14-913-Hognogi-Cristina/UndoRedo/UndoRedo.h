#ifndef A14_913_HOGNOGI_CRISTINA_UNDOREDO_H
#define A14_913_HOGNOGI_CRISTINA_UNDOREDO_H

#include <../Repository/RepoAdmin.h>

class UndoRedo {
public:
	virtual void undo() = 0;
	virtual void redo() = 0;
	virtual ~UndoRedo() = default;
};

class UndoRedoAdd: public UndoRedo {
private:
	TrenchCoat trenchCoat;
	Repository &repository;
public:
	UndoRedoAdd(const TrenchCoat &trenchCoat1, Repository &repository1);
	void undo() override;
	void redo() override;
	~UndoRedoAdd() override = default;
};

class UndoRedoRemove: public UndoRedo {
private:
	TrenchCoat trenchCoat;
	Repository &repository;
public:
	UndoRedoRemove(const TrenchCoat &trenchCoat1, Repository &repository1);
	void undo() override;
	void redo() override;
	~UndoRedoRemove() override = default;
};

class UndoRedoUpdate: public UndoRedo {
private:
	TrenchCoat oldTrenchCoat;
	TrenchCoat newTrenchCoat;
	Repository &repository;
public:
	UndoRedoUpdate(const TrenchCoat &oldTrenchCoat1, const TrenchCoat &newTrenchCoat1, Repository &repository1);
	void undo () override;
	void redo() override;
	~UndoRedoUpdate() override = default;
};

#endif //A14_913_HOGNOGI_CRISTINA_UNDOREDO_H
