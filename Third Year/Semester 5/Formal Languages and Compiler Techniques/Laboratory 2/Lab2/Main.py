from SymbolTable import SymbolTable

def main():
    symbol_table = SymbolTable(10)

    # Add some identifiers and constants
    symbol_table.add_identifier("variable1")
    symbol_table.add_identifier("variable2")
    symbol_table.add_constant(42)
    symbol_table.add_constant(3)

    # Check if identifiers and constants are in the symbol table
    print("Is 'variable1' an identifier?", symbol_table.has_identifier("variable1"))
    print("Is 'variable2' an identifier?", symbol_table.has_identifier("variable2"))
    print("Is 'variable3' an identifier?", symbol_table.has_identifier("variable3"))
    print("Is '42' a constant?", symbol_table.has_constant(42))
    print("Is '3' a constant?", symbol_table.has_constant(3))

    # Get the positions (bucket indexes) for identifiers and constants
    print("Position of 'variable1' in identifiers:", symbol_table.get_position_identifier("variable1"))
    print("Position of 'variable2' in identifiers:", symbol_table.get_position_identifier("variable2"))
    print("Position of '42' in constants:", symbol_table.get_position_constant(42))
    print("Position of '3' in constants:", symbol_table.get_position_constant(3))

    # Print the symbol table
    print(symbol_table)

if __name__ == "__main__":
    main()
