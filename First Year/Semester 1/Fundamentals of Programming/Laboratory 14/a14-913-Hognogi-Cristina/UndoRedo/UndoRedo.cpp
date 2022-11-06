#include "UndoRedo.h"

UndoRedoAdd::UndoRedoAdd(const TrenchCoat &trenchCoat1, Repository &repository1) : trenchCoat(trenchCoat1),
																				   repository(repository1) {}

void UndoRedoAdd::undo() {
	int i = this->repository.findBySizeAndColour(this->trenchCoat.sizeGetter(), this->trenchCoat.colourGetter());
	this->repository.deleteRepo(i);
}

void UndoRedoAdd::redo() {
	this->repository.addRepo(this->trenchCoat);
}

UndoRedoRemove::UndoRedoRemove(const TrenchCoat &trenchCoat1, Repository &repository1) : trenchCoat(trenchCoat1),
																						 repository(repository1) {}

void UndoRedoRemove::undo() {
	this->repository.addRepo(this->trenchCoat);
}

void UndoRedoRemove::redo() {
	int i = this->repository.findBySizeAndColour(this->trenchCoat.sizeGetter(), this->trenchCoat.colourGetter());
	this->repository.deleteRepo(i);
}

UndoRedoUpdate::UndoRedoUpdate(const TrenchCoat &oldTrenchCoat1, const TrenchCoat &newTrenchCoat1,
							   Repository &repository1) : oldTrenchCoat(oldTrenchCoat1), newTrenchCoat(newTrenchCoat1),
														  repository(repository1) {}

void UndoRedoUpdate::undo() {
	int index = this->repository.findBySizeAndColour(this->newTrenchCoat.sizeGetter(), this->newTrenchCoat.colourGetter());
    this->repository.updateRepo(index, this->oldTrenchCoat);
}

void UndoRedoUpdate::redo() {
	 int index = this->repository.findBySizeAndColour(this->oldTrenchCoat.sizeGetter(), this->oldTrenchCoat.colourGetter());
    this->repository.updateRepo(index, this->newTrenchCoat);
}
