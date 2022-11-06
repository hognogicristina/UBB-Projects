import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def count(str):
    c = 0
    for e in str:
        if e == ' ':
            c += 1
    return c

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str = conn.recv(4096)
    str = pickle.loads(str)

    print(count(str))

    conn.close()


if __name__ == "__main__":
    main()