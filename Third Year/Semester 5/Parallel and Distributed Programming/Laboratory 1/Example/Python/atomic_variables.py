from atomic import Atomic
#https://visualstudio.microsoft.com/visual-cpp-build-tools/
#pip install --upgrade setuptools pip
#pip install atomic
#read more https://sharedatomic.top/

atomic_counter = Atomic(0)

def increment_counter():
    for _ in range(1000):
        atomic_counter.add(1)

threads = []
for i in range(10):
    t = threading.Thread(target=increment_counter)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"Counter: {atomic_counter.value}")