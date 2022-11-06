import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def divisors(n):
    d = 1
    list = []
    n_new = n
    while d < n // 2:
        if not n % d:
            list.append(d)
        d += 1

    list.append(n_new)
    return list

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    n = conn.recv(4096)
    n = pickle.loads(n)

    print(divisors(n))
    
    conn.close()


if __name__ == "__main__":
    main()