import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def substring(str, i, l):
    s = []
    
    for j in range(len(str)):
        if j == i:
            for x in range(i, i + l):
                s.append(str[x])

    list = "".join(s)
    return list
    
def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str = conn.recv(4096)
    i = conn.recv(4096)
    l = conn.recv(4096)
    str = pickle.loads(str)
    i = pickle.loads(i)
    l = pickle.loads(l)
    
    list = substring(str, i, l)
    list_ascuns = pickle.dumps(list)
    conn.send(list_ascuns)
    
    conn.close()
    s.close()


if __name__ == "__main__":
    main()