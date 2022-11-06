from random import choice, randrange
from copy import deepcopy
import copy
import Trees
from cmath import inf
from queue import PriorityQueue


def printMatrix(m, D):
    """ Print the matrix for the lowest cost between 2 given vertices """

    print(f"D{m + 1}")

    for row in D:
        for val in row:
            print('{:4}'.format(val), end=' ')
        print()

    print()


class ADT(object):
    """ Description of class """

    def __init__(self, file_name="edges.txt"):
        """
        The initialiser of the graph

        Parameter file_name: the name of the file in which the graph is stored

        Postconditions: in_edges, out_edges, cost_of_edge will be populated accordingly from the file
        """

        self.file_name = file_name
        self.__in_edges = dict()
        self.__out_edges = dict()
        self.__cost_of_edge = dict()
        self.__r_in_edges = dict()
        self.__r_out_edges = dict()
        self.__r_cost_of_edge = dict()
        self.__number_of_vertices = int()
        self.__number_of_edges = int()
        self.processed = list()
        self.visited = list()
        self.queue = list()
        self.store_edges = list()
        self.__vertices = list()
        self.__LoadFromFile()

    def __LoadFromFile(self):
        """
        Reads from the file the input + and initializies the graph

        Parameter file_name: the name of the file

        Precondition: file has to exist
        Postconditions: number_of_vertices, number_of_edges, in_edges, out_edges, cost_of_edges will be be populated
                        with the content from the given file
        """

        file = open(self.file_name, 'r')

        line = file.readline().strip()
        string = line
        line = file.readline().strip()
        line = line.split()

        self.__number_of_vertices = int(line[0])
        self.__number_of_edges = int(line[1])

        for index in range(0, self.__number_of_vertices):
            self.__in_edges[index] = list()
            self.__vertices.append(index)
            self.__out_edges[index] = list()
            if string == "directed":
                self.__r_in_edges[index] = list()
                self.__r_out_edges[index] = list()

        for index in range(0, self.__number_of_edges):
            line = file.readline().strip()
            line = line.split()
            self.__in_edges[int(line[1])].append(int(line[0]))
            self.__out_edges[int(line[0])].append(int(line[1]))
            self.__cost_of_edge[(int(line[0]), int(line[1]))] = int(line[2])
            if string == "undirected":
                self.__in_edges[int(line[0])].append(int(line[1]))
                self.__out_edges[int(line[1])].append(int(line[0]))
                self.__cost_of_edge[(int(line[1]), int(line[0]))] = int(line[2])
            if string == "directed":
                self.__r_in_edges[int(line[0])].append(int(line[1]))
                self.__r_out_edges[int(line[1])].append(int(line[0]))
                self.__r_cost_of_edge[(int(line[1]), int(line[0]))] = int(line[2])

        file.close()

    def GetNumberOfVertices(self):
        """ Returns the number of vertices """
        return self.__number_of_vertices

    def FindEdge(self, first_vertex, second_vertex):
        """
        Returns true if an edge exist else it will return False

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex

        Return: true if there exists an edge between first_vertex and second_vertex, False otherwise
        """

        if first_vertex in self.__in_edges[second_vertex]:
            return True
        else:
            return False

    def ParseGraph(self):
        """
        Returns the vertices of the graph

        Return: returns a list (iterator) containing the vertices
        """

        vertices = list()

        for key in self.__in_edges.keys():
            vertices.append(key)

        return vertices

    def VertexDegrees(self, vertex):
        """
        Returns a pair containing the inbound degree of a vertex and the outound degree of the same vertex

        Parameter: vertex, the vertex

        Return: returns a list containing first the inbound degree and then the outbound degree
        """

        return [len(self.__in_edges[vertex]), len(self.__out_edges[vertex])]

    def OutboundEdges(self, vertex):
        """
        Returns a list containing the outbound edges for a vertex

        Parameter: vertex the given vertex

        Return: returns a list containing all the outbound edges from the given vertex
        """

        return self.__out_edges[vertex]

    def InboundEdges(self, vertex):
        """
        Returns a list containing the inbound edges for a vertex

        Parameter: vertex the given vertex

        Return: returns a list containing all the inbound edges from the given vertex
        """

        return self.__in_edges[vertex]

    def RetrieveEdge(self, second_vertex, first_vertex):
        """
        Returns the cost of the edge if it exist else it returns None

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex

        Return: return None if edge doesn't exist else
        Return: the cost of the edge -int type
        """

        if (first_vertex, second_vertex) in self.__cost_of_edge.keys():
            return self.__cost_of_edge[(first_vertex, second_vertex)]

        return None

    def ModifyEdge(self, second_vertex, first_vertex, new_cost):
        """
        Change the edge cost if it is possible

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex
        Parameter new_cost: the new cost of the edge

        Except: throw an error if the edge doesn't exist, else modify the cost of the edge

        Postconditions: cost_of_edge[(first_vertex, second_vertex)] will be updated with new_cost
        """

        if (first_vertex, second_vertex) in self.__cost_of_edge.keys():
            self.__cost_of_edge[(first_vertex, second_vertex)] = new_cost
        else:
            raise ValueError("The edge doesn't exist")

    def AddEdge(self, second_vertex, first_vertex, cost):
        """
        Add an edge cost if it is possible

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex
        Parameter cost: the new cost of the edge

        Except: throw an error if the edge exist or the vertices doesn't exist

        Precondition: there must be no edge from first_vertex to second_vertex.

        Postconditions: out_edges[first_vertex]' = out_edges[first_vertex] + second_vertex
                        in_edges[second_vertex]' = in_edges[second_vertex] + first_vertex
                        cost_of_edge' = cost_of_edge + cost_of_edge[(first_vertex, second_vertex)]
        """

        if (first_vertex, second_vertex) in self.__cost_of_edge.keys() or (
                second_vertex, first_vertex) in self.__cost_of_edge.keys():
            raise ValueError("The edge already exists try to modify the cost.\n")
        else:
            if second_vertex in self.__in_edges.keys():
                if first_vertex in self.__out_edges.keys():
                    self.__cost_of_edge[(first_vertex, second_vertex)] = cost
                    self.__in_edges[second_vertex].append(first_vertex)
                    self.__in_edges[first_vertex].append(second_vertex)
                    self.__out_edges[first_vertex].append(second_vertex)
                    self.__out_edges[second_vertex].append(first_vertex)
                    self.__number_of_edges += 1
                else:
                    raise ValueError("Out vertex doesn't exist.\n")
            else:
                raise ValueError("In vertex doesn't exist.\n")

    def RemoveEdgeFromTheInandOutEdges(self, first_vertex, second_vertex):
        """
        Removes an edge from the in_edges and out_edges dict

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex

        Postconditions: out_edges[first_vertex]' = out_edges[first_vertex] - second_vertex
                        in_edges[second_vertex]' = in_edges[second_vertex] - first_vertex
        """

        for index in range(0, len(self.__in_edges[second_vertex])):
            if self.__in_edges[second_vertex][index] == first_vertex:
                self.__in_edges[second_vertex].pop(index)
                self.__in_edges[first_vertex].pop(index)
                break

        for index in range(0, len(self.__out_edges[first_vertex])):
            if self.__out_edges[first_vertex][index] == second_vertex:
                self.__out_edges[first_vertex].pop(index)
                self.__out_edges[second_vertex].pop(index)

    def RemoveEdge(self, second_vertex, first_vertex):
        """
        Removes an edge from the in_edges, cost_of_edges and out_edges dict

        Parameter first_vertex: the first given vertex
        Parameter second_vertex: the second given vertex

        Postconditions: out_edges[first_vertex]' = out_edges[first_vertex] - second_vertex
                        in_edges[second_vertex]' = in_edges[second_vertex] - first_vertex
                        cost_of_edge' = cost_of_edge - cost_of_edge[(first_vertex, second_vertex)]

        Except: if it doesn't exist throw an ValueError
        """

        if (first_vertex, second_vertex) in self.__cost_of_edge.keys() or (
                second_vertex, first_vertex) in self.__cost_of_edge.keys():
            self.__cost_of_edge.pop((first_vertex, second_vertex))
            self.RemoveEdgeFromTheInandOutEdges(first_vertex, second_vertex)
            self.RemoveEdgeFromTheInandOutEdges(second_vertex, first_vertex)
            self.__number_of_edges -= 1
        else:
            raise ValueError("Edge doesn't exist")

    def AddVertex(self, vertex):
        """
        Adds an vertex to the in_edges and out_edges dictionaries

        Parameter vertex: vertex the given vertex

        Except: throw an error if Vertex already exists

        Postconditions: adds it in the in_edges, out_edges
        """

        if vertex in self.__in_edges.keys():
            raise ValueError("Vertex already exists")
        else:
            self.__in_edges[vertex] = list()
            self.__out_edges[vertex] = list()
            self.__number_of_vertices += 1

    def RemoveVertex(self, vertex):
        """
        Removes every edge that includes vertex from the in_edges, cost_of_edges and out_edges dict

        Parameter vertex: the given vertex

        Postconditions: the vertex and the edges containing vertex are removed from the dictionaries

        Except: if it doesn't exist throw an ValueError
        """

        if vertex in self.__in_edges.keys():
            for key in self.__in_edges.keys():
                if (vertex, key) in self.__cost_of_edge.keys():
                    self.RemoveEdge(key, vertex)
                if (key, vertex) in self.__cost_of_edge.keys():
                    self.RemoveEdge(vertex, key)
            self.__in_edges.pop(vertex)
            self.__out_edges.pop(vertex)
            self.__number_of_vertices -= 1
        else:
            raise ValueError("Vertex doesn't exist")

    def RandomGraph(self, number_of_vertices, number_of_edges):
        """
        This function generates a random directed graph based on a number of vertices and number of edges

        Parameter number_of_vertices: int - the number of vertices of the graph
        Parameter number_of_edges: int - number of edges of the graph

        Preconditions: numberOfVertices > 0
                       0 <= numberOfEdges <= numberOfVertices^2

        Postconditions: the file 'random_graph.out' will be populated with the newly generated digraph
        """

        file = open("random_graph.out", "w+")
        file.write(str(number_of_vertices) + " " + str(number_of_edges) + "\n")
        edge_list = []

        for index in range(0, number_of_vertices):
            for index_2 in range(0, number_of_vertices):
                edge_list.append((index, index_2))

        for index in range(0, number_of_edges):
            pair = choice(edge_list)
            edge_list.remove(pair)
            cost = randrange(-1000, 1000)
            file.write(str(pair[0]) + " " + str(pair[1]) + " " + str(cost) + "\n")

    def MakeCopy(self):
        """ Return a copy of the graph """
        return copy.deepcopy(self)

    def IsEdge(self, x, y):
        """ Returns True if there is an edge from x to y, False otherwise """
        return y in self.__out_edges[x]

    def DFS(self, tree, vertex):
        """
        This function creates the DFS tree starting in the given vertex

        Precondition: vertex doesn't appear in the tree
        """

        print("[" + str(vertex), end="")
        stack = list()
        self.store_edges.clear()

        for key in self.__in_edges.keys():
            if (key, vertex) in self.__cost_of_edge.keys():
                self.store_edges.append([vertex, key])

        stack.append(vertex)

        while (stack):
            value = stack.pop()
            for y in self.OutboundEdges(value):
                if not tree.isVertex(y):
                    tree.addChild(value, y)
                    for key in self.__in_edges.keys():
                        if (key, y) in self.__cost_of_edge.keys():
                            self.store_edges.append([y, key])
                    print(", " + str(y), end="")
                    stack.append(y)

        print("]")

    def ConexComponentsDFS(self):
        """ Creates all the conex components using a DFS algorithm """
        tree = Trees.Trees()

        for vertex in self.__vertices:
            if not tree.isVertex(vertex):
                tree.newRoot(vertex)
                self.DFS(tree, vertex)
                print(self.store_edges)

    def GetEdges(self):
        """ Gets all the edges (with their costs) (deepcopy). """
        return deepcopy(self.__cost_of_edge)

    def GetAdjacencyMatrix(self):
        """ Gets the adjacency matrix of the number of vertices """

        n = self.GetNumberOfVertices()
        W = [[0.0 for i in range(n)] for j in range(n)]

        for i in range(n):
            for j in range(n):
                if i != j:
                    if self.IsEdge(i, j):
                        W[i][j] = self.RetrieveEdge(i, j)
                    else:
                        W[i][j] = inf

        return W

    def GetNextMatrix(self):
        """ Get the matrix wich is next """

        n = self.GetNumberOfVertices()
        Next = [[-1 for i in range(n)] for j in range(n)]

        for edge in self.GetEdges():
            Next[edge[0]][edge[1]] = edge[1]

        for i in range(n):
            Next[i][i] = i

        return Next

    @staticmethod
    def GetPath(Next, s, t):
        """
        Get the path of the matrix

        Parameter Next: the next matrix
        Parameter s: start vertex
        Parameter t: target vertex

        Returns: the path
        """

        if Next[s][t] == -1:
            return []

        path = [s]

        while s != t:
            s = Next[s][t]
            path.append(s)

        return path

    def LowestCostWalkSlow(self, x, y):
        """
        Function for the lowest cost walk slow

        Parameter x: the start vertex
        Parameter y: the target vertex

        Return: the matrix of the lowest cost walk slow
        """

        W = self.GetAdjacencyMatrix()
        D = deepcopy(W)

        Next = self.GetNextMatrix()
        printMatrix(0, D)

        n = self.GetNumberOfVertices()

        for m in range(1, n - 1):
            D = self.Extend(D, W, Next)
            printMatrix(m, D)

        return D[x][y], self.GetPath(Next, x, y)

    def Extend(self, D, W, Next):
        """
        Deepcopy matrix of the lowest cost walk slow

        Parameter D: deepcopy matrix
        Parameter W: adjacency matrix
        Parameter Next: the next matrix

        Return: the deepcopy matrix
        """

        n = self.GetNumberOfVertices()
        D_copy = deepcopy(D)

        for i in range(n):
            for j in range(n):
                for k in range(n):
                    p = D_copy[i][k] + W[k][j]
                    if D[i][j] > p:
                        D[i][j] = p
                        Next[i][j] = Next[i][k]
                if i == j and D[i][i] < 0:
                    raise Exception("Negative cost cycle!\n")

        return D

    def Dijkstra(self, s, t):
        """
        Input: Directed graph with costs

        Parameter s: start vertex
        Parameter t: target vertex

        Output: dist: a map that associates, to each accessible vertex, the cost of the minimum cost walk from s to t
                prev: a map that maps each accessible vertex to its predecessor on a path from s to t
        """

        q = PriorityQueue()
        prev = {}
        dist = {}

        q.add(s, 0)
        dist[s] = 0
        found = False

        while not q.isEmpty() and not found:
            x = q.pop()
            for y in self.__out_edges[x]:
                if y not in dist.keys() or dist[x] + self.RetrieveEdge(x, y) < dist[y]:
                    dist[y] = dist[x] + self.RetrieveEdge(x, y)
                    q.add(y, dist[y])
                    prev[y] = x
            if x == t:
                found = True

        return dist[t]

class PriorityQueue:
    def __init__(self):
        self.__values = {}

    def isEmpty(self):
        return len(self.__values) == 0

    def pop(self):
        topPriority = None
        topObject = None
        for obj in self.__values:
            objPriority = self.__values[obj]
            if topPriority is None or topPriority > objPriority:
                topPriority = objPriority
                topObject = obj
        del self.__values[topObject]
        return topObject

    def add(self, obj, priority):
        self.__values[obj] = priority

    def contains(self, val):
        return val in self.__values
