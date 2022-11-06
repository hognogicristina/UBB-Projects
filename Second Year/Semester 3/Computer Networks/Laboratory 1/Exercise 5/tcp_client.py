import socket, pickle

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    n = 9
    n_ascuns = pickle.dumps(n)
    s.send(n_ascuns)
    
    s.close()


if __name__ == "__main__":
    main()
