from pathlib import Path


class Parser:
    def __init__(self, grammar, sequence_file, out_file):
        self.grammar = grammar
        self.out_file = out_file
        self.sequence = self.read_sequence(sequence_file)
        self.working = []
        self.input = [self.grammar.get_start_symbol()]
        self.current_production_indices = {}
        self.another_try_performed = False
        self.state = "q"
        self.index = 0

    def read_sequence(self, seq_file):
        Path("out").mkdir(parents=True, exist_ok=True)
        open(self.out_file, "w").close()

        terminals = self.grammar.get_terminals()[0].split()
        terminal_id_mapping = {}
        for i, terminal in enumerate(terminals):
            terminal_id_mapping[i + 1] = terminal

        seq = []
        with open(seq_file) as f:
            if seq_file == "sequence/PIF.out":
                lines = f.readlines()
                for line in lines:
                    parts = line.split(" -> ")
                    if len(parts) == 2:
                        token_id = int(parts[0].strip())
                        seq.extend([terminal_id_mapping[token_id]])
            else:
                line = f.readline()
                while line:
                    seq.append(line.strip())
                    line = f.readline()
        return seq

    def get_situation(self):
        msg = f"({self.state}, {self.index}, {self.working}, {self.input})\n"
        with open(self.out_file, "a") as f:
            f.write(msg)

        print(msg)

    def expand(self):
        msg = "|--- expand\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        non_terminal = self.input.pop(0)
        self.working.append((non_terminal, 0))
        new_production = self.grammar.get_productions_for_non_terminal(non_terminal)[0]
        self.input = new_production + self.input

    def advance(self):
        msg = "|--- advance\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        self.working.append(self.input.pop(0))
        self.index += 1

    def momentary_insuccess(self):
        msg = "|--- momentary insuccess\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        self.state = "b"

    def back(self):
        msg = "|--- back\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        item = self.working.pop()
        self.input.insert(0, item)
        self.index -= 1

    def success(self):
        msg = "|--- success\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        self.state = "f"
        msg = f"(f, {self.index}, {self.working}, {self.input})\n=> sequence is syntactically correct\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

    def another_try(self):
        msg = "|--- another try\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        if self.working:
            last_nt = self.working.pop()
            nt, production_nr = last_nt

            productions = self.grammar.get_productions_for_non_terminal(nt)

            if production_nr + 1 < len(productions):
                self.state = "q"

                new_tuple = (nt, production_nr + 1)
                self.working.append(new_tuple)

                len_last_production = len(productions[production_nr])
                self.input = self.input[len_last_production:]
                new_production = productions[production_nr + 1]
                self.input = new_production + self.input
            else:
                len_last_production = len(productions[production_nr])
                self.input = self.input[len_last_production:]
                if not len(self.input) == 0:
                    self.input = [nt] + self.input
        else:
            self.state = "e"

    def error(self):
        msg = "|--- error\n"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

        self.state = "e"
        msg = f"(e, {self.index}, {self.working}, {self.input})\nNo more input to look at!"
        print(msg)
        with open(self.out_file, "a") as f:
            f.write(msg)

    def run(self):
        while (self.state != "f") and (self.state != "e"):
            self.get_situation()
            if self.state == "q":
                if len(self.input) == 0 and self.index == len(self.sequence):
                    self.success()
                else:
                    if self.input[0] in self.grammar.get_non_terminals()[0].split(" "):
                        self.expand()
                    else:
                        if self.index < len(self.sequence) and self.input[0] == self.sequence[self.index]:
                            self.advance()
                        else:
                            self.momentary_insuccess()
            else:
                if self.state == "b":
                    if self.working and self.working[-1] in self.grammar.get_terminals()[0].split(" "):
                        self.back()
                    else:
                        self.another_try()

        if self.state == "e":
            self.get_situation()
            self.error()
