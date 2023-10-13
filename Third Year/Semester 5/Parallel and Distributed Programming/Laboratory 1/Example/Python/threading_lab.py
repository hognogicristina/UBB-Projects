import threading
# https://docs.python.org/3/library/threading.html
# Why we don't usually use python threading except for io:
#CPython implementation detail: In CPython, due to the Global Interpreter Lock,
# only one thread can execute Python code at once (even though certain performance-oriented 
# libraries might overcome this limitation). If you want your application to make better use of the computational resources of multi-core machines,
# you are advised to use multiprocessing or concurrent.futures.ProcessPoolExecutor. 
# However, threading is still an appropriate model if you want to run multiple I/O-bound tasks simultaneously.



def print_numbers():
    for i in range(10):
        print(f"Number: {i}")

t = threading.Thread(target=print_numbers)
t.start()
t.join()