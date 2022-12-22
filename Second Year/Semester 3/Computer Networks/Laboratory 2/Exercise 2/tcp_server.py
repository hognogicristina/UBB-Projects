import socket, pickle
from pathlib import Path
from time import sleep

IP = "0.0.0.0"
PORT = 6666
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(ADDR)
s.listen(5)

cs, _ = s.accept()
data = pickle.loads(cs.recv(128))
data = Path(data)
print(data)

if not data.is_file():
    cs.send(pickle.dumps(-1))

res = open(data, "r").read()
with open(data, "r") as f:
    cs.send(pickle.dumps(len(f.readlines())))
    sleep(0.1)
    cs.send(pickle.dumps(res))

s.close()