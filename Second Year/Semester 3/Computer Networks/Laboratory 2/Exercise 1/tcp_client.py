import socket, pickle

IP = "192.168.0.10"
PORT = 7777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((IP, PORT))

command = input("Enter command: ")
if command == "":
    exit(0)

s.send(pickle.dumps(command))
data = s.recv(128)
print("Received: ", pickle.loads(data))

s.close()