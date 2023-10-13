import threading

mutex = threading.Lock()

def critical_section(id):
    with mutex:
        print(f"Thread-{id} entering critical section")
        print(f"Thread-{id} leaving critical section")

threads = []
for i in range(5):
    t = threading.Thread(target=critical_section, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()