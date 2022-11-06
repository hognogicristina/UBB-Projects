import socket, pickle

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.0.129", 4200))
arr = [1, 2, 3]
s.send(pickle.dumps(arr))
data = pickle.loads(s.recv(1024))
print(data)
s.close()