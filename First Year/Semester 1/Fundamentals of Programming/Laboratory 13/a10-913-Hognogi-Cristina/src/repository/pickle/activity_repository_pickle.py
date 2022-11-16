import os
import pickle

from src.domain.activity_domain import Activity
from src.repository.memory.activity_repository import ActivityRepository


class ActivityRepositoryPickle(ActivityRepository):
    def __init__(self, file, custom=False):
        if custom == False:
            super().__init__()
        else:
            super().__init__(True)
        self.file = file

        if os.path.getsize(self.file) > 0:
            with open(self.file, "rb") as f:
                for el in pickle.load(f):
                    self.add_activity(Activity(el["activity_id"], el["date"], el["time"], el["description"]))

    def save_file(self):
        with open(self.file, "wb") as f:
            pickle.dump([self.activity[activity].to_dict() for activity in self.activity], f)

    def add_activity(self, entity):
        ActivityRepository.add(self, entity)
        self.save_file()

    def remove_activity(self, activity_id):
        ActivityRepository.remove(self, activity_id)
        self.save_file()

    def update_activity(self, new_date, new_time, new_description):
        ActivityRepository.update(activity_id, date, time, description)
        self.save_file()
