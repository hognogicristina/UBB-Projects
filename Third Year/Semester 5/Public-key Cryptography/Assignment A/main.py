import random

def decompose(n):
    s = 0
    t = n - 1
    while t % 2 == 0:
        s += 1
        t //= 2
    return s, t

def miller_rabin_test(n, a, s, t):
    if pow(a, t, n) == 1:
        return True
    for i in range(s):
        if pow(a, 2**i * t, n) == n - 1:
            return True
    return False

def is_prime_miller_rabin(n, iterations):
    if n == 2 or n == 3:
        return True

    if n <= 1 or n % 2 == 0:
        return False

    s, t = decompose(n)
    x = 10
    y = 5

    for k, a in enumerate([2, 3, 5]):
        print(f"Iteration 𝑘={k + 1} for 𝑎={a} (results mod 𝑛):")
        for i in range(x):
            result = pow(a, 2 ** i, n)
            print(f"{a}^(2^{i}) mod {n} = {result}")

        for i in range(y):
            result = pow(a, 2 ** i * t, n)
            print(f"{a}^({2 ** i}*t) mod {n} = {result}")

        if not miller_rabin_test(n, a, s, t):
            return False

    return True

n = 1817
iterations = 3
s, t = decompose(n)

print(f"Decomposition: s = {s}, t = {t}, t in binary = {bin(t)[2:]}")

is_prime = is_prime_miller_rabin(n, iterations)
if is_prime:
    print("Conclusion: n is likely prime.")
else:
    print("Conclusion: n is composite.")