from src.exception.exception import ActivityDomainException
from datetime import datetime


class Activity:
    """
    A class that handles the domain of the Activity class
    """

    def __init__(self, activity_id, date, time, description, person_id=None):
        self.__activity_id = activity_id
        self.__person_id = person_id
        self.__particip = person_id if not person_id is None else []
        self.__date = date
        self.__time = time
        self.__description = description

    @property
    def particip(self):
        """
        Getter for a person ID that participate to an activity
        :return: The ID person
        """
        return self.__particip

    @property
    def activity_id(self):
        """
        Getter for a activity ID
        :return: The ID activity
        """
        return self.__activity_id

    @property
    def person_id(self):
        """
        Getter for a person ID
        :return: The ID person
        """
        return self.__person_id

    @property
    def date(self):
        """
        Getter for the activity date
        :return: The date of the activity
        """
        return self.__date

    @date.setter
    def date(self, new_date):
        """
        Setter for the activity date, a new string date
        :param date: The new string date
        """
        self.__date = new_date

    @property
    def time(self):
        """
        Getter for the activity time
        :return: The time of the activity
        """
        return self.__time

    @time.setter
    def time(self, new_time):
        """
        Setter for the activity time, a new string time
        :param time: The new string time
        """
        self.__time = new_time

    @property
    def description(self):
        """
        Getter for te activity description
        :return: The description of the activity
        """
        return self.__description

    @description.setter
    def description(self, new_description):
        """
        Setter for the activity description, a new string description
        :param description: The new string description
        """
        self.__description = new_description

    def __eq__(self, other):
        """
        Function for to verify if a function is repetead
        :param other: A other value for the parameter
        :return: The actual parameter being equal with the new ones
        """
        if isinstance(other, Activity) is False:
            return False
        return self.activity_id == other.activity_id and self.time == other.time and \
               self.date == other.date and self.description == other.description and self.person_id == other.person_id

    def __str__(self):
        """
        Function to print the dictionary plus to implement the datetime
        :return: The dictionary of activity
        """
        date_time = str(self.__date)  # date_time = "2021/11/12"
        if "-" in date_time:  # checks pre-generated dates
            date_time = date_time.split("-")
            date_time = "/".join(date_time)
        return "Activity: " + str(self.__activity_id) + ", Date: " + str(date_time) + ", Time: " + str(
            self.__time) + ", Description: " + self.__description + ", Participants: " + str(self.__particip)

    def to_dict(self):
        return {"activity_id": self.__activity_id, "person_id": self.__person_id, "particip": self.__particip,
                "date": self.__date, "time": self.__time, "description": self.__description}
