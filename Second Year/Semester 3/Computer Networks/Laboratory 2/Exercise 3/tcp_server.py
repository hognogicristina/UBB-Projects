import socket, pickle, sys, random, time
from threading import Thread

clients = []
values = []

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)

CONNECTIONS = 5

def f(client):
    print("Client connected")
    clients.append(client)
    data = pickle.loads(client.recv(128))
    values.append(data)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(ADDR)
s.settimeout(5)
s.listen(CONNECTIONS)

n = random.uniform(0, 100)
n = round(n, 2)

i = 0
while 1:
    try:
        if i == CONNECTIONS:
            break
        client, _ = s.accept()
        if not client in clients:
            t = Thread(target=f, args=(client,))
            t.start()

        i += 1
    except socket.timeout as e:
        break

diff = 100
for v in values:
    if abs(n - v) < diff:
        diff = v

idxMax = values.index(diff)
winner = clients[idxMax]
winner.send(pickle.dumps(f'You have the best guess with an error of {round(abs(n - v), 2)}'))

for i in range(len(clients)):
    if i != idxMax:
        clients[i].send(pickle.dumps("You lose"))

s.close()