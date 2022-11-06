import socket, pickle

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.0.129", 6666))
str = input()
s.send(pickle.dumps(str))
data = pickle.loads(s.recv(128))
print(data)
s.close()