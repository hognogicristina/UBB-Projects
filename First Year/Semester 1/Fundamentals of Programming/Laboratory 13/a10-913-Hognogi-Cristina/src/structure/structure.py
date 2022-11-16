from copy import deepcopy


class Structure:
	"""
	A class that handles the structure of the programme
	"""
	def __init__(self, start=0, end=0, test=False):
		self._start = start
		if test == False:
			self._dict = dict()
			self.keys_ls = list(self._dict.keys())
			self._end = end
		else:
			self._dict = test
			self.keys_ls = list(self._dict.keys())
			self._end = self.keys_ls[len(self._dict) - 1]

	def __getitem__(self, item):
		return self._dict[item]

	def __setitem__(self, key, value):
		self._dict[key] = value

	def __delitem__(self, key):
		del self._dict[key]

	def __iter__(self):
		return iter(self._dict)

	def __next__(self):
		if self._end == 0:
			return 0
		if self._start > self._end:
			raise StopIteration
		self._start += 1
		return self._dict[self.keys_ls[self._start]]

	def __len__(self):
		return len(self._dict)

	def __str__(self):
		return str(self._dict)

	def keys(self):
		return self._dict.keys()


def sort(list, function):
	"""
	Method for computing the gnome sort
	Implementation: Check each element along with the previous and the next element. If they are not in the correct
	order, it swaps the elements. If no previous element, step forward. If no next element, finish the sorting.
	:param list: List to be sorted
	:param function: Takes places as a compare function (depending with what will be compared)
	:return: Sorted list
	"""
	tmp = deepcopy(list)
	pos = 0

	if len(tmp) < 2:
		return tmp

	while pos < len(tmp):
		if pos == 0:
			pos += 1
		if not function(tmp[pos], tmp[pos - 1]):
			pos += 1
		else:
			tmp[pos], tmp[pos - 1] = tmp[pos - 1], tmp[pos]
			pos -= 1
	return tmp


def filter(dict_s, function):
	"""
	Method for filtering different things (ex: by ID, Name, Time etc)
	"""
	tmp = dict()
	for i in dict_s:
		if function(dict_s[i]):
			tmp[i] = dict_s[i]
	return tmp