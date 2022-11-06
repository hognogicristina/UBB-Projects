import socket, pickle
from time import sleep

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    str = "buna bere biblie bby bebi noapte"
    i = 6
    l = 7
    str_ascuns = pickle.dumps(str)
    i_ascuns = pickle.dumps(i)
    l_ascuns = pickle.dumps(l)
    s.send(str_ascuns)
    sleep(1)
    s.send(i_ascuns)
    sleep(1)
    s.send(l_ascuns)

    list = s.recv(4096)
    list = pickle.loads(list)
    print(list)

    s.close()


if __name__ == "__main__":
    main()
