import time, socket, pickle
from threading import Thread
CLIENTS = {}

def listener():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("0.0.0.0", 7777))
    s.listen(5)
    i = 0
    while True:
        if i == 2:
            break
        conn, addr = s.accept()
        CLIENTS[conn.fileno()] = conn
        i = i + 1

    for client in CLIENTS.values():
        client.send(pickle.dumps("start"))

listener()

# def f(cs, i):
#     print ("Procesez client " + str(i))
#     b = pickle.loads(cs.recv(128))
#     print(b)
#     time.sleep(1)
#     cs.send(pickle.dumps("sugi pl ms pa"))
#     cs.close()

# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# s.bind(("0.0.0.0", 6666))
# s.listen(5)
# i = 0

# while (1 == 1): 
#     i = i + 1
#     cs, addr = s.accept()
#     t = Thread(target=f, args=(cs, i, ))
#     t.start()