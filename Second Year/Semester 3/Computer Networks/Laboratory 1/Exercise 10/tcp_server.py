import socket, pickle

IP = "0.0.0.0"
PORT = 7777

def character(str1, str2):
    c = 0
    max = 0
    list = []
    cha = ""
    
    for i in range(len(str1)):
        if str1[i] != " ":
            if str1[i] == str2[i]:
                   list.append(str1[i])

    for i in range(len(list)):
        c = 1
        for j in range(i + 1, len(list)):
            if list[j] == list[i]:
                c += 1
                if c > max:
                    cha = list[j]
                    max = c

    return cha, max
    
def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    str1 = conn.recv(4096)
    str2 = conn.recv(4096)
    str1 = pickle.loads(str1)
    str2 = pickle.loads(str2)
    
    cha = character(str1, str2)
    cha_ascuns = pickle.dumps(cha)
    conn.send(cha_ascuns)
    
    conn.close()
    s.close()


if __name__ == "__main__":
    main()