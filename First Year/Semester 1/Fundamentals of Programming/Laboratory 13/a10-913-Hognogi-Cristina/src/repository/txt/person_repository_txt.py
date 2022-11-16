from src.domain.person_domain import Person
from src.repository.memory.person_repository import PersonRepository


class PersonRepositoryTxt(PersonRepository):
    def __init__(self, file, custom=False):
        if custom == False:
            super().__init__()
        else:
            super().__init__(True)
        self.file = file
        with open(self.file, "r") as f:
            for person in f:
                person = person.split(",")
                for i in range(len(person)):
                    if "\n" in person[i]:
                        person[i] = person[i].strip()
                person_id = int(person[0])
                name = person[1]
                phone_number = person[2]
                self.add_person(Person(person_id, name, phone_number))

    def save_file(self):
        with open(self.file, "w") as f:
            k = 0
            for person in self.person:
                person_id = person.__str__()
                name = self.person[person].name
                phone_number = self.person[person].phone_number
                if k == 0:
                    f.write(person_id + "," + name + "," + phone_number)
                else:
                    f.write("\n" + person_id + "," + name + "," + phone_number)
                k = 1

    def add_person(self, entity):
        PersonRepository.add(self, entity)
        self.save_file()

    def remove_person(self, person_id):
        PersonRepository.remove(self, person_id)
        self.save_file()

    def update_person(self, new_name, new_phone_number):
        PersonRepository.update(person_id, name, phone_number)
        self.save_file()
