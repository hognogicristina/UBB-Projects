from configparser import ConfigParser

from src.repository.memory.person_repository import PersonRepository
from src.repository.memory.activity_repository import ActivityRepository
from src.repository.pickle.person_repository_pickle import PersonRepositoryPickle
from src.repository.pickle.activity_repository_pickle import ActivityRepositoryPickle
from src.repository.txt.person_repository_txt import PersonRepositoryTxt
from src.repository.txt.activity_repository_txt import ActivityRepositoryTxt
from src.services.person_service import PersonService
from src.services.activity_service import ActivityService
from src.undo_redo.undo_redo import UndoRedo
from src.ui.ui import UI


class Settings:
    """
    A class that handles the settings of the programme
    """
    def __init__(self):
        parser = ConfigParser()
        parser.read(r"D:\PYTHON\Homeworks\a10-913-Hognogi-Cristina\src\files\settings.properties")
        self.ui = UI
        if parser.get("options", "repository") == "memory":
            self.undo_redo_serv = UndoRedo()

            if parser.get("options", "custom_struct") == "true":
                self.person_repo = PersonRepository(True, True)
                self.activity_repo = ActivityRepository(self.person_repo, True, True)
            else:
                self.person_repo = PersonRepository(True)
                self.activity_repo = ActivityRepository(person_repo, True)

            self.person_serv = PersonService(self.person_repo, self.activity_repo)
            self.activity_serv = ActivityService(self.activity_repo, self.person_repo)

            self.ui = self.ui(self.person_serv, self.activity_serv, self.undo_redo_serv)

        elif parser.get("options", "repository") == "txt":
            self.undo_redo_serv = UndoRedo()

            persons_txt = parser.get("options", "persons")
            activities_txt = parser.get("options", "activities")

            if parser.get("options", "custom_struct") == "true":
                self.activity_repo = ActivityRepositoryTxt(activities_txt, True)
                self.person_repo = PersonRepositoryTxt(persons_txt, True)
            else:
                self.activity_repo = ActivityRepositoryTxt(activities_txt)
                self.person_repo = PersonRepositoryTxt(persons_txt)

            self.activity_serv = ActivityService(self.activity_repo, self.person_repo)
            self.person_serv = PersonService(self.person_repo, self.activity_repo)

            self.person_repo.save_file()
            self.activity_repo.save_file()

            self.ui = self.ui(self.person_serv, self.activity_serv, self.undo_redo_serv)

        elif parser.get("options", "repository") == "pickle":
            self.undo_redo_serv = UndoRedo()

            persons_pkl = parser.get("options", "persons")
            activities_pkl = parser.get("options", "activities")

            if parser.get("options", "custom_struct") == "true":
                self.activity_repo = ActivityRepositoryPickle(activities_pkl, True)
                self.person_repo = PersonRepositoryPickle(persons_pkl, True)
            else:
                self.activity_repo = ActivityRepositoryPickle(activities_pkl)
                self.person_repo = PersonRepositoryPickle(persons_pkl)

            self.activity_serv = ActivityService(self.activity_repo, self.person_repo)
            self.person_serv = PersonService(self.person_repo, self.activity_repo)

            self.person_repo.save_file()
            self.activity_repo.save_file()

            self.ui = self.ui(self.person_serv, self.activity_serv, self.undo_redo_serv)

    def get_ui(self):
        return self.ui
