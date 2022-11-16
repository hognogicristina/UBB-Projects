from src.exception.exception import *
from src.domain.person_domain import Person
from src.undo_redo.undo_redo import *


class PersonService:
    """
    A class that handles the service of the Person class
    """

    def __init__(self, person_repository, activity_repository):
        self.__repository = person_repository
        self.__activity_repo = activity_repository

    def add_person(self, person_id, name, phone_number):
        """
        Add function to call from PersonRepository
        :param person_id: The ID of a person
        :param name: The name of a person
        :param phone_number: The phone number of a person
        """
        if name == False:
            raise PersonValidatorsException("")
        person = Person(person_id, name, phone_number)

        self.__repository.add(person)

    def remove_person(self, person_id):
        """
        Remove function to call from PersonRepository
        :param person_id: The ID of a person
        """
        self.__repository.remove(person_id)

    def update_person(self, person_id, name, phone_number):
        """
        Update function to call from PersonRepository
        :param person_id: The ID of a person
        :param name: The name of a person
        :param phone_number: The phone number of a person
        """
        self.__repository.update(person_id, name, phone_number)

    def get_persons(self):
        """
        Getter for the dictionary of persons from repository that will be used to display the list of persons
        :return: The dictionary of persons from repository
        """
        return self.__repository.person

    def find_person_name(self, name):
        """
        Find function by name to call from PersonRepository
        :param name: The name of a person
        :return: The list of persons by name
        """
        return self.__repository.find_name(name)

    def find_person_phone_number(self, phone_number):
        """
        Find function by phone number to call from PersonRepository
        :param phone_number: The phone number of a person
        :return: The list of persons by phone number
        """
        return self.__repository.find_phone_number(phone_number)

    def check_phone_number(self, phone_number):
        """
        Check function for phone number to call from PersonRepository
        :param phone_number: The phone number of a person
        """
        self.__repository.check_phone_number(phone_number)

    def check_person_id_update(self, person_id):
        """
        Check function for person id to call from PersonRepository
        :param person_id: The ID of a person
        """
        self.__repository.check_person_id_update(person_id)

    def check_person_id_if_ext(self, person_id):
        """
        Check function for person id to call from PersonRepository
        :param person_id: The ID of a person
        """
        self.__repository.check_person_id_if_ext(person_id)

    def check_person_id_if_not_ext(self, person_id):
        """
        Check function for person id to call from PersonRepository
        :param person_id: The ID of a person
        """
        self.__repository.check_person_id_if_not_ext(person_id)

    def get_max_person_id(self):
        return self.__repository.get_max_person_id()

    def get_person_name(self, item):
        """
        :param item: The index of the person
        :return: The name of the person
        """
        for i in self.__repository.person:
            if item == self.__repository.person[i].person_id:
                return self.__repository.person[i].name

    def get_person_phone_number(self, item):
        """
        :param item: The index of the person
        :return: The phone number of the person
        """
        for i in self.__repository.person:
            if item == self.__repository.person[i].person_id:
                return self.__repository.person[i].phone_number

