from termcolor import colored


class Circle:
    def __init__(self, color):
        """
        Initializer for the Circle class
        :param color: The color of the circle
        """
        self.color = color

    @property
    def get_color(self):
        """
        Getter for the color attribute
        """
        return self.color

    def __str__(self):
        """
        Function for printing a circle of the specified color
        :return: The colored circle
        """
        return colored('●', str(self.color))
