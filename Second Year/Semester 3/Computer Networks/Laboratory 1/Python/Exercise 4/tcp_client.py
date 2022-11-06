import socket, pickle
from time import sleep

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    str1 = ["a", "d", "j"]
    str2 = ["f", "m", "x"]
    str1_ascuns = pickle.dumps(str1)
    str2_ascuns = pickle.dumps(str2)
    s.send(str1_ascuns)
    sleep(1)
    s.send(str2_ascuns)

    str = s.recv(4096)
    str = pickle.loads(str)
    print(str)
    
    s.close()


if __name__ == "__main__":
    main()
