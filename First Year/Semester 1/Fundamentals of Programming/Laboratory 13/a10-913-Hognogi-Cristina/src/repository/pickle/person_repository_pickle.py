import os
import pickle

from src.domain.person_domain import Person
from src.repository.memory.person_repository import PersonRepository


class PersonRepositoryPickle(PersonRepository):
    def __init__(self, file, custom=False):
        if custom == False:
            super().__init__()
        else:
            super().__init__(True)
        self.file = file

        if os.path.getsize(self.file) > 0:
            with open(self.file, "rb") as f:
                for el in pickle.load(f):
                    self.add_person(Person(el["person_id"], el["name"], el["phone_number"]))

    def save_file(self):
        with open(self.file, "wb") as f:
            pickle.dump([self.person[person].to_dict() for person in self.person], f)

    def add_person(self, entity):
        PersonRepository.add(self, entity)
        self.save_file()

    def remove_person(self, person_id):
        PersonRepository.remove(self, person_id)
        self.save_file()

    def update_person(self, new_name, new_phone_number):
        PersonRepository.update(person_id, name, phone_number)
        self.save_file()