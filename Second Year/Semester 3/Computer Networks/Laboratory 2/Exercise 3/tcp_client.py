import socket, pickle, random

IP = "192.168.0.17"
PORT = 7777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((IP, PORT))

n = random.uniform(1, 100)
n = round(n, 2)

s.send(pickle.dumps(n))
data = s.recv(128)
print(pickle.loads(data))

s.close()