from termcolor import colored

class Player:
    def __init__(self, name, circle):
        """
        Initializer for the Player Class
        :param name: The name of the player
        :param circle: The circle which the player will use
        """
        self.__name = name
        self.__circle = circle

    @property
    def get_circle(self):
        """
        Getter for the circle attribute
        """
        return self.__circle

    @property
    def get_name(self):
        """
        Getter for the name attribute
        """
        return self.__name

    def __str__(self):
        """
        Function for printing a color of the player
        :return: The player color
        """

        return "{} is playing with circles of this color: {}".format(self.__name, str(self.__circle))

