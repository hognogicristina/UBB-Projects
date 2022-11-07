from src.domain.board import Board


class BoardService:
    """
    Class for Board Service
    """
    def is_game_won(self, board):
        """
        Checks if the game was won by a player or the computer
        :return: True if the game was won, False otherwise
        """

        "Check if a player has won on horizontal"
        for row in range(6):
            for column in range(4):
                if board.matrix[row][column] != '●':
                    if board.matrix[row][column] == board.matrix[row][column + 1]:
                        if board.matrix[row][column] == board.matrix[row][column + 2]:
                            if board.matrix[row][column] == board.matrix[row][column + 3]:
                                return True

        "Check if a player has won on vertical"
        for column in range(7):
            for row in range(3):
                if board.matrix[row][column] != '●':
                    if board.matrix[row][column] == board.matrix[row + 1][column]:
                        if board.matrix[row][column] == board.matrix[row + 2][column]:
                            if board.matrix[row][column] == board.matrix[row + 3][column]:
                                return True

        "Check if a player has won on negative slop"
        for row in range(3):
            for column in range(4):
                if board.matrix[row][column] != '●':
                    if board.matrix[row][column] == board.matrix[row + 1][column + 1]:
                        if board.matrix[row][column] == board.matrix[row + 2][column + 2]:
                            if board.matrix[row][column] == board.matrix[row + 3][column + 3]:
                                return True

        "Check if a player has won on positive slop"
        for row in range(3):
            column = 6
            while column >= 3:
                if board.matrix[row][column] != '●':
                    if board.matrix[row][column] == board.matrix[row + 1][column - 1]:
                        if board.matrix[row][column] == board.matrix[row + 2][column - 2]:
                            if board.matrix[row][column] == board.matrix[row + 3][column - 3]:
                                return True
                column -= 1
        return False

    def is_draw(self, board):
        """
        Checks if the game is a draw
        :return: True if the game is a draw and False otherwise
        """
        for row in range(6):
            for column in range(7):
                if board.matrix[row][column] == '●':
                    return False
        return True

    def move(self, board, circle, column):
        """
        Method that enables a move on the board
        :param board: The current state of the board
        :param circle: The colour of the circle
        :param column: The column in which the circle will be introduced
        :return: True if the move is possible on that column, false otherwise
        """
        i = 5
        while i > -1:
            if board.matrix[i][column] == '●':
                board.matrix[i][column] = circle
                return True
            i -= 1
        return False

