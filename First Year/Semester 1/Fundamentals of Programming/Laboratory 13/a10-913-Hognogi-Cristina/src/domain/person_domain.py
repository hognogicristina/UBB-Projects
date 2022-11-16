from src.exception.exception import PersonDomainException


class Person:
    """
    A class that handles the domain of the Person class
    """

    def __init__(self, person_id, name, phone_number):
        self.__person_id = person_id
        self.__name = name
        self.__phone_number = phone_number

    @property
    def person_id(self):
        """
        Getter for a person ID
        :return: The ID person
        """
        return self.__person_id

    @property
    def name(self):
        """
        Getter for a person's name
        :return: The name person
        """
        return self.__name

    @name.setter
    def name(self, new_name):
        """
        Setter for the person's name, a new string name
        :param new_name: The new string name
        """
        self.__name = new_name

    @property
    def phone_number(self):
        """
        Getter for a person's phone number
        :return: The phone number person
        """
        return self.__phone_number

    @phone_number.setter
    def phone_number(self, new_phone_number):
        """
        Setter for the person's name, a new string phone_number
        :param phone_number: The new string phone_number
        """
        self.__phone_number = new_phone_number

    def __eq__(self, other):
        """
        Function for to verify if a function is repetead
        :param other: A other value for the parameters
        :return: The actual parameters being equal with the new ones
        """
        if isinstance(other, Person) is False:
            return False
        return self.person_id == other.person_id and self.name == other.name and self.phone_number == other.phone_number

    def __str__(self):
        """
        Function to print the dictionary
        :return: The dictionary of person
        """
        return "ID: " + str(self.__person_id) + ", Name: " + self.__name + ", Phone Number: " + str(self.__phone_number)

    def __getitem__(self, item):
        """
        This function is a getter for an item
        :param item: The item you are working with
        :return: The value of item from the dictionary
        """
        return self.__data[item]

    def to_dict(self):
        return {"person_id": self.__person_id, "name": self.__name, "phone_number": self.__phone_number}
