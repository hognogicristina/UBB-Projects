import datetime
import unittest

from src.domain.activity_domain import Activity
from src.domain.person_domain import Person
from src.repository.memory.activity_repository import ActivityRepository
from src.repository.memory.person_repository import PersonRepository
from src.undo_redo.undo_redo import UndoRedo
from src.structure.structure import *

from functools import partial


class PersonRepoTest(unittest.TestCase):
    """
    A class that handles the testing of the PersonRepository class
    """

    def test_add_person(self):
        """
        tests the add function of the PersonRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")

        person_repo.add(person1)
        person_list = list(person_repo.person.values())
        self.assertEqual(person_list, [person1])

        person_repo.add(person2)
        person_list = list(person_repo.person.values())
        self.assertEqual(person_list, [person1, person2])

    def test_remove_person(self):
        """
        Tests the remove function of the PersonRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person3 = Person(35, "Michael Jones", "0788568215")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)

        person_repo.remove(35)
        person_list = list(person_repo.person.values())
        self.assertEqual(person_list, [person1, person2])

        person_repo.remove(33)
        person_list = list(person_repo.person.values())
        self.assertEqual(person_list, [person1])

    def test_update_person(self):
        """
        Tests the update function of the PersonRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person3 = Person(33, "Michael Jones", "0788568215")

        person_repo.add(person1)
        person_repo.add(person2)

        person_repo.update(33, "Michael Jones", "0788568215")
        person_list = list(person_repo.person.values())
        self.assertEqual(person_list, [person1, person3])

    def test_find_person_name(self):
        """
        Tests the find function by name of the PersonRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person3 = Person(32, "Michael Jones", "0788556699")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)

        num_people_found_len = len(person_repo.find_phone_number("0788556699"))

        self.assertEqual(num_people_found_len, 2)

    def test_find_person_phone_number(self):
        """
        Tests the find function by phone number of the PersonRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person3 = Person(32, "Gillian Flynn", "0781568215")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)

        num_people_found_len = len(person_repo.find_name("Gillian Flynn"))

        self.assertEqual(num_people_found_len, 2)


class ActivityRepoTest(unittest.TestCase):
    """
    A class that handles the testing of the ActivityRepository class
    """

    def test_add_activity(self):
        """
        tests the add function of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10, 33])
        activity2 = Activity(4, datetime.date(2022, 3, 16), datetime.time(16, 25), "Skating", [35])

        activity_repo.add(activity1)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list, [activity1])

        activity_repo.add(activity2)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list, [activity1, activity2])

    def test_remove_activity(self):
        """
        Tests the remove function of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10])
        activity2 = Activity(4, datetime.date(2022, 3, 16), datetime.time(16, 25), "Skating", [33])
        activity3 = Activity(6, datetime.date(2022, 6, 4), datetime.time(8, 40), "Swimming", [35])

        activity_repo.add(activity1)
        activity_repo.add(activity2)
        activity_repo.add(activity3)

        activity_repo.remove(6)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list, [activity1, activity2])

        activity_repo.remove(4)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list, [activity1])

    def test_update_activity(self):
        """
        Tests the update function of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10])
        activity2 = Activity(4, datetime.date(2022, 3, 16), datetime.time(16, 25), "Skating", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)

        activity_repo.update(4, datetime.date(2022, 6, 4), datetime.time(8, 40), "Swimming")
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list,
                         [activity1, Activity(4, datetime.date(2022, 6, 4), datetime.time(8, 40), "Swimming", [33])])

    def test_add_pers_to_act(self):
        """
        Tests the update function of the ActivityRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person_repo.add(person1)
        person_repo.add(person2)

        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10])
        activity_repo.add(activity1)

        activity_repo.add_pers_to_act(33, 2)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list,
                         [Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10, 33])])

    def test_rem_pers_to_act(self):
        """
        Tests the update function of the ActivityRepository class
        """
        person_repo = PersonRepository()
        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person_repo.add(person1)
        person_repo.add(person2)

        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(22, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10, 33])
        activity2 = Activity(33, datetime.date(2021, 10, 30), datetime.time(11, 20), "Scubadiving", [10])
        activity_repo.add(activity1)

        activity_repo.rem_pers_to_act(33, 22)
        activity_list = list(activity_repo.activity.values())
        self.assertEqual(activity_list,
                         [Activity(22, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [10])])

    def test_find_activity_date(self):
        """
        Tests the find function by date of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [10])
        activity2 = Activity(4, datetime.date(2022, 11, 16), datetime.time(16, 25), "Skating", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)

        date_activities_found_len = len(activity_repo.find_date("11"))

        self.assertEqual(date_activities_found_len, 2)

    def test_find_activity_time(self):
        """
        Tests the find function by time of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [10])
        activity2 = Activity(4, datetime.date(2022, 4, 15), datetime.time(13, 30), "Skating", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)

        time_activities_found_len = len(activity_repo.find_time("13"))

        self.assertEqual(time_activities_found_len, 2)

    def test_find_activity_description(self):
        """
        Tests the find function by description of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)
        activity1 = Activity(2, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [10])
        activity2 = Activity(4, datetime.date(2022, 4, 15), datetime.time(12, 35), "Scubadiving", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)

        description_activities_found_len = len(activity_repo.find_description("Scubadiving"))

        self.assertEqual(description_activities_found_len, 2)

    def test_statistics_activity_date(self):
        """
        Tests the statistics function by a date sorted by time of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)

        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556779")
        person3 = Person(11, "Arely Waters", "0765994569")
        person4 = Person(34, "Magdalena Waters", "0780056699")
        person5 = Person(14, "Kylie Waters", "0765664569")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)
        person_repo.add(person4)
        person_repo.add(person5)

        activity1 = Activity(1, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [34])
        activity2 = Activity(2, datetime.date(2022, 6, 12), datetime.time(11, 35), "Skating", [14])
        activity3 = Activity(3, datetime.date(2022, 10, 13), datetime.time(14, 30), "Swimming", [11])
        activity4 = Activity(4, datetime.date(2022, 4, 15), datetime.time(12, 35), "Boxing", [10])
        activity5 = Activity(5, datetime.date(2022, 4, 15), datetime.time(17, 30), "Dancing", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)
        activity_repo.add(activity3)
        activity_repo.add(activity4)
        activity_repo.add(activity5)

        date_activities_found_len = len(activity_repo.statistics_activity_date("2022/04/15"))

        self.assertEqual(date_activities_found_len, 2)

    def test_statistics_activity_person(self):
        """
        Tests the statistics function by hoewmany activities does a person of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)

        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556779")
        person3 = Person(11, "Arely Waters", "0765994569")
        person4 = Person(34, "Magdalena Waters", "0780056699")
        person5 = Person(14, "Kylie Waters", "0765664569")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)
        person_repo.add(person4)
        person_repo.add(person5)

        activity1 = Activity(1, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [34])
        activity2 = Activity(2, datetime.date(2022, 6, 12), datetime.time(11, 35), "Skating", [14])
        activity3 = Activity(3, datetime.date(2022, 10, 13), datetime.time(14, 30), "Swimming", [11, 14])
        activity4 = Activity(4, datetime.date(2022, 4, 15), datetime.time(12, 35), "Boxing", [10, 14])
        activity5 = Activity(5, datetime.date(2022, 12, 14), datetime.time(17, 30), "Dancing", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)
        activity_repo.add(activity3)
        activity_repo.add(activity4)
        activity_repo.add(activity5)

        person_activities_found_len = len(activity_repo.statistics_activity_person(14))

        self.assertEqual(person_activities_found_len, 3)

    def test_statistics_busy_days(self):
        """
        Tests the statistics function by the list of upcoming dates with activities, sorted in ascending order of the
        free time in that day, sorted from the busiest day to the quietest day of the ActivityRepository class
        """
        person_repo = PersonRepository()
        activity_repo = ActivityRepository(person_repo)

        person1 = Person(10, "Caroline Kepnes", "0765894569")
        person2 = Person(33, "Gillian Flynn", "0788556779")
        person3 = Person(11, "Arely Waters", "0765994569")
        person4 = Person(34, "Magdalena Waters", "0780056699")
        person5 = Person(14, "Kylie Waters", "0765664569")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)
        person_repo.add(person4)
        person_repo.add(person5)

        activity1 = Activity(1, datetime.date(2022, 11, 16), datetime.time(13, 30), "Scubadiving", [34])
        activity2 = Activity(2, datetime.date(2021, 10, 13), datetime.time(11, 35), "Skating", [14])
        activity3 = Activity(3, datetime.date(2022, 10, 13), datetime.time(14, 30), "Skating", [11])
        activity4 = Activity(4, datetime.date(2022, 10, 13), datetime.time(12, 35), "Skating", [10])
        activity5 = Activity(5, datetime.date(2021, 12, 14), datetime.time(17, 30), "Dancing", [33])

        activity_repo.add(activity1)
        activity_repo.add(activity2)
        activity_repo.add(activity3)
        activity_repo.add(activity4)
        activity_repo.add(activity5)

        days_activities_found_len = len(activity_repo.statistics_busy_days()[0])

        self.assertEqual(days_activities_found_len, 2)


class PersonTest(unittest.TestCase):
    """
    A class that handles the testing of the Person class
    """

    def test_domain_person(self):
        """
        Tests the main getters and setters of the Person class
        """
        person = Person(22, "Caroline Kepnes", "0765894569")
        self.assertEqual(person.person_id, 22)
        self.assertEqual(person.name, "Caroline Kepnes")
        person.name = "Michael Jones"
        self.assertEqual(person.name, "Michael Jones")

        self.assertEqual(person.phone_number, "0765894569")
        person.phone_number = "0765854625"
        self.assertEqual(person.phone_number, "0765854625")

    def test_person_representation(self):
        """
        Tests the string representation of the Person class
        """
        person = Person(33, "Gillian Flynn", "0788556699")
        self.assertEqual(str(person), "ID: 33, Name: Gillian Flynn, Phone Number: 0788556699")

    def test_person_equals(self):
        """
        Tests the equals operator of the Person class
        """
        person1 = Person(33, "Gillian Flynn", "0788556699")
        person2 = Person(33, "Gillian Flynn", "0788556699")
        person3 = Person(21, "Michael Jones", "0765854625")

        self.assertEqual(person1, person2)
        self.assertNotEqual(person1, person3)


class ActivityTest(unittest.TestCase):
    """
    A class that handles the testing of the Activity class
    """

    def test_domain_activity(self):
        """
        Tests the main getters and setters of the Activity class
        """
        activity = Activity(2, datetime.date(2021, 11, 12), datetime.time(13, 30), "Scubadiving", [22, 33, 55])
        self.assertEqual(activity.activity_id, 2)
        self.assertEqual(activity.date, datetime.date(2021, 11, 12))
        self.assertEqual(activity.date.day, 12)
        self.assertEqual(activity.date.month, 11)
        self.assertEqual(activity.date.year, 2021)

        activity.date = datetime.date(2019, 2, 1)
        self.assertEqual(activity.date.day, 1)
        self.assertEqual(activity.date.month, 2)
        self.assertEqual(activity.date.year, 2019)

        self.assertEqual(activity.time, datetime.time(13, 30))
        self.assertEqual(activity.time.hour, 13)
        self.assertEqual(activity.time.minute, 30)

        activity.time = datetime.time(14, 31)
        self.assertEqual(activity.time.hour, 14)
        self.assertEqual(activity.time.minute, 31)

        self.assertEqual(activity.description, "Scubadiving")
        activity.description = "Skating"
        self.assertEqual(activity.description, "Skating")

        self.assertEqual(activity.person_id, [22, 33, 55])

    def test_activity_representation(self):
        """
        Tests the string representation of the Activity class
        """
        activity = Activity(2, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55])
        self.assertEqual(str(activity),
                         "Activity: 2, Date: 2021/02/12, Time: 12:00:00, Description: Scubadiving, Participants: [22, 33, 55]")

    def test_activity_equals(self):
        """
        Tests the equals operator of the Activity class
        """
        activity1 = Activity(2, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55])
        activity2 = Activity(2, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55])
        activity3 = Activity(3, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55])
        self.assertEqual(activity1, activity2)
        self.assertNotEqual(activity1, activity3)


class UndoRedoTest(unittest.TestCase):
    """
    A class that handles the testing of the UndoRedo class
    """

    def test_add_undo_op_pers(self):
        """
        Test for undo of a Person
        """
        person_repo = PersonRepository()
        undo_redo_serv = UndoRedo()

        person_repo.add(Person(11, "Gillian Flynn", "0729364643"))
        undo_redo_serv.add_undo_op(partial(person_repo.remove, 11),
                                   partial(person_repo.add, Person(11, "Gillian Flynn", "0729364643")))
        undo_redo_serv.undo()
        self.assertEqual(person_repo.person, {})
        undo_redo_serv.redo()
        self.assertEqual(len(person_repo.person), 1)

    def test_add_redo_op_pers(self):
        """
        Test for redo of a Person
        """
        person_repo = PersonRepository()
        undo_redo_serv = UndoRedo()

        person_repo.add(Person(11, "Gillian Flynn", "0729364643"))
        undo_redo_serv.add_redo_op(partial(person_repo.add, Person(11, "Gillian Flynn", "0729364643")),
                                   partial(person_repo.remove, 11))
        undo_redo_serv.redo()
        self.assertEqual(person_repo.person, {})
        undo_redo_serv.undo()
        self.assertEqual(len(person_repo.person), 1)

    def test_add_undo_op_acti(self):
        """
        Test for undo of an Activity
        """
        person_repo = PersonRepository()
        activ_repo = ActivityRepository(person_repo)
        undo_redo_serv = UndoRedo()

        activ_repo.add(Activity(2, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55]))
        undo_redo_serv.add_undo_op(partial(activ_repo.remove, 2), partial(activ_repo.add,
                                                                          Activity(2, datetime.date(2021, 2, 12),
                                                                                   datetime.time(12, 00), "Scubadiving",
                                                                                   [22, 33, 55])))
        undo_redo_serv.undo()
        self.assertEqual(activ_repo.activity, {})
        undo_redo_serv.redo()
        self.assertEqual(len(activ_repo.activity), 1)

    def test_add_redo_op_acti(self):
        """
        Test for redo of an Activity
        """
        person_repo = PersonRepository()
        activ_repo = ActivityRepository(person_repo)
        undo_redo_serv = UndoRedo()

        activ_repo.add(Activity(2, datetime.date(2021, 2, 12), datetime.time(12, 00), "Scubadiving", [22, 33, 55]))
        undo_redo_serv.add_redo_op(partial(activ_repo.add, Activity(2, datetime.date(2021, 2, 12),
                                                                                   datetime.time(12, 00), "Scubadiving",
                                                                                   [22, 33, 55])),
                                   partial(activ_repo.remove, 2))
        undo_redo_serv.redo()
        self.assertEqual(activ_repo.activity, {})
        undo_redo_serv.undo()
        self.assertEqual(len(activ_repo.activity), 1)


class StructTest(unittest.TestCase):
    """
    A class that handles the tests for the custom data structure, the sort function and the filter function
    """

    def test_struct(self):
        """
        Test the custom Struct
        """
        person_repo = PersonRepository(custom=True)
        person_repo.person.__init__(0)

        self.assertEqual(str(person_repo.person.__next__()), "0")

        self.assertEqual(len(person_repo.person), 0)

        person_repo.person.__init__(10, 1)

        try:
            str(person_repo.person.__next__())
        except StopIteration as e:
            print(e)

        tmp = dict()
        tmp[21] = Person(21, "Gayle", "0729364643")
        tmp[22] = Person(22, "Paula", "0793586063")
        tmp[23] = Person(23, "Albert", "0714534867")

        person_repo.person.__init__(0, 3, tmp)

        self.assertEqual(person_repo.person._dict, tmp)

        person_repo.person.keys_ls = list(person_repo.person.keys())

        self.assertEqual(str(person_repo.person.__next__()), "ID: 22, Name: Paula, Phone Number: 0793586063")
        self.assertEqual(str(person_repo.person.__next__()), "ID: 23, Name: Albert, Phone Number: 0714534867")

        self.assertEqual(len(person_repo.person), 3)

        person_repo.remove(22)

        self.assertEqual(len(person_repo.person), 2)

    def test_sort(self):
        """
        Test the custom sort (gnome sort)
        """

        list = [4, 1, 9, 16]
        list = sort(list, lambda el1, el2: el1 < el2)
        self.assertEqual(list, [1, 4, 9, 16])

        list = []
        list = sort(list, lambda el1, el2: el1 < el2)
        self.assertEqual(list, [])

    def test_filter(self):
        """
        Test the custom filter
        """
        person_repo = PersonRepository()

        person1 = Person(21, "Gayle", "0729364643")
        person2 = Person(27, "Paula", "0793586063")
        person3 = Person(2, "Albert", "0714534867")

        person_repo.add(person1)
        person_repo.add(person2)
        person_repo.add(person3)

        val = filter(person_repo.person, lambda el: el.name == "Gayle" and el.phone_number == "0729364643")
        self.assertEqual(val, {person1.person_id: person1})


if __name__ == "__main__":
    unittest.main()
