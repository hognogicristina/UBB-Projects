import socket, pickle

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    str = "buna bere biblie bby bebi noapte"
    cha = "b"
    str_ascuns = pickle.dumps(str)
    cha_ascuns = pickle.dumps(cha)
    s.send(str_ascuns)
    s.send(cha_ascuns)

    list = s.recv(4096)
    list = pickle.loads(list)
    print(list)

    s.close()


if __name__ == "__main__":
    main()
