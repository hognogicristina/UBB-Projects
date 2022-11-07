import socket, pickle
from pathlib import Path

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(ADDR)
s.listen(5)

cs, _ = s.accept()
data = pickle.loads(cs.recv(128))
data = Path(data)
print(data)

if not data.is_file():
    cs.send(pickle.dumps("Length = -1; file does not exist!"))

res = open(data, "r").read()
with open(data, "r") as f:
    cs.send(pickle.dumps(f'Length: {len(f.readlines())}; Content:\n{res}'))

s.close()