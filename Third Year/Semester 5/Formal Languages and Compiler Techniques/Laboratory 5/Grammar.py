class Grammar:
    EPSILON = "epsilon"

    def __init__(self):
        self.N = []  # non-terminals
        self.E = []  # terminals
        self.S = ""  # starting symbol/ axiom
        self.P = {}  # finite set of productions

    def rebuild(self):
        self.N = []
        self.E = []
        self.S = ""
        self.P = {}

    def __processLine(self, line: str, delimiter=' '):
        elements = line.strip().strip('{}').split(delimiter)
        if len(elements) > 1:
            elements[0] += delimiter
            elements[0:2] = [''.join(elements[0:2])]

        return [element.strip() for element in elements if element]

    def read_from_file(self, file_name: str):
        self.rebuild()
        with open(file_name) as file:
            line = next(file)
            self.N = self.__processLine(line.split('=')[1], ', ')

            line = next(file)
            self.E = self.__processLine(line[line.find('=') + 1:-1].strip(), ', ')

            line = next(file)
            self.S = self.__processLine(line.split('=')[1], ', ')[0]

            line = file.readline()
            while line.strip() and ' -> ' not in line:
                line = file.readline()

            while line:
                if ' -> ' in line:
                    source, productions = line.split(" -> ")
                    source = source.strip()
                    for production in productions.split('|'):
                        production = production.strip().replace('epsilon', Grammar.EPSILON).split()
                        if source in self.P:
                            self.P[source].append(production)
                        else:
                            self.P[source] = [production]
                line = file.readline()

    def check_cfg(self):
        has_tarting_symbol = False
        for key in self.P.keys():
            if key == self.S:
                has_tarting_symbol = True
            if key not in self.N[0].split():
                return False
        if not has_tarting_symbol:
            return False
        for production in self.P.values():
            for rhs in production:
                for value in rhs:
                    if value not in self.N[0].split() and value not in self.E[0].split() and value != Grammar.EPSILON:
                        return False
        return True

    def __str__(self):
        result = "N = " + str(self.N) + "\n"
        result += "E = " + str(self.E) + "\n"
        result += "S = " + str(self.S) + "\n"
        result += "P = " + str(self.P) + "\n"
        return result
