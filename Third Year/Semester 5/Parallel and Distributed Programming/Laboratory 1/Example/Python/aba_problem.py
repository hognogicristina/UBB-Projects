import threading

# Shared variable
shared_var = 'A'

def thread_1():
    global shared_var
    if shared_var == 'A':
        # Context switch happens here, and thread_2 changes shared_var to 'B' and then back to 'A'
        shared_var = 'C'

def thread_2():
    global shared_var
    shared_var = 'B'
    shared_var = 'A'

# Create threads
t1 = threading.Thread(target=thread_1)
t2 = threading.Thread(target=thread_2)

# Start threads
t1.start()
t2.start()

# Wait for both threads to finish
t1.join()
t2.join()

print(f"Final value of shared_var: {shared_var}")  # Output will be 'C', but this is misleading


### Mutex Preventive Techniques:

## Locks

# import threading
# lock = threading.Lock()
# with lock:
#     # critical section

## Semaphores: A generalization of mutexes, allowing more than one thread to enter the critical section.

# semaphore = threading.Semaphore(2)
# with semaphore:
#     # critical section

## Monitors: An object-oriented approach to mutual exclusion, encapsulating the shared resource and its mutex.


# class Monitor:
#     def __init__(self):
#         self.lock = threading.Lock()

#     def method(self):
#         with self.lock:
#             # critical section
# Cnditional Object https://docs.python.org/3/library/threading.html#condition-objects
# condition = threading.Condition()
# with condition:
#     # critical section
#     condition.notify_all()
    
# Barriers: https://docs.python.org/3/library/threading.html#barrier-objects