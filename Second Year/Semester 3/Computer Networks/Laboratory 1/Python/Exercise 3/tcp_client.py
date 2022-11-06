import socket, pickle

IP = "192.168.70.128"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.connect((IP, PORT))
    
    str = "buna"
    str_ascuns = pickle.dumps(str)
    s.send(str_ascuns)

    s.close()


if __name__ == "__main__":
    main()
