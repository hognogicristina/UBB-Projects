import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def merge(str1, str2):
    str = []
    str = str1 + str2
    str.sort()
    
    return str

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str1 = conn.recv(4096)
    str2 = conn.recv(4096)
    str1 = pickle.loads(str1)
    str2 = pickle.loads(str2)

    str = merge(str1, str2)
    str_ascuns = pickle.dumps(str)
    conn.send(str_ascuns)
    
    conn.close()


if __name__ == "__main__":
    main()