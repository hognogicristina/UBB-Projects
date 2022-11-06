import socket, pickle

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    arr = [1, 2, 3]
    data_string = pickle.dumps(arr)
    s.send(data_string)

    while True:
        data = s.recv(4096)
        if not data:
            break
        if (s.send(pickle.dumps(arr), (IP, PORT))):
            print()

    s.close()


if __name__ == "__main__":
    main()
