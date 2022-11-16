from src.exception.exception import *
from src.domain.person_domain import Person
from src.structure.structure import *
import random


class PersonRepository:
    """
    A class that handles the repository of the Person class
    """

    def __init__(self, generate=False, custom=False):
        if custom == False:
            self.__data = dict()
        else:
            self.__data = Structure()
        if generate:
            self.generate_persons()

    @property
    def person(self):
        """
        Getter for a dictionary with the entiry list of persons
        :return: The dictionary of persons
        """
        return self.__data

    def add(self, entity):
        """
        Functions to add a new person to the dictionary
        :param entity: The entity for a person ID
        """
        self.__data[entity.person_id] = entity

    def remove(self, person_id):
        """
        Functions to remove a person from the dictionary by the ID
        :param person_id: The ID of person
        """
        del self.__data[person_id]

    def update(self, person_id, name, phone_number):
        """
        Functions to update a person from the dictionary
        :param person_id: The ID of person
        :param name: The name of person
        :param phone_number: The phone number of person
        """
        self.__data[person_id].name = name
        self.__data[person_id].phone_number = phone_number

    def generate_persons(self):
        """
        Function to generate the whole dictionary of persons with exact 20 persons
        """
        names = ["Caroline Kepnes", "Paula Waters", "Joanne Rowling", "Paula Rich", "Jennifer Niven",
                 "Ruth Power", "Gayle Forman", "Gayle Flynn", "Ruth Ware", "Mikki Daughtry", "Alexus Ibarra",
                 "Van Rich", "Arely Waters", "Harold Allison", "Kylie Waters", "Aaliyah Rich", "Alexus David",
                 "Alexus Harris", "Paula Braun", "Magdalena Waters"]
        for i in range(40, 60):
            person_id = i
            name = random.choice(names)
            names.remove(name)
            phone_number = "07"
            for digit in range(1, 9):
                phone_number = phone_number + str(random.randint(0, 9))
            self.__data[person_id] = Person(person_id, name, phone_number)

    def check_person_id_update(self, person_id):
        """
        Function to verify if a person is from the list or not
        :param person_id: The ID of a person
        """
        if person_id not in self.__data:
            raise PersonRepositoryException("\nERROR: No person with the given ID, " + str(person_id) +
                                            ", has been found!")

    def check_person_id_if_ext(self, person_id):
        """
        Function to verify if two persons have the same person id
        :param person_id: The ID of a person
        """
        for prs in self.person:
            if person_id == self.person[prs].person_id:
                raise PersonRepositoryException("\nERROR: A person with the given ID, " + str(person_id) +
                                                ", already exists!")

    def check_person_id_if_not_ext(self, person_id):
        """
        Function to verify if a person is from the list or not
        :param person_id: The ID of a person
        """
        if person_id not in self.__data:
            raise PersonRepositoryException("\nERROR: No person with the given ID, " + str(person_id) +
                                            ", has been found!")

    def check_name(self, name):
        """
        Function to verify if a persons have the same person id
        :param person_id: The ID of a person
        """
        for prs in self.person:
            if person_id == self.person[prs].person_id:
                raise PersonRepositoryException("\nERROR: A person with the given ID, " + str(person_id) +
                                                ", already exists!")

    def check_phone_number(self, phone_number):
        """
        Function to verify if two persons have the same phone number
        :param phone_number: The phone number of a person
        """
        for prs in self.person:
            if phone_number == self.person[prs].phone_number:
                raise PersonRepositoryException("\nERROR: A person with the phone number, " + str(phone_number) +
                                                ", already exists!")

    def get_max_person_id(self):
        """
        Function to get the maximum of a person ID
        :return: The maximum
        """
        max = -1

        for id in self.__data:
            if id > max:
                max = id
        return max

    def __str__(self):
        """
        :return: The string representation of the repository
        """
        return str(self.__data)

    def __getitem__(self, item):
        """
        :param item: The index of the item that is to be returned
        :return: The item at the given index
        """
        return self.__data[item]

    def find_name(self, name):
        """
        :param name: the ID of the client that is to be found
        :return: the found entity of type Person
        """
        name = name.casefold()

        val = filter(self.__data, lambda el: name in (el.name).casefold())

        return val

    def find_phone_number(self, phone_number):
        """
        Function to search a person in the dictionary by phone number
        :param phone_number: The phone number of person
        :return: The list of persons by phone number
        """
        val = filter(self.__data, lambda el: str(phone_number) in str(el.phone_number))

        return val


