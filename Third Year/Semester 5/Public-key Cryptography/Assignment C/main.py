import math
from sympy import mod_inverse


def letters_to_num_en(letters):
    num = 0
    for letter in letters:
        if letter == '_':
            num = num * 27
        else:
            num = num * 27 + (ord(letter) - 64)
    return num


def num_to_letters_en(number):
    text = ''
    for i in range(2, -1, -1):
        coefficient = number // (27 ** i)
        number %= (27 ** i)
        if coefficient > 0:
            text += chr(coefficient + ord('A') - 1)
        else:
            text += '_'
    return text


def encrypt(p, q, plaintext):
    n = p * q
    phi_n = (p - 1) * (q - 1)

    e = 2
    while True:
        if phi_n > e > 1 == math.gcd(e, phi_n):
            break
        e += 1

    block_size_en = 2
    plaintext = plaintext.upper()
    plaintext_blocks = [plaintext[i:i + block_size_en] for i in range(0, len(plaintext), block_size_en)]
    numerical_blocks_en = [letters_to_num_en(block) for block in plaintext_blocks]
    encrypted_blocks_numerical = [pow(b, e, n) for b in numerical_blocks_en]

    encrypted_blocks_letters = [num_to_letters_en(num) for num in encrypted_blocks_numerical]
    new_ciphertext = ''.join(encrypted_blocks_letters)

    print(f'Values:\nn = {n}\nφ(n) = {phi_n}\ne = {e}\n')
    print('Plaintext:')
    for i, block in enumerate(plaintext_blocks):
        print(f'Block {i + 1} of {block_size_en} letters: {block} - Numerical equivalent: {numerical_blocks_en[i]}')
    print('\nEncryption:')
    for i, (num_block_en, letter_block_en) in enumerate(zip(encrypted_blocks_numerical, encrypted_blocks_letters)):
        print(f'c{i + 1} = b{i + 1}^e mod n = {num_block_en} - Block of {block_size_en} letters: {letter_block_en}')
    print('\nCiphertext:', new_ciphertext)


def letters_to_num_de(text):
    number = 0
    for i, char in enumerate(reversed(text)):
        if char == '_':
            coefficient = 0
        else:
            coefficient = ord(char.upper()) - ord('A') + 1
        number += coefficient * (27 ** i)
    return number


def num_to_letters_de(num):
    letters = ''
    while num > 0:
        num, remainder = divmod(num, 27)
        if remainder == 0:
            letters = '_' + letters
        else:
            letters = chr(64 + remainder) + letters
    return letters.rjust(2, '_')


def decrypt(p, q, ciphertext):
    n = p * q
    phi_n = (p - 1) * (q - 1)

    e = 2
    while True:
        if phi_n > e > 1 == math.gcd(e, phi_n):
            break
        e += 1

    d = mod_inverse(e, phi_n)

    block_size_de = 3
    ciphertext = ciphertext.upper()
    ciphertext_blocks = [ciphertext[i:i + block_size_de] for i in range(0, len(ciphertext), block_size_de)]
    numerical_blocks_de = [letters_to_num_de(block) for block in ciphertext_blocks]
    decrypted_blocks_numerical = [pow(b, d, n) for b in numerical_blocks_de]

    decrypted_blocks_letters = [num_to_letters_de(num) for num in decrypted_blocks_numerical]
    new_plaintext = ''.join(decrypted_blocks_letters)

    print(f'Values:\nn = {n}\nφ(n) = {phi_n}\ne = {e}\nd = {d}\n')
    print('Ciphertext:')
    for i, block in enumerate(ciphertext_blocks):
        print(f'Block {i + 1} of {block_size_de} letters: {block} - Numerical equivalent: {numerical_blocks_de[i]}')
    print('\nDecryption:')
    for i, (num_block_de, letter_block_de) in enumerate(zip(decrypted_blocks_numerical, decrypted_blocks_letters)):
        print(f'd{i + 1} = c{i + 1}^d mod n = {num_block_de} - Block of {block_size_de} letters: {letter_block_de}')
    print('\nPlaintext:', new_plaintext)


def main():
    while True:
        print("\nMenu:")
        print("1. Encrypt")
        print("2. Decrypt")
        print("3. Quit")
        choice = input("> ")

        if choice == "1":
            p = int(input("p = "))
            q = int(input("q = "))
            plaintext = input("plaintext = ")
            encrypt(p, q, plaintext)
        elif choice == "2":
            p = int(input("p = "))
            q = int(input("q = "))
            ciphertext = input("ciphertext = ")
            decrypt(p, q, ciphertext)
        elif choice == "3":
            break
        else:
            print("Invalid choice. Please select again.")


if __name__ == "__main__":
    main()
