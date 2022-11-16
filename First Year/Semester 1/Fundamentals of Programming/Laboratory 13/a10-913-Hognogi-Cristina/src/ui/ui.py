from src.exception.exception import *
from src.validators.validators import *
from src.domain.person_domain import Person
from src.domain.activity_domain import Activity
import string

from functools import partial
from configparser import ConfigParser
import ast
import pickle
import os


class UI:
    """
    A class that handles the UI of the programme
    """
    def __init__(self, person_service, activity_service, undo_service):
        self.__person_serv = person_service
        self.__activity_serv = activity_service
        self.__undo_service = undo_service

        self.__person_AI = self.__person_serv.get_max_person_id() + 1
        self.__activity_AI = self.__activity_serv.get_max_activity_id() + 1

    def list_persons(self):
        print("\nThere are " + str(len(self.__person_serv.get_persons())) + " persons in total.")
        for i in self.__person_serv.get_persons():
            print(self.__person_serv.get_persons()[i])
        print("")

    def list_activities(self):
        print("\nThere are " + str(len(self.__activity_serv.get_activities())) + " activities in total.")
        for i in self.__activity_serv.get_activities():
            print(self.__activity_serv.get_activities()[i])
        print("")

    def ui_add_person(self):
        while True:
            try:
                person_id = input("Input the ID of your new person: ")
                BackValidator.check_back(person_id)
                PersonValidator.id_check(person_id)
                person_id = int(person_id)
                PersonValidator.id_check_form(person_id)
                self.__person_serv.check_person_id_if_ext(person_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

        while True:
            try:
                name = input("Input the name of your new person: ")
                BackValidator.check_back(name)
                PersonValidator.name_check(name)
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)

        while True:
            try:
                phone_number = input("Input the phone number of your new person: ")
                BackValidator.check_back(phone_number)
                PersonValidator.phone_number_check(phone_number)
                self.__person_serv.check_phone_number(phone_number)
                self.__person_serv.add_person(self.__person_AI, string.capwords(name), phone_number)
                self.__undo_service.add_undo_op(partial(self.__person_serv.remove_person, self.__person_AI),
                                                partial(self.__person_serv.add_person, self.__person_AI, string.capwords(name),
                                                        phone_number))
                self.__person_AI += 1
                print("\nPerson, " + str(self.__person_AI) + ", successfully added!")
                self.list_persons()
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_add_activity(self):
        while True:
            try:
                activity_id = input("Input the activity ID of your new activity: ")
                BackValidator.check_back(activity_id)
                ActivityValidator.id_check(activity_id)
                activity_id = int(activity_id)
                ActivityValidator.id_check_form(activity_id)
                self.__activity_serv.check_activity_id_if_ext(activity_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

        while True:
            try:
                date = input("Input the date (format: YYYY/MM/DD) of your new activity: ")
                BackValidator.check_back(date)
                ActivityValidator.date_check(date)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)

        while True:
            try:
                time = input("Input the time (format: HH:MM:SS) of your new activity: ")
                BackValidator.check_back(time)
                ActivityValidator.time_check(time)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)

        while True:
            try:
                description = input("Input the description of your new activity: ")
                BackValidator.check_back(description)
                ActivityValidator.description_check(description)

                person_id = None

                self.__activity_serv.check_date(date, time, description)

                self.__activity_serv.add_activity(self.__activity_AI, date, time, string.capwords(description), person_id)
                self.__undo_service.add_undo_op(partial(self.__activity_serv.remove_activity, self.__activity_AI),
                                                partial(self.__activity_serv.add_activity, self.__activity_AI, date, time,
                                                        string.capwords(description), person_id))
                self.__activity_AI += 1
                print("\nActivity, " + str(self.__activity_AI) + ", successfully added!")
                self.list_activities()
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_rem_person(self):
        while True:
            try:
                person_id = input("\nInput the ID of the person you want to remove: ")
                BackValidator.check_back(person_id)
                PersonValidator.id_check(person_id)
                person_id = int(person_id)
                PersonValidator.id_check_form(person_id)
                self.__person_serv.check_person_id_if_not_ext(person_id)

                activity_list = self.__activity_serv.get_acti_pers_id(person_id)

                old_name = self.__person_serv.get_person_name(person_id)
                old_phone_number = self.__person_serv.get_person_phone_number(person_id)

                self.__undo_service.add_undo_op(partial(self.__person_serv.add_person, person_id, old_name, old_phone_number),
                                                partial(self.__person_serv.remove_person, person_id),
                                                (partial(self.__activity_serv.add_pers_to_all_activ, person_id,
                                                         activity_list),
                                                 partial(self.__activity_serv.rem_pers_from_all_activ, person_id)))

                self.__person_serv.remove_person(person_id)
                self.__activity_serv.rem_pers_from_all_activ(person_id)

                print("\nPerson, " + str(person_id) + ", successfully removed!")
                self.list_persons()
                break

            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_rem_activity(self):
        while True:
            try:
                activity_id = input("Input the ID of the activity you want to remove: ")
                BackValidator.check_back(activity_id)
                ActivityValidator.id_check(activity_id)
                activity_id = int(activity_id)
                self.__activity_serv.check_activity_id_if_not_ext(activity_id)

                old_date = self.__activity_serv.get_activities_date(activity_id)
                old_time = self.__activity_serv.get_activities_time(activity_id)
                old_description = self.__activity_serv.get_activities_description(activity_id)

                self.__undo_service.add_undo_op(
                    partial(self.__activity_serv.add_activity, activity_id, old_date, old_time, old_description, None),
                    partial(self.__activity_serv.remove_activity, activity_id))

                self.__activity_serv.remove_activity(activity_id)

                print("\nActivity, " + str(activity_id) + ", successfully removed!")
                self.list_activities()
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_upd_person(self):
        while True:
            try:
                person_id = input("Input the ID of the person you want to update: ")
                BackValidator.check_back(person_id)
                PersonValidator.id_check(person_id)
                person_id = int(person_id)
                PersonValidator.id_check_form(person_id)
                self.__person_serv.check_person_id_if_not_ext(person_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

        while True:
            try:
                name = input("Input the new name of your new person: ")
                BackValidator.check_back(name)
                PersonValidator.name_check(name)
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)

        while True:
            try:
                phone_number = input("Input the new phone number: ")
                BackValidator.check_back(phone_number)
                PersonValidator.phone_number_check(phone_number)
                self.__person_serv.check_phone_number(phone_number)

                old_name = self.__person_serv.get_person_name(person_id)
                old_phone_number = self.__person_serv.get_person_phone_number(person_id)

                self.__person_serv.update_person(person_id, string.capwords(name), phone_number)

                self.__undo_service.add_undo_op(
                    partial(self.__person_serv.update_person, person_id, old_name, old_phone_number),
                    partial(self.__person_serv.update_person, person_id, name, phone_number))

                print("\nPerson, " + str(person_id) + ", successfully updated!")
                self.list_persons()
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_upd_activity(self):
        while True:
            try:
                activity_id = input("Input the ID of the activity you want to update: ")
                BackValidator.check_back(activity_id)
                ActivityValidator.id_check(activity_id)
                activity_id = int(activity_id)
                ActivityValidator.id_check_form(activity_id)
                self.__activity_serv.check_activity_id_if_not_ext(activity_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

        while True:
            try:
                date = input("Input the new date (format: YYYY/MM/DD) of your new activity: ")
                BackValidator.check_back(date)
                ActivityValidator.date_check(date)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)

        while True:
            try:
                time = input("Input the new time (format: HH:MM:SS) of your new activity: ")
                BackValidator.check_back(time)
                ActivityValidator.time_check(time)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)

        while True:
            try:
                description = input("Input the new description of your new activity you want to update: ")
                BackValidator.check_back(description)
                ActivityValidator.description_check(description)

                old_date = self.__activity_serv.get_activities_date(activity_id)
                old_time = self.__activity_serv.get_activities_time(activity_id)
                old_description = self.__activity_serv.get_activities_description(activity_id)

                self.__activity_serv.check_date(date, time, description)

                self.__activity_serv.update_activity(activity_id, date, time, string.capwords(description))

                self.__undo_service.add_undo_op(
                    partial(self.__activity_serv.update_activity, activity_id, old_date, old_time, old_description),
                    partial(self.__activity_serv.update_activity, activity_id, date, time, description))

                print("\nActivity, " + str(activity_id) + ", successfully updated!")
                self.list_activities()
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_add_person_to_activity(self):
        while True:
            try:
                person_id = input("Input the person ID you want to add to an activity: ")
                BackValidator.check_back(person_id)
                ActivityPersonValidator.id_check_prs(person_id)
                person_id = int(person_id)
                ActivityPersonValidator.id_check_form_prs(person_id)
                self.__person_serv.check_person_id_update(person_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivPersValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

        while True:
            try:
                activity_id = input("Input the activity ID where you want to add the person: ")
                BackValidator.check_back(activity_id)
                ActivityPersonValidator.id_check_act(activity_id)
                activity_id = int(activity_id)
                ActivityPersonValidator.id_check_form_act(activity_id)
                self.__activity_serv.check_activity_id_update(activity_id)

                self.__activity_serv.add_person_to_activity(person_id, activity_id)

                self.__undo_service.add_undo_op(
                    partial(self.__activity_serv.rem_person_to_activity, person_id, activity_id),
                    partial(self.__activity_serv.add_person_to_activity, person_id, activity_id))

                print("\nPerson, " + str(person_id) + ", has been succesfully added to, " + str(activity_id) +
                      ", activity!")
                self.list_activities()
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivPersValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_rem_person_to_activity(self):
        while True:
            try:
                person_id = input("Input the person ID you want to remove from an activity: ")
                BackValidator.check_back(person_id)
                ActivityPersonValidator.id_check_prs(person_id)
                person_id = int(person_id)
                ActivityPersonValidator.id_check_form_prs(person_id)
                self.__person_serv.check_person_id_update(person_id)
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivPersValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

        while True:
            try:
                activity_id = input("Input the activity ID of the activity where the person is enrolled: ")
                BackValidator.check_back(activity_id)
                ActivityPersonValidator.id_check_act(activity_id)
                activity_id = int(activity_id)
                ActivityPersonValidator.id_check_form_act(activity_id)
                self.__activity_serv.check_activity_id_update(activity_id)
                self.__activity_serv.rem_person_to_activity(person_id, activity_id)

                self.__undo_service.add_undo_op(
                    partial(self.__activity_serv.add_person_to_activity, person_id, activity_id),
                    partial(self.__activity_serv.rem_person_to_activity, person_id, activity_id))

                print("\nPerson, " + str(person_id) + ", has been succesfully removed from " + str(activity_id) +
                      " activity!")
                self.list_activities()
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivPersValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_find_person_name(self):
        while True:
            try:
                name = input("Input the name of the person you want to find: ")
                BackValidator.check_back(name)
                PersonValidator.name_check(name)

                if self.__person_serv.find_person_name(name) == -1:
                    raise PersonValidatorsException("\nERROR: No persons have been found!")
                else:
                    print("\nThere are " + str(len(self.__person_serv.find_person_name(name))) + " persons in total.")
                    for i in self.__person_serv.find_person_name(name):
                        print(self.__person_serv.find_person_name(name)[i])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_find_person_phone_number(self):
        while True:
            try:
                phone_number = input("Input the phone number of the persons you want to find: ")
                BackValidator.check_back(phone_number)
                PersonValidator.phone_number_check_for_find(phone_number)

                if self.__person_serv.find_person_phone_number(phone_number) == -1:
                    raise PersonValidatorsException("\nERROR: No persons have been found!")
                else:
                    print("\nThere are " + str(len(self.__person_serv.find_person_phone_number(phone_number))) +
                          " persons in total.")
                    for i in self.__person_serv.find_person_phone_number(phone_number):
                        print(self.__person_serv.find_person_phone_number(phone_number)[i])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except PersonValidatorsException as e:
                print(e)
            except PersonRepositoryException as e:
                print(e)

    def ui_find_activity_date(self):
        while True:
            try:
                date = input("Input a day/month/year of the activities you want to find: ")
                BackValidator.check_back(date)
                ActivityValidator.date_check_for_find(date)

                if self.__activity_serv.find_activity_date(date) == -1:
                    raise ActivityValidatorsException("\nERROR: No activities have been found!")
                else:
                    date_found = self.__activity_serv.find_activity_date(date)
                    print("\nThere are " + str(len(date_found)) + " activities in total.")
                    for i in date_found:
                        print(date_found[i])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_find_activity_time(self):
        while True:
            try:
                time = input("Input the time (format: HH:MM:SS) of the activities you want to find: ")
                BackValidator.check_back(time)
                ActivityValidator.time_check_for_find(time)

                if self.__activity_serv.find_activity_time(time) == -1:
                    raise ActivityValidatorsException("\nERROR: No activities have been found!")
                else:
                    time_found = self.__activity_serv.find_activity_time(time)
                    print("\nThere are " + str(len(time_found)) +
                          " activities in total.")
                    for i in time_found:
                        print(time_found[i])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_find_activity_description(self):
        while True:
            try:
                description = input("Input the description of the activities you want to find: ")
                BackValidator.check_back(description)
                ActivityValidator.description_check(description)

                if self.__activity_serv.find_activity_description(description) == -1:
                    raise ActivityValidatorsException("\nERROR: No activities have been found!")
                else:
                    print("\nThere are " + str(len(self.__activity_serv.find_activity_description(description))) +
                          " activities in total.")
                    for i in self.__activity_serv.find_activity_description(description):
                        print(self.__activity_serv.find_activity_description(description)[i])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)
            except ActivityRepositoryException as e:
                print(e)

    def ui_statistics_activity_date(self):
        while True:
            try:
                date = input("Input a date (format: YYYY/MM/DD): ")
                BackValidator.check_back(date)
                ActivityValidator.date_check(date)

                if self.__activity_serv.statistics_activity_date(date) == -1:
                    raise ActivityValidatorsException("\nERROR: No activities have been found!")
                else:
                    print("\nThere are " + str(len(self.__activity_serv.statistics_activity_date(date))) +
                          " activities in total on the given date.")
                    for i in range(len(self.__activity_serv.statistics_activity_date(date))):
                        print(self.__activity_serv.statistics_activity_date(date)[i][1])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivityValidatorsException as e:
                print(e)

    def ui_statistics_activity_person(self):
        while True:
            try:
                person_id = input("Input a person ID: ")
                BackValidator.check_back(person_id)
                ActivityPersonValidator.id_check_prs(person_id)
                person_id = int(person_id)
                ActivityPersonValidator.id_check_form_prs(person_id)

                if self.__activity_serv.statistics_activity_person(person_id) == -1:
                    raise ActivPersValidatorsException("\nERROR: No activities have been found!")
                else:
                    activ_found = self.__activity_serv.statistics_activity_person(person_id)
                    print("\nThere are " + str(len(activ_found)) +
                          " upcoming activities for the person with ID " + str(person_id) + ".")

                    for i in range(len(activ_found)):
                        print(activ_found[i][1])
                print("")
                break
            except BackValidatorException as e:
                print(e)
                return
            except ActivPersValidatorsException as e:
                print(e)

    def ui_statistics_activity_busy_days(self):
        print("\nThere are " + str(self.__activity_serv.statistics_busy_days()[1]) + " upcoming activities.")
        for i in range(len(self.__activity_serv.statistics_busy_days()[0])):
            date = self.__activity_serv.statistics_busy_days()[0][i][0]
            num_activ = self.__activity_serv.statistics_busy_days()[0][i][1]
            if i == len(self.__activity_serv.statistics_busy_days()[0]) - 1:
                print("There are " + str(num_activ) + " activites coming up on " + date + " (busiest day)")
            elif i == 0:
                print("There are " + str(num_activ) + " activites coming up on " + date + " (quietest day)")
            else:
                print("There are " + str(num_activ) + " activites coming up on " + date)
        print("")

    def ui_undo(self):
        try:
            self.__undo_service.undo()
            print("\nCommand successfully undone!")
        except UndoListException as ule:
            print("\n" + str(ule))

    def ui_redo(self):
        try:
            self.__undo_service.redo()
            print("\nCommand successfully redone!")
        except RedoListException as rle:
            print("\n" + str(rle))

    @staticmethod
    def print_menu():
        print("\nEnter a number to choose a menu.")
        print("\t1. Person Menu")
        print("\t2. Activity Menu")
        print("\t3. Search Menu")
        print("\t4. Statistics Menu")
        print("\t0. Exit!\n")

    @staticmethod
    def print_menu_person():
        print("Please select a command!")
        print("\t1. List of persons.")
        print("\t2. List of activities.")
        print("\t3. Add a person.")
        print("\t4. Remove a person.")
        print("\t5. Update a person.")
        print("\t6. Undo the last command.")
        print("\t7. Redo the last command.")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_activity():
        print("Please select a command!")
        print("\t1. List of activities.")
        print("\t2. List of persons.")
        print("\t3. Add an activity.")
        print("\t4. Remove an activity.")
        print("\t5. Update an activity.")
        print("\t6. Undo the last command.")
        print("\t7. Redo the last command.")
        print("\t8. Manage Activities Menu")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_add_remove():
        print("Please select a command!")
        print("\t1. List of activities")
        print("\t2. List of persons.")
        print("\t3. Add a person to an activity.")
        print("\t4. Remove a person from an activity.")
        print("\t5. Undo the last command.")
        print("\t6. Redo the last command.")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_search():
        print("Please select a command!")
        print("\t1. Search Menu For Person")
        print("\t2. Search Menu For Activity")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_search_person():
        print("Please select a command!")
        print("\t1. List of persons")
        print("\t2. Find a person by name.")
        print("\t3. Find a person by phone number.")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_search_activity():
        print("Please select a command!")
        print("\t1. List of activities")
        print("\t2. Find an activity by date.")
        print("\t3. Find an activity by time.")
        print("\t4. Find an activity by description.")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    @staticmethod
    def print_menu_statistics():
        print("Please select a command!")
        print("\t1. List of activities")
        print("\t2. List an activity on a given date.")
        print("\t3. List busiest days.")
        print("\t4. List upcoming activites for a person.")
        print("\t0. Back.")
        print("If you enter a command and you want to cancel it just press <- !\n")

    def menu_person(self):
        print("\nPERSON MENU")
        while True:
            self.print_menu_person()
            choice = input("> ")
            if choice == "1":
                self.list_persons()
            elif choice == "2":
                self.list_activities()
            elif choice == "3":
                self.ui_add_person()
            elif choice == "4":
                self.ui_rem_person()
            elif choice == "5":
                self.ui_upd_person()
            elif choice == "6":
                self.ui_undo()
            elif choice == "7":
                self.ui_redo()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_activity(self):
        print("\nACTIVITY MENU")
        while True:
            self.print_menu_activity()
            choice = input("> ")
            if choice == "1":
                self.list_activities()
            elif choice == "2":
                self.list_persons()
            elif choice == "3":
                self.ui_add_activity()
            elif choice == "4":
                self.ui_rem_activity()
            elif choice == "5":
                self.ui_upd_activity()
            elif choice == "6":
                self.ui_undo()
            elif choice == "7":
                self.ui_redo()
            elif choice == "8":
                self.menu_add_remove()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_add_remove(self):
        print("\nMANAGE ACTIVITIES MENU")
        while True:
            self.print_menu_add_remove()
            choice = input("> ")
            if choice == "1":
                self.list_activities()
            elif choice == "2":
                self.list_persons()
            elif choice == "3":
                self.ui_add_person_to_activity()
            elif choice == "4":
                self.ui_rem_person_to_activity()
            elif choice == "5":
                self.ui_undo()
            elif choice == "6":
                self.ui_redo()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_search(self):
        print("\nSEARCH MENU")
        while True:
            self.print_menu_search()
            choice = input("> ")
            if choice == "1":
                self.menu_search_person()
            elif choice == "2":
                self.menu_search_activity()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_search_person(self):
        print("\nSEARCH PERSON MENU")
        while True:
            self.print_menu_search_person()
            choice = input("> ")
            if choice == "1":
                self.list_persons()
            elif choice == "2":
                self.ui_find_person_name()
            elif choice == "3":
                self.ui_find_person_phone_number()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_search_activity(self):
        print("\nSEARCH ACTIVITY MENU")
        while True:
            self.print_menu_search_activity()
            choice = input("> ")
            if choice == "1":
                self.list_activities()
            elif choice == "2":
                self.ui_find_activity_date()
            elif choice == "3":
                self.ui_find_activity_time()
            elif choice == "4":
                self.ui_find_activity_description()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu_statistics(self):
        print("\nSTATISTICS MENU")
        while True:
            self.print_menu_statistics()
            choice = input("> ")
            if choice == "1":
                self.list_activities()
            elif choice == "2":
                self.ui_statistics_activity_date()
            elif choice == "3":
                self.ui_statistics_activity_busy_days()
            elif choice == "4":
                self.ui_statistics_activity_person()
            elif choice == "0":
                break
                self.print_menu()
            else:
                print("\nInvalid choice!")

    def menu(self):
        print("\nWelcome to my activity planner!")
        while True:
            self.print_menu()
            pick = input("> ")
            if pick == "1":
                self.menu_person()
            elif pick == "2":
                self.menu_activity()
            elif pick == "3":
                self.menu_search()
            elif pick == "4":
                self.menu_statistics()
            elif pick == "0":
                print("\nTerminating program...")
                return
            else:
                print("\nInvalid choice!")