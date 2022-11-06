import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def reverse(str):
    aux = ""
    i = 1
    for e in range(len(str)):
        aux += str[len(str) - i]
        i += 1
    return aux

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str = conn.recv(4096)
    str = pickle.loads(str)

    print(reverse(str))

    conn.close()


if __name__ == "__main__":
    main()