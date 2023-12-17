class HashTable:
    def __init__(self, capacity):
        self.hashTable = [[] for _ in range(capacity)]
        self.capacity = capacity
        self.next = 0

    def get_capacity(self):
        return self.capacity

    def hash(self, key):
        if isinstance(key, int):
            return key % self.capacity
        elif isinstance(key, str):
            hash_val = 5381
            for c in key:
                hash_val = ((hash_val << 5) + hash_val) + ord(c)
            return abs(hash_val) % self.capacity

    def contains(self, key):
        hash_value = self.get_hash_value(key)
        for item in self.hashTable[hash_value]:
            if item[0] == key:
                return True
        return False

    def get_hash_value(self, key):
        hash_value = -1
        if isinstance(key, int):
            hash_value = self.hash(key)
        elif isinstance(key, str):
            hash_value = self.hash(key)
        return hash_value

    def add(self, key):
        hash_value = self.get_hash_value(key)
        self.hashTable[hash_value].append([key, self.next])
        self.next += 1
        return [hash_value, self.next - 1]

    def get_position(self, key):
        hash_value = self.get_hash_value(key)
        if hash_value != -1:
            return [hash_value, self.hashTable[hash_value][0][1]]
        return -1

    def __str__(self):
        return str(self.hashTable)

    def to_list(self):
        return self.hashTable
