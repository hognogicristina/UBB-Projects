import string

from src.domain.board import Board
from src.domain.circle import Circle
from src.domain.player import Player
from src.domain.ai import AI

from src.service.board_service import BoardService
from src.service.ai_service import AIService
from src.validators.validators import Validators


class UI:
    def __init__(self, board_service, ai_service):
        self.__board_service = board_service
        self.__ai_service = ai_service

    def human_vs_computer(self):
        circle_1 = Circle("yellow")
        circle_2 = Circle("red")

        while True:
            try:
                name = input("Enter your name: ")
                Validators.name_check(name)
                break
            except Exception as e:
                print(e)

        player1 = Player(string.capwords(name), circle_1)
        player2 = AI(circle_2, circle_1, 4)

        board = Board()

        print(player1)
        print(player2)
        print(board)

        while self.__board_service.is_draw(board) is False:
            column1 = input(player1.get_name + ", choose the column for your move: ")

            while Validators.check_column_integer(column1) is False:
                column1 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

            column1 = int(column1)
            column1 -= 1

            while self.__board_service.move(board, player1.get_circle, column1) is False:
                column1 = input("ERROR: Please choose a column which is not full: ")

                while Validators.check_column_integer(column1) is False:
                    column1 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

                column1 = int(column1)
                column1 -= 1

            print(board)

            if self.__board_service.is_game_won(board) is False:
                print("The computer is thinking...")
                column2 = int(self.__ai_service.move(player2, board))

                print("The computer chose the column {}.".format(str(column2 + 1)))
                self.__board_service.move(board, player2.get_circle, column2)

                print(board)

                if self.__board_service.is_game_won(board) is True:
                    print("The computer won!")
                    break
                continue

            print("{} won!".format(player1.get_name))
            break

        if self.__board_service.is_draw(board) is True:
            print("Draw!")

    def human_vs_human(self):
        circle1 = Circle("yellow")
        circle2 = Circle("red")

        while True:
            try:
                name1 = input("Enter the name for the first player: ")
                Validators.name_check(name1)
                break
            except Exception as ve:
                print(ve)

        while True:
            try:
                name2 = input("Enter the name for the second player: ")
                Validators.name_check(name1)
                break
            except Exception as ve:
                print(ve)

        player1 = Player(string.capwords(name1), circle1)
        player2 = Player(string.capwords(name2), circle2)

        board = Board()

        print(player1)
        print(player2)
        print(board)

        while self.__board_service.is_draw(board) is False:
            column1 = input("{}, choose the column for your move: ".format(player1.get_name))

            while Validators.check_column_integer(column1) is False:
                column1 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

            column1 = int(column1)
            column1 -= 1

            while self.__board_service.move(board, player1.get_circle, column1) is False:
                column1 = input("ERROR: Please choose a column which is not full: ")

                while Validators.check_column_integer(column1) is False:
                    column1 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

                column1 = int(column1)
                column1 -= 1

            print(board)

            if self.__board_service.is_game_won(board) is False:
                column2 = input("{}, choose the column for your move: ".format(player2.get_name))

                while Validators.check_column_integer(column2) is False:
                    column2 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

                column2 = int(column2)
                column2 -= 1

                while self.__board_service.move(board, player2.get_circle, column2) is False:
                    column2 = input("ERROR: Please choose a column which is not full: ")

                    while Validators.check_column_integer(column2) is False:
                        column2 = input("ERROR: Invalid column number, please choose a number between 1 and 7: ")

                    column2 = int(column2)
                    column2 -= 1

                print(board)

                if self.__board_service.is_game_won(board) is True:
                    print("{} won!".format(player2.get_name))
                    break
                continue

            print("{} won!".format(player1.get_name))
            break

        if self.__board_service.is_draw(board) is True:
            print("Draw!")

    @staticmethod
    def print_menu():
        print("\nAvailable game modes: ")
        print("\t1. Human vs. Computer")
        print("\t2. Human vs. Human")
        print("\t0. Exit")

    def menu(self):
        while True:
            self.print_menu()
            command = input("Choose an option: ")
            if command == "1":
                self.human_vs_computer()
            elif command == "2":
                self.human_vs_human()
            elif command == "0":
                print("\nTerminating program...")
                return
            else:
                print("\nInvalid choice!")
