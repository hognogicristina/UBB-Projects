class HashTable:
    # Constructor to initialize the HashTable with a given capacity
    def __init__(self, capacity):
        # Create an empty list to represent the hash table with 'capacity' empty buckets
        self.hashTable = [[] for _ in range(capacity)]
        self.capacity = capacity

    def get_capacity(self):
        return self.capacity

    def hash(self, key):
        if isinstance(key, int):
            return key % self.capacity  # Use modulo to get the hash value
        elif isinstance(key, str):
            hash_val = 5381
            for c in key:
                # Update the hash value using a hashing algorithm for strings
                hash_val = ((hash_val << 5) + hash_val) + ord(c)
            return abs(hash_val) % self.capacity

    def contains(self, key):
        # Get the hash value for the key
        hash_value = self.get_hash_value(key)
        for item in self.hashTable[hash_value]:
            if item == key:
                return True
        return False

    # Get the hash value for a given key (integer or string)
    def get_hash_value(self, key):
        hash_value = -1
        if isinstance(key, int):
            hash_value = self.hash(key)
        elif isinstance(key, str):
            hash_value = self.hash(key)
        return hash_value

    # # Add a key to the hash table
    def add(self, key):
        hash_value = self.get_hash_value(key)
        self.hashTable[hash_value].append(key)

    # Get the position (bucket index) for a key
    def get_position(self, key):
        hash_value = self.get_hash_value(key)
        if hash_value != -1:
            return hash_value  # Return the bucket index where the key would be stored
        return -1

    # Return a string representation of the hash table
    def __str__(self):
        return str(self.hashTable)