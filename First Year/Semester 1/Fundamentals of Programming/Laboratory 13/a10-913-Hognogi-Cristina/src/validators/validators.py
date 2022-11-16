from src.exception.exception import *


class PersonValidator:
    @staticmethod
    def id_check(person_id):
        """
        Checks if ID of a person is a number and if it is not empty. Raises PersonValidatorsException if invalid
        :param person_id: The person ID
        """
        if len(person_id.strip()) == 0:
            raise PersonValidatorsException("\nERROR: Invalid ID! ID person is empty!")

        if not person_id.isdigit():
            raise PersonValidatorsException("\nERROR: Invalid ID! The ID it has to be a number!")

    @staticmethod
    def id_check_form(person_id):
        """
        Checks if the ID has two digits. Raises PersonValidatorsException if invalid
        :param person_id: The person ID
        """
        if person_id < 10 or person_id > 99:
            raise PersonValidatorsException("\nERROR: Invalid ID! The ID has only two digits!")

    @staticmethod
    def name_check(name):
        """
        Checks if the name is formed with letters and can have also many words. Raises PersonValidatorsException if invalid
        :param name: The person name
        """
        if len(name.strip()) == 0:
            raise PersonValidatorsException("\nERROR: Invalid name! Name person is empty!")

        while True:
            if all(x.isalpha() or x.isspace() for x in name):
                break
            else:
                raise PersonValidatorsException(
                    "\nERROR: Invalid name! Name person can only contains letters and spaces!")

    @staticmethod
    def phone_number_check(phone_number):
        """
        Checks if the phone number has 10 integers and starts with '07'
        :param phone_number: The phone number of a person
        """
        if len(phone_number.strip()) == 0:
            raise PersonValidatorsException("\nERROR: Invalid phone number! The phone number is empty!")

        if not phone_number.isdigit() and len(phone_number) != 10:
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The phone number is a number which has 10 digits!")
        elif len(phone_number) != 10:
            raise PersonValidatorsException("\nERROR: Invalid phone number! The phone number includes 10 digits!")
        elif not phone_number.isdigit():
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The phone number is formed only with digits!")
        elif phone_number[0] != "0" and phone_number[1] != "7":
            raise PersonValidatorsException("\nERROR: Invalid phone number! The phone number starts with '07'!")
        elif phone_number[0] != "0":
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The first digit of the phone number is '0'!")
        elif phone_number[1] != "7":
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The sedcond digit of the phone number is '7'!")

    @staticmethod
    def phone_number_check_for_find(phone_number):
        """
        Checks if the phone number has integers and starts with '07'
        :param phone_number: The phone number of a person
        """
        if len(phone_number.strip()) == 0:
            raise PersonValidatorsException("\nERROR: Invalid phone number! The phone number is empty!")

        if not phone_number.isdigit():
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The phone number should include only numbers!")
        elif phone_number[0] != "0" and phone_number[1] != "7":
            raise PersonValidatorsException("\nERROR: Invalid phone number! The phone number starts with '07'!")
        elif phone_number[0] != "0":
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The first digit of the phone number is '0'!")
        elif phone_number[1] != "7":
            raise PersonValidatorsException(
                "\nERROR: Invalid phone number! The sedcond digit of the phone number is '7'!")


class ActivityValidator:
    @staticmethod
    def id_check(activity_id):
        """
        Checks if ID of an activity is a number and it is not empty. Raises ActivityValidatorsException if invalid
        :param activity_id: The activity ID
        """
        if len(activity_id.strip()) == 0:
            raise ActivityValidatorsException("\nERROR: Invalid ID! ID activity is empty!")

        if not activity_id.isdigit():
            raise ActivityValidatorsException("\nERROR: Invalid ID! The ID it has to be a number!")

    @staticmethod
    def id_check_form(activity_id):
        """
        Checks if the ID has two digits. Raises ActivityValidatorsException if invalid
        :param activity_id: The person ID
        """
        if activity_id < 10 or activity_id > 99:
            raise ActivityValidatorsException("\nERROR: Invalid ID! The ID has only two digits!")

    @staticmethod
    def date_check(date):
        """
        Checks if the format of the date is correct, if it does follow the format: YYYY/MM/DD. Raises
        ActivityValidatorsException if invalid
        :param date: The date when the activity happens
        """
        if len(date.strip()) == 0:
            raise ActivityValidatorsException("\nERROR: Invalid date! The date is empty!")

        while True:
            if date.isalpha():
                raise ActivityValidatorsException("\nERROR: Incorrect date format! The date contains only numbers and "
                                                  "has a specific format: YYYY/MM/DD!")

            date = date.split("/")
            if len(date) != 3:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! The date format it is: YYYY/MM/DD!")
            elif len(date[0]) != 4 and len(date[1]) != 2 and len(date[2]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! The date format it is: YYYY/MM/DD, "
                                                  "which means: the year has 4 digits, the month has 2 digits and the "
                                                  "day has also 2 digits!")
            elif len(date[0]) != 4:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! Incorrect year format! The date "
                                                  "format it is: YYYY/MM/DD, which means the year has only 4 digits!")
            elif len(date[1]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! Incorrect month format! The date "
                                                  "format it is: YYYY/MM/DD, which means the month has only 2 digits!")
            elif len(date[2]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! Incorrect date format! The date "
                                                  "format it is: YYYY/MM/DD, which means the day has only 2 digits!")

            date[1] = int(date[1])
            date[2] = int(date[2])

            if date[1] < 1 or date[1] > 12:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! Incorrect month format! There are "
                                                  "only 12 month in the calender!")
            elif date[2] < 1 or date[2] > 31:
                raise ActivityValidatorsException("\nERROR: Incorrect date format! Incorrect day format! There are "
                                                  "only 31 days on a month!")
            break

    @staticmethod
    def time_check(time):
        """
        Checks if the format of the time is correct, if it does follow the format: HH:MM:SS. Raises
        ActivityValidatorsException if invalid
        :param time: The time when the activity happens
        """
        if len(time.strip()) == 0:
            raise ActivityValidatorsException("\nERROR: Invalid time! The time is empty!")

        while True:
            if time.isalpha():
                raise ActivityValidatorsException("\nERROR: Incorrect time format! The time contains only numbers and "
                                                  "has a specific format: HH:MM:SS!")

            time = time.split(":")
            if len(time) != 3:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! The time format it is: HH:MM:SS!")
            elif len(time[0]) != 2 and len(time[1]) != 2 and len(time[2]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! The time format it is: HH:MM:SS, "
                                                  "which means: the hour has 2 digits, the minute has 2 digits "
                                                  "and the second has also 2 digits!")
            elif len(time[0]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect hours format! The time "
                                                  "format it is: HH:MM:SS, which means the hour has only 2 digits!")
            elif len(time[1]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect minutes format!The time "
                                                  "format it is: HH:MM:SS, which means minute has only 2 digits!")
            elif len(time[2]) != 2:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect seconds format! The time "
                                                  "format it is: HH:MM:SS, which means the second has only 2 digits!")

            time[0] = int(time[0])
            time[1] = int(time[1])
            time[2] = int(time[2])

            if time[0] < 0 or time[0] > 24:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect hour format! There are "
                                                  "only 24 hours on a day!")
            elif time[1] < 0 or time[1] > 60:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect minute format! There are "
                                                  "only 60 minutes on a hour!")
            elif time[2] < 0 or time[2] > 60:
                raise ActivityValidatorsException("\nERROR: Incorrect time format! Incorrect second format! There are "
                                                  "only 60 seconds on a minute!")

            break

    @staticmethod
    def description_check(description):
        """
        Checks if the descripton contains only a word formed by letter. Raises ActivityValidatorsException if invalid
        :param description: The description of an activity
        """
        if len(description.strip()) == 0:
            raise ActivityValidatorsException("\nERROR: Invalid description! The description is empty!")

        while True:
            if all(x.isalpha() for x in description):
                break
            else:
                raise ActivityValidatorsException("\nERROR: Invalid description! Description can only contain letters "
                                                  "and has only a word!")

    @staticmethod
    def date_check_for_find(date):
        """
        Checks if the date of an activity is a number. Raises ActivityValidatorsException if invalid
        :param date: The date of an activity
        """
        if not date.isdigit():
            raise ActivityValidatorsException("\nERROR: Invalid date! The date it has to be a numebr!")

    @staticmethod
    def time_check_for_find(time):
        """
        Checks if the time of an activity is a number. Raises ActivityValidatorsException if invalid
        :param time: The time of an activity
        """
        if not time.isdigit():
            raise ActivityValidatorsException("\nERROR: Invalid time! The time it has to be a numebr!")


class ActivityPersonValidator:
    @staticmethod
    def id_check_prs(person_id):
        """
        Checks if ID of a person is a number. Raises PersonValidatorsException if invalid
        :param person_id: The person ID
        """
        if not person_id.isdigit():
            raise ActivPersValidatorsException("\nERROR: Invalid ID! The ID it has to be a number!")

    @staticmethod
    def id_check_form_prs(person_id):
        """
        Checks if the ID has two digits. Raises PersonValidatorsException if invalid
        :param person_id: The person ID
        """
        if person_id < 10 or person_id > 99:
            raise ActivPersValidatorsException("\nERROR: Invalid ID! The ID has only two digits!")

    @staticmethod
    def id_check_act(activity_id):
        """
        Checks if ID of an activity is a number. Raises ActivityValidatorsException if invalid
        :param activity_id: The activity ID
        """
        if not activity_id.isdigit():
            raise ActivPersValidatorsException("\nERROR: Invalid ID! The ID it has to be a number!")

    @staticmethod
    def id_check_form_act(activity_id):
        """
        Checks if the ID has two digits. Raises ActivityValidatorsException if invalid
        :param activity_id: The person ID
        """
        if activity_id < 10 or activity_id > 99:
            raise ActivityValidatorsException("\nERROR: Invalid ID! The ID has only two digits!")


class BackValidator:
    @staticmethod
    def check_back(valid):
        """
        Checks if the parameter is the back command. Raises BackValidatorException if invalid
        :param valid: The valid comand
        """
        if valid == "<-":
            raise BackValidatorException("\nYou have canceled your command!")
