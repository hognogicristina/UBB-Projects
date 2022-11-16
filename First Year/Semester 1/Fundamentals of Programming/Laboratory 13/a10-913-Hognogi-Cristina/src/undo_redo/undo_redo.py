from src.exception.exception import *


class UndoRedo:
    def __init__(self):
        self.__undo = list()
        self.__redo = list()

    def add_undo_op(self, undo_func, redo_func, activ=False):
        if activ == False:
            self.__undo.append([undo_func, redo_func])
        else:
            self.__undo.append([undo_func, redo_func, activ])
        self.__redo.clear()

    def add_redo_op(self, undo_func, redo_func, activ=False):
        if activ == False:
            self.__redo.append([undo_func, redo_func])
        else:
            self.__redo.append([undo_func, redo_func, activ])

    def undo(self):
        if len(self.__undo) == 0:
            raise UndoListException("No more commands to undo!")

        self.__undo[-1][0]()
        if len(self.__undo[-1]) == 2:
            self.add_redo_op(self.__undo[-1][0], self.__undo[-1][1])
        else:
            self.__undo[-1][2][0]()
            self.add_redo_op(self.__undo[-1][0], self.__undo[-1][1], self.__undo[-1][2])
        self.__undo.pop()

    def redo(self):
        if len(self.__redo) == 0:
            raise RedoListException("No more commands to redo!")

        self.__redo[-1][1]()
        if len(self.__redo[-1]) == 2:
            self.__undo.append([self.__redo[-1][0], self.__redo[-1][1]])
        else:
            self.__redo[-1][2][1]()
            self.__undo.append([self.__redo[-1][0], self.__redo[-1][1], self.__redo[-1][2]])
        self.__redo.pop()