class Trees(object):
    """ Description of class """

    def __init__(self):
        """ Create a tree """

        self.roots = []
        self.parent = {}
        self.children = {}

    def newRoot(self, root):
        """
        Creates a new root in this tree

        Precondition: root is not an existing vertex
        """

        self.roots.append(root)
        self.parent[root] = None
        self.children[root] = []

    def isRoot(self, root):
        """ Returns if the vertex is a root in the tree """
        return root in self.roots

    def addChild(self, p, c):
        """
        Add a child for the given parent

        Precondition: Parent is an existing vertex
		              Child doesn't exist in the tree
        """

        self.parent[c] = p
        self.children[p].append(c)
        self.children[c] = []

    def getRoots(self):
        """ Returns the roots of the tree """
        return self.roots[:]

    def isVertex(self, vertex):
        """
		Boolean function

		Postcondition: true if vertex is a vertex of the tree, false otherwise
		"""
        return vertex in self.parent.keys()

    def getParent(self, child):
        """ Return the parent of the given child """
        return self.parent[child]

    def getChildren(self, parent):
        """ Returns a generator that produces the children of the given parent """
        return self.children[parent][:]

    def ThisRoot(self, root):
        """
        Creates a string representation of the tree starting in the given root

        Precondition: root exists in self.roots
        """

        string = "The conex component contains these vertices: [" + str(root)
        for child in self.getChildren(root):
            string = string + self.recursiveToString(child)

        string = string + "]"
        return string

    def recursiveToString(self, subroot):
        """ Recursively creates the wanted string """

        s = "," + str(subroot)

        for child in self.getChildren(subroot):
            s = s + self.recursiveToString(child)

        return s
