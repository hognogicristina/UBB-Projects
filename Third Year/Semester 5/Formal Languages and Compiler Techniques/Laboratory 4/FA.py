import re
from Transition import Transition  # Assuming Transition class is defined in a separate module

# Function to print a list of strings enclosed in curly braces
def print_list_of_string(list_name, lst):
    print(f"{list_name} = {{{', '.join(lst)}}}")

# Finite Automaton (FA) class
class FA:
    def __init__(self, filename):
        # Initialize the FA object with a given filename
        self.filename = filename
        self.states = []              # List to store states
        self.alphabet = []            # List to store the alphabet symbols
        self.transitions = []         # List to store transitions between states
        self.initial_state = ""       # Initial state of the FA
        self.output_states = []       # List to store output states
        try:
            self.init()  # Initialize the FA by parsing the file
        except Exception as e:
            print("Error when initializing FA")

    def init(self):
        # Initialize the FA by parsing the configuration file
        regex = re.compile("^([a-z_]*)=")
        with open(self.filename, 'r') as file:
            for line in file:
                match = regex.search(line)
                if match is None:
                    raise Exception("Invalid line: " + line)
                keyword = match.group(1)
                if keyword == "states":
                    # Parse and store the states
                    states_with_curly_brackets = line[line.index("=") + 1:]
                    states = states_with_curly_brackets[1:-1].strip()
                    self.states = [s.strip() for s in states.split(',')]
                elif keyword == "alphabet":
                    # Parse and store the alphabet symbols
                    alphabet_with_curly_brackets = line[line.index("=") + 1:]
                    alphabet = alphabet_with_curly_brackets[1:-1].strip()
                    self.alphabet = [s.strip() for s in alphabet.split(',')]
                elif keyword == "out_states":
                    # Parse and store the output states
                    output_states_with_curly_brackets = line[line.index("=") + 1:]
                    output_states = output_states_with_curly_brackets[1:-1].strip()
                    self.output_states = [s.strip() for s in output_states.split(',')]
                elif keyword == "initial_state":
                    # Parse and store the initial state
                    self.initial_state = line[line.index("=") + 1:].strip()
                elif keyword == "transitions":
                    # Parse and store the transitions between states
                    transitions_with_curly_brackets = line[line.index("=") + 1:]
                    transitions = transitions_with_curly_brackets[1:-1].strip()
                    transitions_list = [t.strip() for t in transitions.split(';')]
                    for transition in transitions_list:
                        transition_without_parentheses = transition[1:-1].strip()
                        individual_values = [s.strip() for s in transition_without_parentheses.split(',')]
                        self.transitions.append(Transition(individual_values[0], individual_values[1], individual_values[2]))
                else:
                    raise Exception("Invalid line in file")

    def print_states(self):
        # Print the list of states
        print_list_of_string("states", self.states)

    def print_alphabet(self):
        # Print the list of alphabet symbols
        print_list_of_string("alphabet", self.alphabet)

    def print_output_states(self):
        # Print the list of output states
        print_list_of_string("out_states", self.output_states)

    def print_initial_state(self):
        # Print the initial state
        print(f"initial_state = {self.initial_state}")

    def print_transitions(self):
        # Print the list of transitions
        print("transitions = {", end="")
        for i, transition in enumerate(self.transitions):
            if i != len(self.transitions) - 1:
                print(f"({transition.get_from()}, {transition.get_to()}, {transition.get_label()}); ", end="")
            else:
                print(f"({transition.get_from()}, {transition.get_to()}, {transition.get_label()})", end="")
        print("}")

    def check_accepted(self, word):
        # Check if a given word is accepted by the FA
        word_as_list = list(word)
        current_state = self.initial_state
        for c in word_as_list:
            found = False
            for transition in self.transitions:
                if transition.get_from() == current_state and transition.get_label() == c:
                    current_state = transition.get_to()
                    found = True
                    break
            if not found:
                return False
        return current_state in self.output_states

    def get_next_accepted(self, word):
        # Get the longest accepted prefix of a given word
        current_state = self.initial_state
        accepted_word = ""
        for c in word:
            new_state = None
            for transition in self.transitions:
                if transition.get_from() == current_state and transition.get_label() == c:
                    new_state = transition.get_to()
                    accepted_word += c
                    break
            if new_state is None:
                if current_state not in self.output_states:
                    return None
                else:
                    return accepted_word
            current_state = new_state
