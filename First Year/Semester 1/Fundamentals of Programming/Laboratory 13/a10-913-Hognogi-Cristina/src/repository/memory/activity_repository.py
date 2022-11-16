import datetime
import random
import re

from src.domain.activity_domain import Activity
from src.exception.exception import *
from src.structure.structure import *


class ActivityRepository:
    """
    A class that handles the repository of the Activity class
    """

    def __init__(self, person_repo, generate=False, custom=False):
        self.__custom = False
        if custom == False:
            self.__data = dict()
        else:
            self.__data = Structure()
            self.__custom = True
        self.__person_repo = person_repo
        if generate:
            self.generate_activities()

    @property
    def activity(self):
        """
        Getter for a dictionary with the entiry list of activities
        :return: The dictionary of activities
        """
        return self.__data

    def add(self, entity):
        """
        Functions to add an new activity to the dictionary
        :param entity: The entity for an activity ID
        """
        self.__data[entity.activity_id] = entity

    def remove(self, activity_id):
        """
        Functions to remove an activity from the dictionary by the ID
        :param person_id: The ID of an activity
        """
        del self.__data[activity_id]

    def update(self, activity_id, date, time, description):
        """
        Functions to update an activity from the dictionary
        :param activity_id: The ID of an activity
        :param date: The date of an activity
        :param time: The time of an activity
        :param description: The description of an activity
        """
        self.__data[activity_id].date = date
        self.__data[activity_id].time = time
        self.__data[activity_id].description = description

    @staticmethod
    def random_date():
        """
        Function to generate randoms dates and ours for activity dictionary
        :return:
        """
        start = datetime.datetime.strptime('2022/01/01 10:00 AM', '%Y/%m/%d %H:%M %p')
        end = datetime.datetime.strptime('2022/02/04 7:00 PM', '%Y/%m/%d %H:%M %p')
        delta = end - start
        int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
        random_second = random.randrange(int_delta)
        return start + datetime.timedelta(seconds=random_second)

    def generate_activities(self):
        """
        Function to generate the whole dictionary of activity with exact 20 persons
        """
        descriptions = ["Scubadiving", "Swimming", "Reading", "Riding", "Singing", "Dancing", "Snowboarding",
                        "Weightlifting", "Surfing", "Skiing", "Rafting", "Diving", "Racing", "Cycling", "Shooting",
                        "Fencing", "Writing", "Boxing", "Skating", "Skijumping", "Running", "Sailing", "Trampolining",
                        "Bowling", "Climbing", "Kayaking", "Jogging", "Biking"]

        for i in range(10, 30):
            activity_id = i
            new_list_id = []
            person_id = random.choice(list(self.__person_repo.person))
            new_list_id.append(person_id)
            description = random.choice(descriptions)
            random_date_time = self.random_date()
            day = random_date_time.day
            month = random_date_time.month
            year = random_date_time.year
            hour = random_date_time.hour
            minute = random_date_time.minute
            date = datetime.date(year, month, day)
            time = datetime.time(hour, minute)
            self.__data[activity_id] = Activity(activity_id, date, time, description, [person_id])

    def is_available_time_slot_person(self, person_id, activity_id):
        """
        Function to generates persons to activities
        :param person_id: The ID of a person
        :param activity_id: The ID of an activity
        :return: The list of participants
        """
        time_slots = []

        for i in self.__data.keys():
            if activity_id != i:
                if person_id in self.__data[i].particip:
                    time_slots.append([str(self.__data[i].date), str(self.__data[i].time)])

        return time_slots

    def add_pers_to_act(self, person_id, activity_id):
        """
        Function to add a person to an activity
        :param person_id: The ID of a person
        :param activity_id: The ID of an activity
        """
        " Step 1: We check if the given person with an ID of person_id is already enrolled "
        " in the given activity with an ID of activity_id "
        for i in self.__data[activity_id].particip:
            if person_id == i:
                raise ActivityRepositoryException("\nERROR: Person with ID, " + str(person_id) +
                                                  ", is already enrolled in this activity!")

        " Step 2: We create a list with all the activities that the person with an ID of person_id is enrolled in "
        time_slots = self.is_available_time_slot_person(person_id, activity_id)

        " Step 3: We iterate through the time_slots list and check whether an activity "
        " crosses ways with the given activity with an ID of activity_id "
        for i in range(len(time_slots)):
            act_date = time_slots[i][0]
            act_date = act_date.split("-")
            act_date = "/".join(act_date)
            time = time_slots[i][1]
            act_all_date = str(self.__data[activity_id].date)
            act_all_date = act_all_date.split("-")
            act_all_date = "/".join(act_all_date)
            act_all_time = str(self.__data[activity_id].time)

            if act_date == act_all_date:
                if time == act_all_time:
                    raise ActivityRepositoryException("\nERROR: The date or time slots of the 2 given activities "
                                                      "coincide!")
            else:
                if time == act_all_time:
                    raise ActivityRepositoryException("\nERROR: The date or time slots of the 2 given activities "
                                                      "coincide!")

        self.__data[activity_id].particip.append(person_id)

    def rem_pers_to_act(self, person_id, activity_id):
        """
        Function to remove a person from an activity
        :param person_id: The ID of a person
        :param activity_id: The ID of an activity
        """
        if person_id not in self.__data[activity_id].particip:
            raise PersonRepositoryException("\nERROR: No person with the given ID, " + str(person_id) +
                                            ", has been found at the " + str(activity_id) + " activity!")
        self.__data[activity_id].particip.remove(person_id)

    def rem_pers_from_all_activ(self, person_id):
        """
        Fucntion to remove a person from an activity if the person was removed from Person class
        :param person_id: The ID of a person
        """
        for activity in self.__data:
            if person_id in self.__data[activity].particip:
                self.__data[activity].particip.remove(person_id)

    def add_pers_to_all_activ(self, person_id, activity_list):
        """
        Function to create a list of activities where a person is enrolled
        :param person_id: The ID of a person
        :param activity_list: The list of activities
        """
        for activ in activity_list:
            self.__data[activ].particip.append(person_id)

    def check_date(self, date, time, description):
        """
        Function to verify if a two activities have the same date
        :param date: The date of an activity
        :param time: The time of an activity
        :param description: The description of an activity
        """
        for acti in self.activity:
            date_acti = str(self.activity[acti].date)
            date_acti = date_acti.split("-")
            date_acti = "/".join(date_acti)
            time_acti = str(self.activity[acti].time)
            time_acti = time_acti.split(":")
            time_acti = ":".join(time_acti)
            if date == date_acti and time == time_acti and description.lower() in self.activity[
                acti].description.lower():
                raise ActivityRepositoryException("\nERROR: An activity on the date, " + str(date) + ", at the time, "
                                                  + str(time) + ", with the description, " + str(description) +
                                                  ", already exists!")

    def check_activity_id_update(self, activity_id):
        """
        Function to verify if an activity is from the list or not
        :param activity_id: The ID of an activity
        """
        if activity_id not in self.__data:
            raise ActivityRepositoryException("\nERROR: No activity with the given ID, " + str(activity_id) +
                                              ", has been found!")

    def check_activity_id_if_ext(self, activity_id):
        """
        Function to verify if two activities have the same activity ID
        :param activity_id: The ID of an activity
        """
        for acti in self.activity:
            if activity_id == self.activity[acti].activity_id:
                raise ActivityRepositoryException("\nERROR: An activity with the given ID, " + str(activity_id) +
                                                  ", already exists!")

    def check_activity_id_if_not_ext(self, activity_id):
        """
        Function to verify if an activity is from the list or not
        :param activity_id: The ID of an activity
        """
        if activity_id not in self.__data:
            raise ActivityRepositoryException("\nERROR: No activity with the given ID, " + str(activity_id) +
                                              ", has been found!")

    def get_max_activity_id(self):
        """
        Function to get the maximum of an activity ID
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

    def find_date(self, date):
        """
        Function to search an activity in the dictionary by date
        :param date: The date of an activity
        :return: The list of activities by date
        """
        val = filter(self.__data, lambda el: str(date) in str(el.date))

        return val

    def find_time(self, time):
        """
        Function to search an activity in the dictionary by time
        :param time: The time of an activity
        :return: The list of activities by time
        """
        val = filter(self.__data, lambda el: str(time) in str(el.time))

        return val

    def find_description(self, description):
        """
        Function to search an activity in the dictionary by description
        :param description: The description of an activity
        :return: The list of activities by description
        """
        description = description.casefold()

        val = filter(self.__data, lambda el: description in (el.description).casefold())

        return val

    def statistics_activity_date(self, date):
        """
        Function for the statistic of activities of a date sorted by time
        :param date: The date of an activity
        :return: The sorted list of activities of a date
        """
        date = str(date).split("/")
        date = "-".join(date)
        result = filter(self.__data, lambda el: str(el.date) == date)
        tmp = list()
        for i in result:
            tmp.append([result[i].activity_id, result[i]])
        if self.__custom:
            tmp = sort(tmp, self.compare_func)
            tmp.reverse()
        else:
            tmp.sort(reverse=True)
        return tmp

    def statistics_activity_person(self, person_id):
        """
        Function for activities with a given person, a list with all upcoming activities to which a given person
        will participate
        :param person_id: The ID of a person
        :return: The list of activities to which a given person will participate
        """
        tmp = list()
        curr_date = datetime.datetime.today().strftime('%Y-%m-%d')

        result = filter(self.__data, lambda el: person_id in el.particip and str(el.date) > curr_date)

        for i in result:
            tmp.append([result[i].activity_id, result[i]])
        if self.__custom == True:
            tmp = sort(tmp, self.compare_func)
            tmp.reverse()
        else:
            tmp.sort(reverse=True)
        return tmp

    def sort_elem(self, ls):
        """
        Function for the key of a dictionary
        :param ls: The key
        :return: The key form position 2
        """
        return ls[1]

    def compare_func(self, el1, el2):
        return el1 < el2

    def num_activ_day(self, date):
        """
        Function for the number of activities in a date
        :param date: The date you want
        :return: The number of activities
        """
        count = 0
        for acti in self.activity:
            date_acti = str(self.activity[acti].date)
            date_acti = date_acti.split("-")
            date_acti = "/".join(date_acti)
            if date == date_acti:
                count += 1
        return count

    def statistics_busy_days(self):
        """
        Function for the list of upcoming dates with activities, sorted in ascending order of the free time in that day,
        sorted from the busiest day to the quietest day, which means how much an activity is repetead
        :return: The list of activities of upcoming dates with activities and the number of total activities
        """
        result = list()
        tmp = dict()
        num = 0

        for acti in self.activity:
            date_acti = str(self.activity[acti].date)
            date_acti = date_acti.split("-")
            date_acti = "/".join(date_acti)
            curr_date = datetime.datetime.today().strftime("%Y/%m/%d")
            if date_acti > curr_date:
                count = self.num_activ_day(date_acti)
                tmp[self.activity[acti].activity_id] = [date_acti, count]
        for val in tmp.values():
            if val in result:
                continue
            else:
                result.append(val)
                num += val[1]
        result.sort(key=self.sort_elem)
        return [result, num]



