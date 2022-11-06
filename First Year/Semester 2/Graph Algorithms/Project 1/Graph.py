import copy

"""
The implementation uses the Python language. For solving the problem statement we shall define a class named
TripleDictGraph which represents a directed graph, a class named UI for testing the operations and 2
additional functions for reading from a file and writing in a file. In what follows, an edge is considered
to be a tuple (origin, target). The isolated vertices are marked.
"""


class TripleDictGraph:
    def __init__(self, number_of_vertices, number_of_edges):
        # The number of vertices the graph has
        self._number_of_vertices = number_of_vertices

        # The number of edges the graph has
        self._number_of_edges = number_of_edges

        # A dictionary for keeping the inbound vertices of each vertex, the vertices are the keys
        self._dictionary_in = {}

        # A dictionary for keeping the outbound vertices of each vertex, the vertices are the keys
        self._dictionary_out = {}

        # A dictionary for keeping the edges and their costs, the edges are the keys
        self._dictionary_cost = {}

        for index in range(number_of_vertices):
            self._dictionary_in[index] = []
            self._dictionary_out[index] = []

    @property
    def dictionary_cost(self):
        # Returns the dictionary of edges and costs of the graph

        return self._dictionary_cost

    @property
    def dictionary_in(self):
        # Returns the dictionary of inbound vertices of the graph

        return self._dictionary_in

    @property
    def dictionary_out(self):
        # Returns the dictionary of outbound vertices of the graph

        return self._dictionary_out

    @property
    def number_of_vertices(self):
        # Returns the number of vertices the graph has

        return self._number_of_vertices

    @property
    def number_of_edges(self):
        # Returns the number of edges the graph has

        return self._number_of_edges

    def parse_vertices(self):
        # Iterator for the vertices of the graph

        vertices = list(self._dictionary_in.keys())
        for v in vertices:
            yield v

    def parse_inbound(self, x):
        # Iterator for the inbound vertices of the vertex x

        for y in self._dictionary_in[x]:
            yield y

    def parse_outbound(self, x):
        # Iterator for the outbound vertices of the vertex x

        for y in self._dictionary_out[x]:
            yield y

    def parse_cost(self):
        # Iterator for the edges of the graph and their costs

        keys = list(self._dictionary_cost.keys())

        for key in keys:
            yield key

    def add_vertex(self, x):
        # Add a new vertex x to the graph;
        # returns False if it doesn't add it and True otherwise
        # Precondition: the vertex x must not already exist

        if x in self._dictionary_in.keys() and x in self._dictionary_out.keys():
            return False

        self._dictionary_in[x] = []
        self._dictionary_out[x] = []
        self._number_of_vertices += 1

        return True

    def remove_vertex(self, x):
        # Remove a vertex x from the graph;
        # return False if it doesn't remove it and True otherwise

        if x not in self._dictionary_in.keys() and x not in self._dictionary_out.keys():
            return False

        self._dictionary_in.pop(x)
        self._dictionary_out.pop(x)

        for key in self._dictionary_in.keys():
            if x in self._dictionary_in[key]:
                self._dictionary_in[key].remove(x)
            elif x in self._dictionary_out[key]:
                self._dictionary_out[key].remove(x)

        keys = list(self._dictionary_cost.keys())

        for key in keys:
            if key[0] == x or key[1] == x:
                self._dictionary_cost.pop(key)
                self._number_of_edges -= 1

        self._number_of_vertices -= 1
        return True

    def in_degree(self, x):
        # Return the in degree of the vertex x or -1 if the vertex does not exist
        # Precondition: the vertex x must be an existing one

        if x not in self._dictionary_in.keys():
            return -1

        return len(self._dictionary_in[x])

    def out_degree(self, x):
        # Return the out degree of a vertex x or -1 if the vertex does not exist
        # Precondition: the vertex x must be an existing one

        if x not in self._dictionary_out.keys():
            return -1

        return len(self._dictionary_out[x])

    def add_edge(self, x, y, cost):
        # Add a new edge (x, y) to the graph;
        # returns False if it doesn't add and True otherwise
        # Precondition: the edge (x, y) must not already exist in the graph

        if x in self._dictionary_in[y]:
            return False

        elif y in self._dictionary_out[x]:
            return False

        elif (x, y) in self._dictionary_cost.keys():
            return False

        self._dictionary_in[y].append(x)
        self._dictionary_out[x].append(y)
        self._dictionary_cost[(x, y)] = cost
        self._number_of_edges += 1

        return True

    def remove_edge(self, x, y):
        # Remove an edge (x, y) from the graph;
        # returns False if it doesn't remove it and True otherwise
        # Precondition: the edge (x, y) must already exist in the graph

        if x not in self._dictionary_in.keys() or y not in self._dictionary_in.keys() or x not in self._dictionary_out. \
                keys() or y not in self._dictionary_out.keys():
            return False

        if x not in self._dictionary_in[y]:
            return False

        elif y not in self._dictionary_out[x]:
            return False

        elif (x, y) not in self._dictionary_cost.keys():
            return False

        self._dictionary_in[y].remove(x)
        self._dictionary_out[x].remove(y)
        self._dictionary_cost.pop((x, y))
        self._number_of_edges -= 1

        return True

    def find_if_edge(self, x, y):
        # Returns the cost of the edge (x, y) if it exists and False otherwise
        # Precondition: the edge (x, y) must already exist in the graph

        if x in self._dictionary_in[y]:
            return self._dictionary_cost[(x, y)]

        elif y in self._dictionary_out[x]:
            return self._dictionary_cost[(x, y)]

        return False

    def change_cost(self, x, y, cost):
        # Change the cost of an edge (x, y) to be equal to cost;
        # returns True if it changes, False otherwise
        # Precondition: the edge (x, y) must already exist in the graph

        if (x, y) not in self._dictionary_cost.keys():
            return False

        self._dictionary_cost[(x, y)] = cost
        return True

    def make_copy(self):
        # Return a copy of the graph

        return copy.deepcopy(self)


def write_graph_to_file(graph, file):
    # Receiving as parameters a graph and a file it writes in a file the graph;
    # if the file does not exist it creates it;
    # if the dictionaries used for printing, dictionary of costs and inbound dictionary,
    # are empty a ValueError will be raised
    # Precondition: the graph shouldn’t be empty

    file = open(file, "w")
    first_line = str(graph.number_of_vertices) + ' ' + str(graph.number_of_edges) + '\n'
    file.write(first_line)

    if len(graph.dictionary_cost) == 0 and len(graph.dictionary_in) == 0:
        raise ValueError("There is nothing that can be written!")

    for edge in graph.dictionary_cost.keys():
        new_line = "{} {} {}\n".format(edge[0], edge[1], graph.dictionary_cost[edge])
        file.write(new_line)

    for vertex in graph.dictionary_in.keys():
        if len(graph.dictionary_in[vertex]) == 0 and len(graph.dictionary_out[vertex]) == 0:
            new_line = "{}\n".format(vertex)
            file.write(new_line)

    file.close()


def read_graph_from_file(filename):
    # It has as a parameter a file name from which the graph should be read
    # Precondition: the file must exist

    file = open(filename, "r")
    line = file.readline()
    line = line.strip()
    vertices, edges = line.split(' ')
    graph = TripleDictGraph(int(vertices), int(edges))
    line = file.readline().strip()

    while len(line) > 0:
        line = line.split(' ')
        if len(line) == 1:
            graph.dictionary_in[int(line[0])] = []
            graph.dictionary_out[int(line[0])] = []
        else:
            graph.dictionary_in[int(line[1])].append(int(line[0]))
            graph.dictionary_out[int(line[0])].append(int(line[1]))
            graph.dictionary_cost[(int(line[0]), int(line[1]))] = int(line[2])
        line = file.readline().strip()

    file.close()
    return graph
