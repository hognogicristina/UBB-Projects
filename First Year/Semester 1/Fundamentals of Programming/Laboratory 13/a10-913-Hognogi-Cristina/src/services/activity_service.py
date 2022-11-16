from src.domain.activity_domain import Activity
from src.undo_redo.undo_redo import *
import datetime
import re

class ActivityService:
	"""
	A class that handles the service of the Activity class
	"""
	def __init__(self, activity_repository, person_repository):
		self.__repository = activity_repository
		self.__person_repo = person_repository

	def add_activity(self, activity_id, date, time, description, person_id):
		"""
		Add function to call from ActivityRepository
		:param activity_id: The ID of an activity
		:param date: The date of an activity
		:param time: The time of an activity
		:param description: The description of an activity
		:param person_id: The ID of a person
		"""
		if person_id == None:
			activity = Activity(activity_id, date, time, description)
		else:
			activity = Activity(activity_id, date, time, description, person_id)

		self.__repository.add(activity)

	def remove_activity(self, activity_id):
		"""
		Remove function to call from ActivityRepository
		:param activity_id: The ID of an activity
		"""
		self.__repository.remove(activity_id)

	def update_activity(self, activity_id, date, time, description):
		"""
		Remove function to call from ActivityRepository
		:param activity_id: The ID of an activity
		:param date: The date of an activity
		:param time: The time of an activity
		:param description: The description of an activity
		"""

		self.__repository.update(activity_id, date, time, description)

	def get_activities(self):
		"""
		Getter for the dictionary of activities from repository that will be used to display the list of activities
        :return: The dictionary of activities from repository
		"""
		return self.__repository.activity

	def add_person_to_activity(self, person_id, activity_id):
		"""
		Add person to activity function to call from ActivityRepository
		:param person_id: The ID of a person
		:param activity_id: The ID of an activity
		"""
		self.__repository.add_pers_to_act(person_id, activity_id)

	def rem_person_to_activity(self, person_id, activity_id):
		"""
		Remove person to activity function to call from ActivityRepository
		:param person_id: The ID of a person
		:param activity_id: The ID of an activity
		"""
		self.__repository.rem_pers_to_act(person_id, activity_id)

	def rem_pers_from_all_activ(self, person_id):
		"""
		Remove person from all activities function to call from ActivityRepository
		:param person_id: The ID of a person
		"""
		self.__repository.rem_pers_from_all_activ(person_id)

	def find_activity_date(self, date):
		"""
		Find function by date to call from ActivityRepository
        :param date: The date of an activity
        :return: The list of activities by date
		"""
		return self.__repository.find_date(date)

	def find_activity_time(self, time):
		"""
		Find function by time to call from ActivityRepository
        :param time: The time of an activity
        :return: The list of activities by time
		"""
		return self.__repository.find_time(time)

	def find_activity_description(self, description):
		"""
		Find function by description to call from ActivityRepository
        :param description: The description of an activity
        :return: The list of activities by description
		"""
		return self.__repository.find_description(description)

	def statistics_activity_date(self, date):
		"""
		Statistics function of a date sorted by time to call from ActivityRepository
		:param date: The date of an activity
		:return: The list of activities of a date sorted by time
		"""
		return self.__repository.statistics_activity_date(date)

	def statistics_activity_person(self, person_id):
		"""
		Statistics function with a given person, a list with all upcoming activities to which a given person will
		participate to call from ActivityRepository
		:param date: The ID of a person
		:return: The list of activities to which a given person will participate
		"""
		return self.__repository.statistics_activity_person(person_id)

	def statistics_busy_days(self):
		"""
		Statistics function for the list of upcoming dates with activities, sorted in ascending order of the free time
		in that day, sorted from the busiest day to the quietest day to call from ActivityRepository
		:return: The list of activities of upcoming dates with activities and the number of total activities
		"""
		return self.__repository.statistics_busy_days()

	def check_date(self, date, time, description):
		"""
        Check function for an activity to not already exist to call from ActivityRepository
        :param date: The date of an activity
        :param time: The time of an activity
        :param description: The description of an activity
        """
		self.__repository.check_date(date, time, description)

	def get_acti_pers_id(self, person_id):
		"""
		Function to get a list with activities of a person
		:param person_id: The ID of a person
		:return: The list of activities
		"""
		ls = list()
		for acti in self.__repository.activity:
			if person_id in self.__repository.activity[acti].particip:
				ls.append(self.__repository.activity[acti].activity_id)
		return ls

	def add_pers_to_all_activ(self, person_id, activity_list):
		"""
		Function to create a list of activities where a person is enrolled to call from ActivityRepository
		:param person_id: The ID of a person
		:param activity_list: The ID of an activity
		"""
		self.__repository.add_pers_to_all_activ(person_id, activity_list)

	def check_activity_id_update(self, activity_id):
		"""
		Check function for activity ID to call from ActivityRepository
		:param activity_id: The ID of an activity
		"""
		self.__repository.check_activity_id_update(activity_id)

	def check_activity_id_if_ext(self, activity_id):
		"""
        Check function for activity ID to call from ActivityRepository
        :param activity_id: The ID of an activity
        """
		self.__repository.check_activity_id_if_ext(activity_id)

	def check_activity_id_if_not_ext(self, activity_id):
		"""
		Check function for activity ID to call from ActivityRepository
		:param activity_id: The ID of an activity
		"""
		self.__repository.check_activity_id_if_not_ext(activity_id)

	def get_max_activity_id(self):
		return self.__repository.get_max_activity_id()

	def get_activities_date(self, item):
		"""
		:param item: The index of the activity
		:return: The date of the activity
		"""
		for i in self.__repository.activity:
			if item == self.__repository.activity[i].activity_id:
				return self.__repository.activity[i].date

	def get_activities_time(self, item):
		"""
		:param item: The index of the activity
		:return: The time of the activity
		"""
		for i in self.__repository.activity:
			if item == self.__repository.activity[i].activity_id:
				return self.__repository.activity[i].time

	def get_activities_description(self, item):
		"""
		:param item: The index of the activity
		:return: The description of the activity
		"""
		for i in self.__repository.activity:
			if item == self.__repository.activity[i].activity_id:
				return self.__repository.activity[i].description
