from copy import deepcopy

class OrderedGraphCost:
    '''
     Function that creates a weighted ordered graph with nrV nodes and no edges
    '''
    def __init__(self, nrV):    
        self._dictIn = {}
        self._dictOut = {}
        self.tm = [0] * nrV
        self.tsm = [0]* nrV
        self.Tm = [999999999] * nrV
        self.Tsm = [999999999] * nrV
        self.duration = [0] * nrV
        self._costDict = {}
        self.__timeSet = False
        for i in range(nrV):
            self._dictIn[i] = []
            self._dictOut[i] = []

    '''
     addEdge - adds an edge to the graph between 2 nodes
    
    Raises:
        ValueError: Invalid vertex
        ValueError: Edge already exists
    '''
    def addEdge(self, vertexInit, vertexFin, cost=0):
        if not self.isVertex(vertexInit) or not self.isVertex(vertexFin):
            raise ValueError('Invalid Vertex')
        if self.isEdge(vertexInit, vertexFin):
            raise ValueError('Edge already exists')
        self._costDict[(vertexInit, vertexFin)] = cost
        self._dictOut[vertexInit].append(vertexFin)
        self._dictIn[vertexFin].append(vertexInit)

    '''
     Function that returns an iterable with the set of vertices
    
    Returns:
        iterator 
    '''
    def setOfVertices(self):
        return iter(self._dictOut.keys())

    '''
     Function that verifies if a value is a vertex
    
    Returns:
        true - if val is a vertex
        false - otherwise
    '''
    def isVertex(self, val):
        if val in self._dictOut.keys():
            return True
        return False

    '''
     Function that verifies if there is an edge between 2 nodes

    Returns:
        true - if there is an edge
        false - otherwise
    '''
    def isEdge(self, vertexInit, vertexFin):
        if vertexFin in self._dictOut[vertexInit]:
            return True
        return False
    '''
    inDegree Returns the indegree of a vertex

    Returns:
        int
    '''
    def inDegree(self, x):
        return len(self._dictIn[x])
    '''
    outDegree Returns the outdegree of an edge

    Returns:
        int
    '''
    def outDegree(self, x):
        return len(self._dictOut[x])

    '''
     Returns an interable containing the inbound egdes of a vertex
    
    Returns:
        iterable
    '''
    def inboundEdge(self, x):
        return iter(self._dictIn[x])

    '''
    Returns an interable containing the outbound egdes of a vertex
    
    Returns:
        iterable
    '''
    def outboundEdge(self, x):
        return iter(self._dictOut[x])

    '''
     Changes the cost of an edge
    
    Raises:
        ValueError: Edge does not exist
    '''
    def changeCost(self, x, y, val):
        if not self.isEdge(x, y):
            raise ValueError('Edge does not exist')
        self._costDict[(x, y)] = val
    '''
    getCost Gets the cost of an edge
    
    Raises:
        ValueError: Edge does not exist
    
    Returns:
        int - cost of given edge
    '''
    def getCost(self, x, y):
        if not self.isEdge(x, y):
            raise ValueError('Edge does not exist')
        return self._costDict[(x, y)]
    '''
    nrEdges Gets the number of edges of a graph
       
    Returns:
        int -- number of edges
    '''
    def nrEdges(self):
        return len(self._costDict.keys())
    '''
    removeEdge Removes an edge 
    
    Raises:
        ValueError: [description]
        ValueError: [description]
    
    Returns:
        [type] -- [description]
    '''
    def removeEdge(self, vertexInit, vertexFin):
        if not self.isEdge(vertexInit, vertexFin):
            raise ValueError('Edge does not exist')
        for elem in self._costDict.keys():
            if vertexFin == elem[1] and vertexInit == elem[0]:
                del self._costDict[elem]
                break
        self._dictIn[vertexFin].remove(vertexInit)
        self._dictOut[vertexInit].remove(vertexFin)

    
    '''
     Returns the number of vertices
    
    Returns:
        int -- number of vertices
    '''
    def nrVertices(self):
        return len(self._dictIn)

    '''
     Adds a vertex to the graph
    
    Raises:
        ValueError: Vertex already exists
    
    '''
    def addVertex(self, val):
        if self.isVertex(val):
            raise ValueError('Vertex already exists')
        self._dictOut[val] = []
        self._dictIn[val] = []

    '''
     Breath - first search in the graph
    '''
    def BFSShortestPath(self, s, d):
        visited = [False] * len(self._dictOut.keys())
        queue = [s]
        visited[s] = True
        dist = [9999999] * len(self._dictOut.keys())
        pred = [-1] * len(self._dictOut.keys())
        dist[s] = 0
        while queue:
            x = queue.pop(0)
            for i in self._dictOut[x]:
                if not visited[i]:
                    queue.append(i)
                    dist[i] = dist[x] + 1
                    visited[i] = True
                    pred[i] = x
                    if (i == d):
                        return (True, pred, dist)
        return (False, pred, dist)
        
    '''
     Depth first search in the graph
    
    Returns:
        [type] -- [description]
    '''
    def DFS(self, v, visited, l):
        visited[v] = True
        l.append(v)
        for i in self._dictOut[v]:
            if not visited[i]:
                self.DFS(i, visited, l)
    '''
     Function that puts on the stack the adjacent vertices of v
    '''
    def fillOrder(self, v, visited, stack):
        visited[v] = True
        for i in self._dictIn[v]:
            if not visited[i]:
                self.fillOrder(i, visited, stack)
        stack.append(v)

    '''
     Function that gets the transpose of the graph
    
    Returns:
        OrderedGraphCost -- transposed graph
    '''
    def reverseGraph(self):
        g = OrderedGraphCost(len(self._dictOut.keys()))
        for i in self._dictOut.keys():
            for j in self._dictOut[i]:
                g.addEdge(j, i, self.getCost(i, j))
        return g

    '''
     Function that gets the strongly connected components of a graph
    
    Returns:
        list -- components
    '''
    def getStronglyConnectedComponents(self):
        stack = []
        visited = [False] * len(self._dictOut.keys())
        for i in range(len(self._dictOut.keys())):
            if not visited[i]:
                self.fillOrder(i, visited, stack)

        gr = self.reverseGraph()
        visited = [False] * len(self._dictOut.keys())
        components = []
        while stack:
            i = stack.pop(0)
            if not visited[i]:
                l = []
                gr.DFS(i, visited, l)
                components.append(l)
        return components

    '''
     Function that removes a vertex from the graph
    
    '''
    def removeVertex(self, vertex):
        del self._dictOut[vertex]
        del self._dictIn[vertex]
        length = len(self._costDict)
        array = list(self._costDict.keys())
        i = 0
        while i < length:
            if array[i][1] == vertex or array[i][0] == vertex:
                del self._costDict[array[i]]
                del array[i]
                length -= 1
                continue
            i -= -1
        for i in self._dictIn.keys():
            if vertex in self._dictIn[i]:
                self._dictIn[i].remove(vertex)
        for i in self._dictOut.keys():
            if vertex in self._dictOut[i]:
                self._dictOut[i].remove(vertex)
        newDict = {}
        for i in range(len(self._dictIn.keys()) - 1):
            newDict[i] = []
        for i in self._dictIn:
            x = i
            if i > vertex:
                x -= 1
            newDict[x] = self._dictIn[i]
            for j in range(len(self._dictIn[i])):
                if self._dictIn[i][j] > vertex:
                    newDict[x][j] -= 1
        self._dictIn = newDict
        newDict = {}
        for i in range(len(self._dictIn.keys()) - 1):
            newDict[i] = []
        for i in self._dictOut:
            x = i
            if i > vertex:
                x -= 1
            newDict[x] = self._dictOut[i]
            for j in range(len(self._dictOut[i])):
                if self._dictOut[i][j] > vertex:
                    newDict[x][j] -= 1
        self._dictOut = newDict
        newDict = {}
        for i in self._costDict.keys():
            x = i[0]
            y = i[1]
            if i[0] > vertex:
                x -= 1
            if i[1] > vertex:
                y -= 1
            newDict[(x, y)] = self._costDict[i]
        self._costDict = newDict
    
    '''
     Function that copies a graph
    
    Returns:
        OrderedGraphCost -- copy of graph
    '''
    def copyGraph(self):
        return deepcopy(self)

    def negCostCycle(self):
        """
        Function that verifies if the graph has negative cost cycles
        Input:
            -
        Output:
            True if there are negative cost cycles
            False otherwise
        """
        dist = [[0 for i in range(self.nrVertices() + 1)] for j in range(self.nrVertices() + 1)]
        n = self.nrVertices()
        for i in range(n):
            for j in range(n):
                if self.isEdge(i, j):
                    dist[i][j] = self._costDict[(i, j)]
                else:
                    dist[i][j] = 99999999999
        el = 0
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        for i in range(n):
            if dist[i][i] < 0:
                return True
        return False

    def costWalkByLength(self, start, end):
        """
        Function that computes the lowest cost walk between 2 vertices
        Input:
            start, end - integer (vertices)
        Returns:
            lowest cost walk - int
        """

        n = deepcopy(self.nrVertices())
        w = []
        for i in range(n + 1):
            w.append([99999999999] * (deepcopy(n) + 1))
        w[start][0] = 0
        for k in range(n):
            for i in range(n):
                for v in self._dictOut[i]:
                    w[v][k + 1] = min(w[i][k] + self._costDict[(i, v)], w[v][k + 1])
        cost = 99999999999
        nr = 0
        poz = 0
        for i in w[end]:
            if i == cost:
                nr += 1
            elif i < cost:
                poz = w[end].index(i)
                cost = i
                nr = 1
        x = end
        poz += 1
        path = [x]
        for k in reversed(range(n)):
            for y in range(n):
                if self.isEdge(y, x) and k == poz - 1 and w[y][k] + self._costDict[(y, x)] == w[x][poz]:
                    path.append(y)
                    x = y
                    poz -= 1

        return (cost, path)

    def __repr__(self):
        return str(self)

    def __str__(self):
        r = ''
        for i in self._costDict.keys():
            r += str(i[0]) + ' ' + str(i[1]) + ' ' + str(self._costDict[i]) + '\n'
        for i in self._dictIn.keys():
            if len(self._dictOut[i]) == 0 and len(self._dictIn[i]) == 0:
                r += str(i) + ' -1\n'
        return r
    
    def TopoSortDFS(self, x, sortedGraph, fullyProcessed, inProcess):
        """
        TopoSortDFS - sorts the graph in a topological order
        Input:
            x - vertex
            sorted - list of sorted vertices
            fullyProcessed - set 
            inProcess - set
        Output:
            true - if graph can be sorted
            false - otherwise
        """
        inProcess.add(x)
        for y in self.inboundEdge(x):
            if y in inProcess:
                return False
            if y not in fullyProcessed:
                ok = self.TopoSortDFS(y, sortedGraph, fullyProcessed, inProcess)
                if not ok:
                    return False
        inProcess.remove(x)
        sortedGraph.append(x)
        fullyProcessed.add(x)
        return True
    
    def sortGraph(self):
        '''
        Function that sorts the graph
        Input:
            OrderedGraphCost
        Output:
            sorted - list of sorted
        '''
        sortedGraph = []
        fullyProcessed = set()
        inProcess = set()
        for x in self.setOfVertices():
            if x not in fullyProcessed:
                ok = self.TopoSortDFS(x, sortedGraph, fullyProcessed, inProcess)
                if not ok:
                    sortedGraph = []
                    return sortedGraph
        return sortedGraph

    def setTimes(self):
        '''
        Function that sets tm, tsm, Tm, Tsm - earliest/latest starting/ending time
        Input: 
            OrderedGraphCost
        Output:
            void
        '''
        sortG = self.sortGraph()
        if self.__timeSet == False:

            for x in sortG:
                for y in self.inboundEdge(x):
                    self.tm[x] = max(self.tm[x], self.tsm[y])
                self.tsm[x] = self.tm[x] + self.duration[x]
            self.Tm[self.nrVertices() - 1] = self.Tsm[self.nrVertices() - 1] = self.tsm[self.nrVertices() - 1]

            for x in reversed(sortG):
                for y in self.outboundEdge(x):
                    self.Tsm[x] = min(self.Tsm[x], self.Tm[y])
                self.Tm[x] = self.Tsm[x] - self.duration[x]
            self.__timeSet = True

'''
 Function that reads graph from a file
'''
def readFile():
    f = open('graph.txt', 'r')
    a = f.readline()
    a = a.strip()
    nrActivities = a
    G = OrderedGraphCost(int(nrActivities) + 2)
    a = f.readline()
    a = a.strip()
    a = a.split()
    remaining = []
    for i in range(1, int(nrActivities) + 1):
        remaining.append(i)
    for i in range(int(nrActivities)):
        G.duration[i + 1] = int(a[i])
    for i in range(int(nrActivities)):
        a = f.readline()
        a = a.strip()
        a = a.split()
        for j in range(len(a)):
            G.addEdge(int(a[j]) + 1, i + 1, 0)
            if (int(a[j]) + 1) in remaining:
                remaining.remove(int(a[j]) + 1)
    for el in remaining:
        G.addEdge(el, int(nrActivities) + 1, 0)
    a = f.readline()
    if a != '':
        a = int(a)
        for i in range(a):
            l = f.readline()
            l = l.strip()
            l = l.split()
            G.changeCost(int(l[0]) + 1, int(l[1]) + 1, int(l[2]))
    return G












