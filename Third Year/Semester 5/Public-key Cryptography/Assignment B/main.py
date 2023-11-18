import math
from math import gcd


def fermat_factorization_full_verbose(n):
    t0 = math.isqrt(n)
    t = t0 + 1
    print(f"Initialization:\nt0 = [√{n}] = {t0}\n")

    # Iterations
    counter = 0
    print("Iterations:")
    while True:
        counter += 1
        t2 = t * t - n
        s = math.isqrt(t2)
        perfect_square = "yes" if s * s == t2 else "no"
        print(f"t = t0 + {counter}: t^2 - n = {t2}  perfect square (yes/no) = {perfect_square}")
        if s * s == t2:
            print(f"\nValues:\ns = {s}  t = {t}\n")
            print(f"Conclusion:\nThe obtained two factors of n are (in increasing order) {t - s} and {t + s}\n")
            return (t + s, t - s), counter
        t += 1


def pollards_rho_continue_iterations(n, x0=2, f=lambda x: x ** 2 + 1):
    x = x0
    y = x0
    factor = 1
    iteration = 1
    values = {1: x0}

    print("Iterations (results mod n):")

    while True:
        x = f(x) % n
        y = f(f(y)) % n
        values[iteration] = x

        if iteration <= 16:
            print(f'x{iteration} = {x} (mod {n})')

        if iteration % 2 == 0:
            factor = gcd(abs(x - values[iteration // 2]), n)
            print(f'(|x{iteration} - x{iteration // 2}|, n) = {factor}')

            if factor > 1 and factor < n:
                break

        iteration += 1

    print("\nConclusion:")
    second_factor = n // factor
    print(f"The obtained two factors of n are (in increasing order) {min(factor, second_factor)} and {max(factor, second_factor)}.")

    return min(factor, second_factor), max(factor, second_factor)


n_fermat = 9291
n_pollard = 5627

factors, iterations = fermat_factorization_full_verbose(n_fermat)
print("\n")
pollards_rho_continue_iterations(n_pollard)
