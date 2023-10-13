from multiprocessing import Process

def print_numbers():
    for i in range(10):
        print(f"Number: {i}")

def print_letters():
    for letter in 'LaboratorPDB':
        print(f"Letter: {letter}")

if __name__ == '__main__':
    p1 = Process(target=print_numbers)
    p2 = Process(target=print_letters)

    p1.start()
    p2.start()

    p1.join()
    p2.join()