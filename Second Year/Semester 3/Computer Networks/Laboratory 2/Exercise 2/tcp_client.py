import socket, pickle

IP = "192.168.0.10"
PORT = 6666
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

str = "C:\Users\hogno\Documents\Fukulta\Collage\Courses\Second Year. Sem 3\Computer Networks\Laboratories\Laboratory 2\Python\Exercise 2\\tcp_server.py"

s.send(pickle.dumps(str))

length = pickle.loads(s.recv(128))
content = pickle.loads(s.recv(3000))
if (length == -1):
    print("Length = -1; File does not exist; Exit code -1;")
else:
    file = str + "-copy"

    f = open(file, "w")
    f.write(content)
    f.close()


s.close()