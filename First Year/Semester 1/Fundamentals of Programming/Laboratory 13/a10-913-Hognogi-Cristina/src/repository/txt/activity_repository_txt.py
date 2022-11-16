from src.repository.memory.activity_repository import ActivityRepository
from src.domain.activity_domain import Activity


class ActivityRepositoryTxt(ActivityRepository):
	def __init__(self, file, custom=False):
		if custom == False:
			super().__init__()
		else:
			super().__init__(True)
		self.file = file
		with open(self.file, "r") as f:
			for activity in f:
				activity = activity.split(",")
				for i in range(len(activity)):
					if "\n" in activity[i]:
						activity[i] = activity[i].strip()
				activity_id = int(activity[0])
				date = activity[1]
				time = activity[2]
				description = activity[3]
				self.add_activity(Activity(activity_id, date, time, description))

	def save_file(self):
		with open(self.file, "w") as f:
			k = 0
			for activity in self.activity:
				activity_id = activity.__str__()
				date = self.activity[activity].date
				time = self.activity[activity].time
				description = self.activity[activity].description
				if k == 0:
					f.write(activity_id + "," + date + "," + time + "," + description)
				else:
					f.write("\n" + activity_id + "," + date + "," + time + "," + description)
				k = 1


	def add_activity(self, entity):
		ActivityRepository.add(self, entity)
		self.save_file()

	def remove_activity(self, activity_id):
		ActivityRepository.remove(self, activity_id)
		self.save_file()

	def update_activity(self, new_date, new_time, new_description):
		ActivityRepository.update_movie(activity_id, date, time, description)
		self.save_file()