import socket, pickle
from time import sleep

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    arr1 = [-3, 5, 7.9, 2, 9.6, 4, -1]
    arr2 = [2, 3, -1, 6, 9.7, 4, 8]
    arr1_ascuns = pickle.dumps(arr1)
    arr2_ascuns = pickle.dumps(arr2)
    s.send(arr1_ascuns)
    sleep(1)
    s.send(arr2_ascuns)

    list = s.recv(4096)
    list = pickle.loads(list)
    print(list)

    s.close()


if __name__ == "__main__":
    main()
