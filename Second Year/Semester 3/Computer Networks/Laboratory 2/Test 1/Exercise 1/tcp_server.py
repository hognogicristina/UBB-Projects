import socket, pickle # socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
s.bind(("0.0.0.0", 4200)) # bind
s.listen(1) # listen
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
cs, caddr = s.accept() # accept

buff = pickle.loads(cs.recv(1024))
suma = sum(buff)

cs.send(pickle.dumps(suma))
cs.close()
s.close()