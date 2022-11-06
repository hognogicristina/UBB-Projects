import socket, pickle

IP = "0.0.0.0"
PORT = 7777



def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    l = conn.recv(4096)
    l = pickle.loads(l)
    print(sum(l))
    conn.close()


if __name__ == "__main__":
    main()