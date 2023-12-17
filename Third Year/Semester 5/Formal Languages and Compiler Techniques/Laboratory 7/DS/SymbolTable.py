from DS.HashTable import HashTable


class SymbolTable:
    def __init__(self, size):
        self.size = size
        self.hash_table = HashTable(size)

    def add_hash(self, name):
        return self.hash_table.add(name)

    def has_hash(self, name):
        return self.hash_table.contains(name)

    def get_position_hash(self, name):
        return self.hash_table.get_position(name)

    def __str__(self):
        return "SymbolTable {\n" + "\n".join([str(item) for item in self.hash_table.to_list()]) + "\n}"


