# 6. a. Add an element at the end of a list.
#    b. Concatenate two lists.

class Nod:
    def __init__(self, e):
        self.e = e
        self.urm = None
    
class Lista:
    def __init__(self):
        self.prim = None

'''
functia de adaugare la final
'''
def adaugaE(nod, elem):
    if nod.urm == None:
        nod.urm = Nod(elem)
        return nod.urm.e
    else:
        adaugaE(nod.urm, elem)

'''
functia de concatenare
'''
def concat(list1, list2):
    if list1.prim == None:
        return list2
    else:
        concatR(list1.prim, list2)
        return list1

def concatR(nod, list2):
    if nod.urm == None:
        nod.urm = list2.prim
    else:
        concatR(nod.urm, list2)


'''
crearea unei liste din valori citite pana la 0
'''
def creareLista():
    lista = Lista()
    lista.prim = creareLista_rec()
    return lista

def creareLista_rec():
    x = int(input("x="))
    if x == 0:
        return None
    else:
        nod = Nod(x)
        nod.urm = creareLista_rec()
        return nod
    
'''
tiparirea elementelor unei liste
'''
def tipar(lista):
    tipar_rec(lista.prim)
    
def tipar_rec(nod):
    if nod != None:
        print (nod.e)
        tipar_rec(nod.urm)

'''
functia pentru testare
'''
def test():
    list1 = Lista()
    list2 = Lista()
    list1.prim = Nod(1)
    list1.prim.urm = Nod(2)
    list1.prim.urm.urm = Nod(3)
    
    adaugaE(list1.prim, 10)
    assert list1.prim.urm.urm.urm.e == 10
    
    list2.prim = Nod(4)
    list2.prim.urm = Nod(5)
    list2.prim.urm.urm = Nod(6)
    
    concat(list1, list2)
    assert list1.prim.e == 1
    assert list1.prim.urm.e == 2
    assert list1.prim.urm.urm.e == 3
    assert list1.prim.urm.urm.urm.e == 10
    assert list1.prim.urm.urm.urm.urm.e == 4
    assert list1.prim.urm.urm.urm.urm.urm.e == 5
    assert list1.prim.urm.urm.urm.urm.urm.urm.e == 6
    
'''
program pentru test
'''   
def main():
    test()
    
main() 
    
    
    
    
    