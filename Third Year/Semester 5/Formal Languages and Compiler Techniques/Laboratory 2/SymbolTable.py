from HashTable import HashTable

class SymbolTable:
    def __init__(self, size):
        # Initialize the SymbolTable with a given size
        self.size = size
        # Create a HashTable for identifiers and constants
        self.hash_table = HashTable(size)

    def add_hash(self, name):
        # Add a name to the SymbolTable
        return self.hash_table.add(name)

    def has_hash(self, name):
        # Check if the SymbolTable contains a given name
        return self.hash_table.contains(name)

    def get_position_hash(self, name):
        # Get the position (bucket index) for a given name
        return self.hash_table.get_position(name)

    def __str__(self):
        # Return a string representation of the SymbolTable
        return ("SymbolTable { " + "hash_table=" + str(self.hash_table) + " }")