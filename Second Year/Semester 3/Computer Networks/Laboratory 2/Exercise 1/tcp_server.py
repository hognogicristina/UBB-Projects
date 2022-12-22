import socket, pickle
from functools import partial

def add(a, b):
    return a + b

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(ADDR)
s.listen(5)

cs, _ = s.accept()
data = pickle.loads(cs.recv(128))

res = eval(data)

try:
    cs.send(pickle.dumps(f'Function output: {res}; exit code 0'))
except Exception as e:
    cs.send(pickle.dumps(f'Undefined function: {data}; exit code -1'))

cs.close()
s.close()