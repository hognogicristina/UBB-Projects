from random import randint

from Graph import TripleDictGraph, write_graph_to_file, read_graph_from_file


class UI:
    def __init__(self):
        # A list which keeps the graphs created, used for switching between the graphs, it is empty initially
        self._graphs = []

        # An element which memorizes the current graph with which the user is working it is set to None initially
        self._current = None

    def add_empty_graph(self):
        # Creates an empty graph and adds it to the list of graphs available in the program, setting it to be the
        # Current graph also

        if self._current is None:
            self._current = 0

        graph = TripleDictGraph(0, 0)
        self._graphs.append(graph)
        self._current = len(self._graphs) - 1

    def create_random_graph_ui(self):
        # Takes as input from the user the number of vertices and edges and creates a random graph, adds it to the list
        # And sets it to be the current graph

        vertices = int(input("Enter the number of vertices: "))
        edges = int(input("Enter the number of edges: "))

        graph = self.generate_random(vertices, edges)

        if self._current is None:
            self._current = 0

        self._graphs.append(graph)
        self._current = len(self._graphs) - 1

    def generate_random(self, vertices, edges):
        # It is used by the create_random_graph_ui function for generating a random graph; it raises a ValueError if
        # The user provides too many edges, and it returns the new graph

        if edges > vertices * vertices:
            raise ValueError("Too many edges!")

        graph = TripleDictGraph(vertices, 0)

        i = 0
        while i < edges:
            x = randint(0, vertices - 1)
            y = randint(0, vertices - 1)
            cost = randint(0, 500)
            if graph.add_edge(x, y, cost):
                i += 1

        return graph

    def read_graph_from_file_ui(self):
        # Takes the filename from the input of the user and it creates a new graph using the read_graph_from_file,
        # Adds it to the list of graphs and sets it as the current graph

        filename = input("Enter the name of the file: ")

        if self._current is None:
            self._current = 0

        graph = read_graph_from_file(filename)
        self._graphs.append(graph)
        self._current = len(self._graphs) - 1

    def write_graph_to_file_ui(self):
        # Writes using the function write_graph_to_file the current graph that the program is working with in the format:
        # No_of_vertices no_of_edges
        # x y cost (this line can be repeated multiple times)

        current_graph = self._graphs[self._current]
        output_file = "output" + str(self._current) + ".txt"
        write_graph_to_file(current_graph, output_file)

    def switch_graph_ui(self):
        # Switch the graphs, the switch is done between available graphs in the self._graphs list
        # Precondition: the graph to be switched to has to exist in the list Raises ValueError if
        # the graph is not in the list

        print("You are on the graph number: {}".format(self._current))
        print("Available graphs: 0 - {}".format(str(len(self._graphs) - 1)))

        number = int(input("Enter the graph number you want to switch to: "))

        if not 0 <= number < len(self._graphs):
            raise ValueError("Trying to switch to a non existing graph!")

        self._current = number

    def get_number_of_vertices_ui(self):
        # Print the number of vertices the current graph has

        print("The number of vertices is: {}.".format(self._graphs[self._current].number_of_vertices))

    def get_number_of_edges_ui(self):
        # Print the number of edges the current graph has

        print("The number of edges is: {}.".format(self._graphs[self._current].number_of_edges))

    def list_all_outbound(self):
        # Lists all the vertices from the current graph with all their outbound vertices

        for x in self._graphs[self._current].parse_vertices():
            line = str(x) + " :"
            for y in self._graphs[self._current].parse_outbound(x):
                line = line + " " + str(y)
            print(line)

    def list_outbound(self):
        # Lists the outbound vertices of the vertex x

        vertex = int(input("Enter the vertex: "))
        line = str(vertex) + " :"

        for y in self._graphs[self._current].parse_outbound(vertex):
            line = line + " " + "({}, {})".format(str(vertex), str(y))

        print(line)

    def list_all_inbound(self):
        # Lists all the vertices from the current graph with all their inbound vertices

        for x in self._graphs[self._current].parse_vertices():
            line = str(x) + " :"
            for y in self._graphs[self._current].parse_inbound(x):
                line = line + " " + str(y)
            print(line)

    def list_inbound(self):
        # Lists the inbound vertices of the vertex x

        vertex = int(input("Enter the vertex: "))
        line = str(vertex) + " :"

        for y in self._graphs[self._current].parse_inbound(vertex):
            line = line + " " + "({}, {})".format(str(y), str(vertex))

        print(line)

    def list_all_costs(self):
        # Lists all the edges of the graph with their cost

        for key in self._graphs[self._current].parse_cost():
            line = "({}, {})".format(key[0], key[1]) + " :" + str(self._graphs[self._current].dictionary_cost[key])
            print(line)

    def parse_all_vertices(self):
        # List all the vertices of the graph

        for vertex in self._graphs[self._current].parse_vertices():
            print("{}".format(vertex))

    def add_vertex_ui(self):
        # Reads input from user for the vertex and uses the add_vertex function to add a vertex to the graph; prints a
        # Corresponding message

        vertex = int(input("Enter the new vertex: "))
        added = self._graphs[self._current].add_vertex(vertex)

        if added:
            print("Vertex added successfully!")
        else:
            print("Cannot add this vertex, it already exists!")

    def delete_vertex_ui(self):
        # Reads input from user for the vertex an uses the remove_vertex function to remove a vertex from the graph;
        # Prints a corresponding message

        vertex = int(input("Enter the vertex to be deleted: "))
        deleted = self._graphs[self._current].remove_vertex(vertex)

        if deleted:
            print("Vertex deleted successfully!")
        else:
            print("Cannot delete this vertex, it does not exist!")

    def add_edge_ui(self):
        # Reads input for vertices and cost from the user and uses the add_edge function to add an edge with a cost to
        # The graph; prints a corresponding message

        print("Add an edge (an edge is (x, y))")
        vertex_x = int(input("Enter x = "))
        vertex_y = int(input("Enter y = "))
        cost = int(input("Enter the cost of the edge: "))
        added = self._graphs[self._current].add_edge(vertex_x, vertex_y, cost)

        if added:
            print("Edge added successfully!")
        else:
            print("Cannot add this edge, it already exists!")

    def remove_edge_ui(self):
        # Reads input for vertices from the user and uses the remove_edge function to remove an edge from the graph;
        # Prints a corresponding message

        print("Remove an edge (an edge is (x, y))")
        vertex_x = int(input("Enter x = "))
        vertex_y = int(input("Enter y = "))
        deleted = self._graphs[self._current].remove_edge(vertex_x, vertex_y)

        if deleted:
            print("Edge deleted successfully!")
        else:
            print("Cannot remove this edge, it does not exist!")

    def modify_cost_ui(self):
        # Read input from the user for the vertices and the cost and uses the change_cost function to change the cost
        # of an edge; prints a corresponding message

        print("Modify the cost of an edge (an edge is (x, y))")
        vertex_x = int(input("Enter x = "))
        vertex_y = int(input("Enter y = "))
        cost = int(input("Enter the cost of the edge: "))
        mod = self._graphs[self._current].change_cost(vertex_x, vertex_y, cost)

        if mod:
            print("Cost modified successfully!")
        else:
            print("Cannot modify the cost, the edge does not exist!")

    def get_in_degree_ui(self):
        # Prints the in degree of a vertex given by the user; prints a corresponding message

        vertex = int(input("Enter the vertex:"))
        degree = self._graphs[self._current].in_degree(vertex)

        if degree == -1:
            print("The vertex does not exist!")
        else:
            print("The in degree of the vertex {} is {}.".format(vertex, degree))

    def get_out_degree_ui(self):
        # Prints the out degree of a vertex given by the user; prints a corresponding message

        vertex = int(input("Enter the vertex:"))
        degree = self._graphs[self._current].out_degree(vertex)

        if degree == -1:
            print("The vertex does not exist!")
        else:
            print("The out degree of the vertex {} is {}.".format(vertex, degree))

    def check_if_edge_ui(self):
        # Checks if an edge given by the user exists and if it does it prints its cost

        vertex_x = int(input("Enter x = "))
        vertex_y = int(input("Enter y = "))
        edge = self._graphs[self._current].find_if_edge(vertex_x, vertex_y)

        if edge is not False:
            print("({}, {}) is an edge and its cost is {}!".format(vertex_x, vertex_y, edge))
        else:
            print("({}, {}) is not an edge!".format(vertex_x, vertex_y))

    def copy_current_graph_ui(self):
        # Creates a copy of the graph using the make_copy function

        copy = self._graphs[self._current].make_copy()
        self._graphs.append(copy)

    def print_menu(self):
        print("MENU:\n"
              "0. EXIT.\n"
              "1. Create a random graph with specified number of vertices and edges.\n"
              "2. Read the graph from a text file.\n"
              "3. Write the graph in a text file.\n"
              "4. Switch the graph.\n"
              "5. Get the number of vertices.\n"
              "6. Get the number of edges.\n"
              "7. List the outbound edges of a given vertex.\n"
              "8. List all outbound vertices of the graph.\n"
              "9. List the inbound edges of a given vertex.\n"
              "10. List all inbound vertices of the graph. \n"
              "11. List the edges and their costs.\n"
              "12. Add a vertex.\n"
              "13. Remove a vertex.\n"
              "14. Add an edge.\n"
              "15. Remove an edge.\n"
              "16. Modify the cost of an edge.\n"
              "17. Get the in degree of a vertex.\n"
              "18. Get the out degree of a vertex.\n"
              "19. Check if there is an edge between two given vertices.\n"
              "20. Make a copy of the graph.\n"
              "21. Add an empty graph.\n"
              "22. Parse all the vertices.")

    def start(self):
        print("Welcome to my graph programme!")
        done = False
        self.add_empty_graph()
        print("The current graph is an empty graph!")
        command_dict = {"1": self.create_random_graph_ui, "2": self.read_graph_from_file_ui,
                        "3": self.write_graph_to_file_ui, "4": self.switch_graph_ui,
                        "5": self.get_number_of_vertices_ui, "6": self.get_number_of_edges_ui,
                        "7": self.list_outbound, "8": self.list_all_outbound,
                        "9": self.list_inbound, "10": self.list_all_inbound,
                        "11": self.list_all_costs, "12": self.add_vertex_ui,
                        "13": self.delete_vertex_ui, "14": self.add_edge_ui,
                        "15": self.remove_edge_ui, "16": self.modify_cost_ui,
                        "17": self.get_in_degree_ui, "18": self.get_out_degree_ui,
                        "19": self.check_if_edge_ui, "20": self.copy_current_graph_ui,
                        "21": self.add_empty_graph, "22": self.parse_all_vertices}
        while not done:
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
