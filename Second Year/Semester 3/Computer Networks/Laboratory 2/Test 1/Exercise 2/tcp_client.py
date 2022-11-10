import socket
from time import sleep

IP = "192.168.0.17"
PORT = 7777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((IP, PORT))

matrix = [[""]*3, [""]*3, [""]*3]

while True:
    i = input("Enter the row number: ")
    j = input("Enter the column number: ")
    matrix[int(i)][int(j)] = "X"
    print(matrix)
    
    s.send(i.encode())
    sleep(0.1)
    s.send(j.encode())

    iS = s.recv(128).decode()
    jS = s.recv(128).decode()

    iS = int(iS)
    jS = int(jS)
    
    matrix[iS][jS] = "O"
    print(matrix)

s.close()