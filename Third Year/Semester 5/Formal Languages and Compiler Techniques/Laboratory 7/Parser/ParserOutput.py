from tabulate import tabulate
from DS.Node import Node


class ParserOutput:
    def __init__(self, grammar, sequence_file, out_file):
        self.grammar = grammar
        self.out_file = out_file
        self.sequence = self.read_sequence(sequence_file)
        self.tree = []

    def read_sequence(self, seq_file):
        seq = []
        with open(seq_file) as f:
            line = f.readline()
            while line:
                seq.append(line.strip())
                line = f.readline()
        return seq

    def create_parsing_tree(self, working):
        father = -1
        for index in range(0, len(working)):
            if type(working[index]) == tuple:
                self.tree.append(Node(working[index][0]))
                self.tree[index].production = working[index][1]
            else:
                self.tree.append(Node(working[index]))

        for index in range(0, len(working)):
            if type(working[index]) == tuple:
                self.tree[index].father = father
                father = index
                len_prod = len(self.grammar.get_productions()[working[index][0]][working[index][1]])
                vector_indx = []
                for i in range(1, len_prod + 1):
                    vector_indx.append(index + i)
                for i in range(0, len_prod):
                    if self.tree[vector_indx[i]].production != -1:
                        offset = self.get_len_depth(vector_indx[i], working)
                        for j in range(i + 1, len_prod):
                            vector_indx[j] += offset
                for i in range(0, len_prod - 1):
                    self.tree[vector_indx[i]].sibling = vector_indx[i + 1]
            else:
                self.tree[index].father = father
                father = -1

    def get_len_depth(self, index, working):
        production = self.grammar.get_productions()[working[index][0]][working[index][1]]
        len_prod = len(production)
        sum = len_prod
        for i in range(1, len_prod + 1):
            if type(working[index + i]) == tuple:
                sum += self.get_len_depth(index + i, working)
        return sum

    def write_parsing_tree(self, state, working):
        if state != "e":
            table = [["index", "value", "father", "sibling"]]
            for index in range(0, len(working)):
                table.append([index, self.tree[index].value, self.tree[index].father, self.tree[index].sibling])

            print("Parsing tree:")
            print(tabulate(table, headers="firstrow", tablefmt="grid"))

            with open(self.out_file, "a") as f:
                f.write("\nParsing tree:\n")
                f.write(tabulate(table, headers="firstrow", tablefmt="grid"))
