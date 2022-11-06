from termcolor import colored

class Board:
    def __init__(self):
        """
        Initializer for the Board class
        It contains a pseudo-matrix which memories the state of the board
        """
        self.matrix = [['●' for x in range(7)] for y in range(6)]

    def __str__(self):
        """
        :return: The configuration of the board as a string/board
        """
        string = ' | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n'
        string += ' - - - - - - - - - - - - - - -\n'
        for index1 in range(6):
            for index2 in range(7):
                string += ' | '
                string += str(self.matrix[index1][index2])
            string += ' | \n'
            string += ' - - - - - - - - - - - - - - -\n'
        return string
