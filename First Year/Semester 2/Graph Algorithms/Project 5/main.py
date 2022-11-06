from random import randint
from texttable import Texttable

from graph import UndirectedGraph, write_graph_to_file, read_graph_from_file


class UI:
    def __init__(self):
        self._graphs = []  # a list of graphs
        self._current = None  # the number of the graph in use

    def add_empty_graph(self):
        if self._current is None:
            self._current = 0

        graph = UndirectedGraph(0, 0)

        self._graphs.append(graph)
        self._current = len(self._graphs) - 1  # make the empty graph the current one

    def create_random_graph_ui(self):
        vertices = int(input("Enter the number of vertices: "))
        edges = int(input("Enter the number of edges: "))

        # generates a random graph with the given number of vertices and edges
        graph = self.generate_random(vertices, edges)

        if self._current is None:
            self._current = 0

        self._graphs.append(graph)
        self._current = len(self._graphs) - 1  # make the generated graph the current graph

    def generate_random(self, vertices, edges):
        if edges > vertices * (vertices - 1) // 2:  # check if the numbers are valid
            raise ValueError("Too many edges!")

        graph = UndirectedGraph(vertices, 0)
        i = 0

        while i < edges:
            x = randint(0, vertices - 1)
            y = randint(0, vertices - 1)
            cost = randint(0, 25)
            if graph.add_edge(x, y, cost):  # if the edge is valid increase the count
                i += 1

        return graph

    def read_graph_from_file_ui(self):
        filename = input("Enter the name of the file: ")  # the name of the file to read from

        if self._current is None:
            self._current = 0

        graph = read_graph_from_file(filename)
        self._graphs.append(graph)
        self._current = len(self._graphs) - 1

    def write_graph_to_file_ui(self):
        current_graph = self._graphs[self._current]
        output_file = "output" + str(self._current) + ".txt"  # creating the name of the output file
        write_graph_to_file(current_graph, output_file)

    def switch_graph_ui(self):
        print("You are on the graph number: {}".format(self._current))
        print("Available graphs: 0 - {}".format(str(len(self._graphs) - 1)))
        number = int(input("Enter the graph number you want to switch to: "))  # the number of the graph to switch to

        if not 0 <= number < len(self._graphs):
            raise ValueError("Trying to switch to a non existing graph!")
        self._current = number

    def get_number_of_vertices_ui(self):
        print("The number of vertices is: {}.".format(self._graphs[self._current].number_of_vertices))

    def get_number_of_edges_ui(self):
        print("The number of edges is: {}.".format(self._graphs[self._current].number_of_edges))

    def list_all_bound(self):
        for x in self._graphs[self._current].parse_vertices():
            line = str(x) + " :"
            for y in self._graphs[self._current].parse_bound(x):
                line = line + " " + str(y)
            print(line)  # prints a list of vertices with the corresponding vertices that form an edge

    def list_bound(self):
        vertex = int(input("Enter the vertex: "))
        line = str(vertex) + " :"

        for y in self._graphs[self._current].parse_bound(vertex):
            line = line + " " + "({}, {})".format(str(vertex), str(y))

        print(line)  # prints the list of edges that contain the specified vertex

    def parse_all_vertices(self):
        for vertex in self._graphs[self._current].parse_vertices():
            print("{}".format(vertex))  # parse all the vertices

    def get_degree_ui(self):
        vertex = int(input("Enter the vertex:"))
        degree = self._graphs[self._current].degree(
            vertex)  # get the degree of a vertex; an invalid vertex will return -1

        if degree == -1:
            print("The vertex does not exist!")
        else:
            print("The in degree of the vertex {} is {}.".format(vertex, degree))

    def check_if_edge_ui(self):
        vertex_x = int(input("Enter x = "))
        vertex_y = int(input("Enter y = "))
        edge = self._graphs[self._current].find_if_edge(vertex_x, vertex_y)  # check if there is an edge

        if edge is True:
            print("({}, {}) is an edge and it has the cost {}!".format(vertex_x, vertex_y,
                                                                       self._graphs[self._current].dictionary_costs[
                                                                           (vertex_x, vertex_y)]))
        else:
            print("({}, {}) is not an edge!".format(vertex_x, vertex_y))

    def copy_current_graph_ui(self):
        copy = self._graphs[self._current].make_copy()
        self._graphs.append(copy)  # make a copy of the current graph

    def list_all_costs(self):
        for key in self._graphs[self._current].parse_cost():
            line = "({}, {})".format(key[0], key[1]) + ": " + str(key[2])
            print(line)

    def shortestPath(self):
        x = int(input('Source vertex: '))
        y = int(input("Destination vertex: "))

        res = self._graphs[self._current].BFSShortestPath(x, y)

        if not res[0]:
            print("No path")
            return

        print(res[2][y])

    def stronglyConnected(self):
        print(self._graphs.getStronglyConnectedComponents())

    def lowestCostWalk(self):
        start = int(input('Vertex 1: '))
        end = int(input('Vertex 2: '))
        if self._graphs.negCostCycle():
            print("There are negative cost cycles")
            return
        cost = self._graphs.costWalkByLength(start, end)
        if cost[0] == 99999999999:
            print("There is no path between the 2 vertices")
        else:
            print("Lowest cost walk: ", cost[0])
            print("Path: ", list(reversed(cost[1])))

    def topoSort(self):
        graph = self._
        if graph == []:
            print("Not a DAG!")
            return
        sortG = []
        for i in range(1, len(graph) - 1):
            sortG.append(graph[i] - 1)
        print(sortG)

    def getDuration(self):

        self._graphs.setTimes()
        print("Total time: ", self._graphs.tm[self._graphs.nrVertices() - 1])
        print()
        t = Texttable()
        t.add_row(["Earliest Starting time", "Activity", "Latest Starting time"])
        for i in range(1, self._graphs.nrVertices() - 1):
            t.add_row([self._graphs.tm[i], i - 1, self._graphs.Tm[i]])
        print(t.draw())

    def getCritical(self):
        self._graphs.setTimes()
        arr = []
        for i in range(1, self._graphs.nrVertices() - 1):
            if self._graphs.tm[i] == self._graphs.Tm[i]:
                arr.append(i - 1)
        print("Critical activities: ", arr)

    def hamiltonian_cycle(self):
        treeEdges, treeCost = self._graphs[self._current].primsMST()
        tree = UndirectedGraph(self._graphs[self._current].number_of_vertices, 0)
        print(treeEdges, treeCost)

        for edge in treeEdges:
            tree.add_edge(edge[0], edge[1], 0)

        # perform a DFS to obtain the preorder traversal
        traversal = tree.DFS(0)

        for vertex in traversal:
            print(vertex, end=" ")
        print(traversal[0])

    def print_menu(self):
        print("MENU:\n"
              "0. EXIT.\n"
              "1. Create a random graph with specified number of vertices and edges.\n"
              "2. Read the graph from a text file.\n"
              "3. Write the graph in a text file.\n"
              "4. Switch the graph.\n"
              "5. Get the number of vertices.\n"
              "6. Get the number of edges.\n"
              "7. List the bound edges of a vertex.\n"
              "8. List all the bound vertices.\n"
              "9. Get the degree of a vertex.\n"
              "10. Check if there is an edge between two given vertices.\n"
              "11. Make a copy of the graph.\n"
              "12. Parse all the vertices.\n"
              "13. List all edges and their costs.\n"
              "14. Lowest length path between 2 vertices.\n"
              "15. Strongly conected components.\n"
              "16. Minimum cost walk between two vertices\n"
              "17. Topological sort\n"
              "18. Earliest and latest starting time + total time\n"
              "19. Get critical activities\n"
              "20. Hamiltonian cycle.")

    def start(self):
        print("Welcome!")
        done = False
        self.add_empty_graph()
        print("The current graph is an empty graph!")
        command_dict = {"1": self.create_random_graph_ui, "2": self.read_graph_from_file_ui,
                        "3": self.write_graph_to_file_ui, "4": self.switch_graph_ui,
                        "5": self.get_number_of_vertices_ui, "6": self.get_number_of_edges_ui,
                        "7": self.list_bound, "8": self.list_all_bound,
                        "9": self.get_degree_ui, "10": self.check_if_edge_ui,
                        "11": self.copy_current_graph_ui, "12": self.parse_all_vertices,
                        "13": self.list_all_costs, "14": self.shortestPath, "15": self.stronglyConnected,
                        "16": self.lowestCostWalk, "17": self.topoSort, "18": self.getDuration,
                        "19": self.getCritical, "20": self.hamiltonian_cycle}
        while not done:  # continue until the user selects the exit option
            try:
                self.print_menu()
                option = input("Choose an option from the menu: \n")
                if option == "0":
                    done = True
                    print("Good bye!")
                elif option in command_dict:
                    command_dict[option]()
                else:
                    print("Bad input!\n")
            except ValueError as ve:
                print(str(ve))
            except FileNotFoundError as fnfe:
                print(str(fnfe).strip("[Errno 2] "))


UI().start()
