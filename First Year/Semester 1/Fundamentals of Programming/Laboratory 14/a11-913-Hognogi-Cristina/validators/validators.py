class Validators:
    """
    Class for validators of the game
    """
    @staticmethod
    def name_check(name):
        """
        Checks if the name is formed with letters and can have also many words. Raises ValidatorsException if invalid
        :param name: The name of the player
        """
        if len(name.strip()) == 0:
            raise Exception("\nERROR: Invalid name! Name player is empty!")

        while True:
            if all(x.isalpha() or x.isspace() for x in name):
                break
            else:
                raise Exception("\nERROR: Invalid name! Name player can only contains letters and spaces!")

    @staticmethod
    def check_column_integer(message):
        """
        Checks if the column picked is between 1 and 7
        :param message: The number picked
        :return: If it is correct is True, otherwise False
        """
        if message.isdigit():
            column = int(message)
            if 0 < column < 8:
                return True
        return False
