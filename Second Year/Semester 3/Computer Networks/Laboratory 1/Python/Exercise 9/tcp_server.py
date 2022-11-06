import socket, pickle

P = "0.0.0.0"
PORT = 7777

def common(arr1, arr2):
    list = []

    for i in range(len(arr1)):
        ok = 1
        for j in range(len(arr2)):
            if arr1[i] == arr2[j]:
                ok = 0
                break
        
        if ok == 1:
            list.append(arr1[i])
                
    return list
    
def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)

    conn, addr = s.accept()
    arr1 = conn.recv(4096)
    arr2 = conn.recv(4096)
    arr1 = pickle.loads(arr1)
    arr2 = pickle.loads(arr2)
    
    list = common(arr1, arr2)
    list_ascuns = pickle.dumps(list)
    conn.send(list_ascuns)
    
    conn.close()
    s.close()


if __name__ == "__main__":
    main()