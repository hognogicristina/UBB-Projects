from DS.SymbolTable import SymbolTable
from FA.FA import FA

import os
import re


class Scanner:
    def __init__(self):
        self.program = ""
        self.tokens = []
        self.reserved_words = []
        self.symbol_table = SymbolTable(500)
        self.PIF = []
        self.index = 0
        self.current_line = 1
        self.token_positions = {}

    def read_tokens(self):
        token_file_path = os.path.join(os.getcwd(), 'language', 'token.in')
        try:
            with open(token_file_path, "r") as file:
                lines = file.read().splitlines()
                for i, line in enumerate(lines, start=1):
                    token = line.split()[0]
                    if token in ["prog", "int", "real", "str", "char", "arr", "bool", "read", "if", "else", "write", "begin", "end",
                                 "while", "const", "sys", "and", "or", "rad", "endl"]:
                        self.reserved_words.append(token)
                    else:
                        self.tokens.append(token)
                    self.token_positions[token] = i
        except FileNotFoundError:
            print("Error: 'token.in' file not found in the 'language' directory")

    def set_program(self, program):
        self.program = program

    def skip_spaces(self):
        while self.index < len(self.program) and self.program[self.index].isspace():
            if self.program[self.index] == '\n':
                self.current_line += 1
            self.index += 1

    def skip_comments(self):
        self.skip_spaces()

        while self.index < len(self.program) - 1 and self.program[self.index:self.index + 2] == '//':
            while self.index < len(self.program) and self.program[self.index] != '\n':
                self.index += 1
            self.skip_spaces()

    def treat_string_constant(self):
        regex_for_string_constant = re.compile(r'^"[a-zA-z0-9_ ?:*^+=.!]*"')
        match = regex_for_string_constant.match(self.program[self.index:])
        if not match:
            return False

        string_constant = match.group(0)
        if not self.symbol_table.has_hash(string_constant):
            position, hash_value = self.symbol_table.add_hash(string_constant)
        else:
            position, hash_value = self.symbol_table.get_position_hash(string_constant)

        token_position = self.token_positions["constant"]

        self.index += len(string_constant)
        self.PIF.append([token_position, hash_value])
        return True

    def treat_int_constant(self):
        fa = FA("fa_input/int_constant.in")
        int_constant = fa.get_next_accepted(self.program[self.index:])
        if int_constant is None:
            return False

        next_index = self.index + len(int_constant)
        if next_index < len(self.program) and self.program[next_index].isalpha():
            return False

        if re.compile(r'^[-+]?(\d+)[a-zA-Z]').match(int_constant):
            return False

        self.index += len(int_constant)

        if not self.symbol_table.has_hash(int_constant):
            position, hash_value = self.symbol_table.add_hash(int_constant)
        else:
            position, hash_value = self.symbol_table.get_position_hash(int_constant)

        token_position = self.token_positions["constant"]
        self.PIF.append([token_position, hash_value])
        return True

    def check_if_valid(self, possible_identifier, program_substring):
        if possible_identifier in self.reserved_words:
            return False
        if re.compile(r'^[#]?[A-Za-z_][A-Za-z0-9_]*: (int|char|str|real|arr)').search(program_substring):
            return True
        return self.symbol_table.has_hash(possible_identifier)

    def treat_identifier(self):
        fa = FA("fa_input/identifier.in")

        if self.program[self.index].isdigit():
            return False

        identifier = fa.get_next_accepted(self.program[self.index:])
        if identifier is None:
            return False

        if not self.check_if_valid(identifier, self.program[self.index:]):
            return False

        self.index += len(identifier)

        if not self.symbol_table.has_hash(identifier):
            position, hash_value = self.symbol_table.add_hash(identifier)
        else:
            position, hash_value = self.symbol_table.get_position_hash(identifier)

        token_position = self.token_positions["identifier"]
        self.PIF.append([token_position, hash_value])
        return True

    def treat_from_token_list(self):
        possible_token = self.program[self.index:].split(" ")[0]

        for reserved_token in self.reserved_words:
            if possible_token.startswith(reserved_token):
                regex = f"^[#]?[a-zA-Z0-9_]*{reserved_token}[a-zA-Z0-9_]+"
                if re.compile(regex).search(possible_token):
                    return False
                self.index += len(reserved_token)
                position = self.token_positions[reserved_token]
                self.PIF.append([position, -1])
                return True

        for token in self.tokens:
            if token == possible_token:
                self.index += len(token)
                position = self.token_positions[token]
                self.PIF.append([position, -1])
                return True
            elif possible_token.startswith(token):
                self.index += len(token)
                position = self.token_positions[token]
                self.PIF.append([position, -1])
                return True

        return False

    def next_token(self):
        self.skip_spaces()
        self.skip_comments()
        if self.index == len(self.program):
            return
        if self.treat_identifier():
            return
        if self.treat_string_constant():
            return
        if self.treat_int_constant():
            return
        if self.treat_from_token_list():
            return
        raise Exception(f"Lexical error: invalid token '{self.program[self.index]}' at line {self.current_line}, index {self.index}")

    def scan(self, program_file_name, output_folder):
        try:
            with open(os.path.join("language", program_file_name), "r") as file:
                self.set_program(file.read())
                while self.index < len(self.program):
                    self.next_token()

            pif_file_path = os.path.join(output_folder, "PIF.out")
            with open(pif_file_path, "w") as pif_file:
                for token, position in self.PIF:
                    pif_file.write(f"{token} -> {position}\n")

            print("Lexically correct")
        except (IOError, Exception) as e:
            raise Exception(e)
