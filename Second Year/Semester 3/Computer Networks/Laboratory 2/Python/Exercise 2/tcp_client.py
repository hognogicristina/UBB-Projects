import socket, pickle

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

str = ""

s.send(pickle.dumps(str))

data = pickle.loads(s.recv(2048))
print(data)

s.close()