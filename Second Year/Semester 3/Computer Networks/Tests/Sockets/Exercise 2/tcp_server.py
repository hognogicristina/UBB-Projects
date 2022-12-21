import socket
from threading import Thread
import time

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)

clients = []
matrices = []

def game(client):
    clients.append(client)
    clIdx = clients.index(client)
    mat = [[""]*3, [""]*3, [""]*3]
    matrices.append(mat)

    while True:
        print(f'Client {clIdx}')
        i = client.recv(128)
        j = client.recv(128)
        i = int(i)
        j = int(j)
        matrices[clIdx][i][j] = "X"
        print(matrices[clIdx])
        while True:
            iS = input("Enter row number: ")
            jS = input("Enter column number: ")
            iS = int(iS)
            jS = int(jS)
            matrices[clIdx][iS][jS] = "O"
            client.send(str(iS).encode())
            time.sleep(0.2)
            client.send(str(jS).encode())
            print(f'Client {clIdx}')
            print(matrices[clIdx])
            break


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(ADDR)
s.listen(5)

while True:
    client, _ = s.accept()
    th = Thread(target=game, args=(client,))
    th.start()