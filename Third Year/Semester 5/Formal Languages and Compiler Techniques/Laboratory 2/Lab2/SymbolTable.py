from HashTable import HashTable

class SymbolTable:
    def __init__(self, size):
        # Initialize the SymbolTable with a given size
        self.size = size
        # Create separate hash tables for identifiers and constants
        self.identifiers_hash_table = HashTable(size)
        self.constants_hash_table = HashTable(size)

    def add_identifier(self, name):
        # Add an identifier to the identifiers hash table
        return self.identifiers_hash_table.add(name)

    def add_constant(self, name):
        # Add a constant to the constants hash table
        return self.constants_hash_table.add(name)

    def has_identifier(self, name):
        # Check if an identifier exists in the identifiers hash table
        return self.identifiers_hash_table.contains(name)

    def has_constant(self, name):
        # Check if a constant exists in the constants hash table
        return self.constants_hash_table.contains(name)

    def get_position_identifier(self, name):
        # Get the position of an identifier in the identifiers hash table
        return self.identifiers_hash_table.get_position(name)

    def get_position_constant(self, name):
        # Get the position of a constant in the constants hash table
        return self.constants_hash_table.get_position(name)

    def __str__(self):
        # Return a string representation of the SymbolTable
        return ("SymbolTable{" + "identifiers_hash_table=" + str(self.identifiers_hash_table) +
                "\nconstants_hash_table=" + str(self.constants_hash_table) + "}")