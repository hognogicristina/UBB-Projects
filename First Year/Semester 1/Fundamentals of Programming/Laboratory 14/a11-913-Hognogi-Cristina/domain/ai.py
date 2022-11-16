class AI:
    def __init__(self, circle, opponent_circle, difficulty):
        """
        Initializer for the AI class
        :param circle: The circle to be used by the computer
        :param opponent_circle: The circle used by the opponent
        :param difficulty: The depth at which the computer will look further for its moves
        """
        self.circle = circle
        self.opponent_circle = opponent_circle
        self.difficulty = difficulty

    @property
    def get_circle(self):
        """
        Getter for the circle attribute
        """
        return self.circle

    def __str__(self):
        """
        Function for printing a the color of the computer player
        :return: The color of the computer player
        """
        return "The computer is playing with circles of this color: {}".format(str(self.circle))
