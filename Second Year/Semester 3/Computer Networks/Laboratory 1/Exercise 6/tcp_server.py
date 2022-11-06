import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def positions(str, cha):
    list = []
    for i in range(len(str)):
        if str[i] == cha:
            list.append(i)

    return list
    
def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str = conn.recv(4096)
    cha = conn.recv(4096)
    str = pickle.loads(str)
    cha = pickle.loads(cha)
    
    list = positions(str, cha)
    list_ascuns = pickle.dumps(list)
    conn.send(list_ascuns)
    
    conn.close()


if __name__ == "__main__":
    main()