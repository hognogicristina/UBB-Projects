#include <iostream>
#include <string>
#include <ctime>
#include <cstdlib>
#include <cmath>
#include <cctype>

using namespace std;

// Function to check if a string contains only valid characters ('A' to 'Z' and '_')
bool is_valid_input(const string &input) {
    for (char ch: input) {
        if (ch != '_' && (ch < 'A' || (ch > 'Z' && ch < 'a') || ch > 'z')) {
            return false;
        }
    }

    return true;
}

// Function to check if a number is prime
bool is_prime(unsigned long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    for (unsigned long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }

    return true;
}

// Function to compute the greatest common divisor (GCD) using Euclid's algorithm
unsigned long long gcd(unsigned long long a, unsigned long long b) {
    if (b == 0) {
        return a;
    }

    return gcd(b, a % b);
}

// Function to compute modular exponentiation (a^b mod m)
unsigned long long mod_pow(unsigned long long base, unsigned long long exp, unsigned long long mod) {
    unsigned long long result = 1;

    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp /= 2;
    }

    return result;
}

// Function to calculate the modular multiplicative inverse
unsigned long long mod_inverse(unsigned long long a, unsigned long long m) {
    for (unsigned long long x = 1; x < m; x++) {
        if ((a * x) % m == 1) {
            return x;
        }
    }

    return 0; // Inverse doesn't exist
}

// Function to convert letters to a number, treating lowercase letters as uppercase
unsigned long long letters_to_num(const string &letters) {
    unsigned long long num = 0;

    for (char letter: letters) {
        // Convert lowercase letter to uppercase
        char uppercaseLetter = toupper(letter);

        if (uppercaseLetter == '_') {
            num = num * 27;
        } else {
            num = num * 27 + (uppercaseLetter - 'A' + 1);
        }
    }

    return num;
}

// Function to convert a number to letters
string num_to_letters(unsigned long long number, int block_size) {
    string text;

    for (int i = block_size - 1; i >= 0; i--) {
        unsigned long long coefficient = number / pow(27, i);
        number %= static_cast<unsigned long long>(pow(27, i));
        if (coefficient > 0) {
            text += static_cast<char>('A' + coefficient - 1);
        } else {
            text += '_';
        }
    }

    return text;
}

// Function to encrypt plaintext using the public key
string encrypt(unsigned long long n, unsigned long long e, const string &plaintext) {
    int block_size = 2;
    string encrypted_text;

    for (size_t i = 0; i < plaintext.length(); i += block_size) {
        string block = plaintext.substr(i, block_size);
        unsigned long long numerical_block = letters_to_num(block);
        unsigned long long encrypted_block_numerical = mod_pow(numerical_block, e, n);
        encrypted_text += num_to_letters(encrypted_block_numerical, 3); // Ciphertext block size is 3
    }

    return encrypted_text;
}

// Function to decrypt ciphertext using the private key
string decrypt(unsigned long long n, unsigned long long d, const string &ciphertext) {
    int block_size_de = 3;
    string decrypted_text;

    for (size_t i = 0; i < ciphertext.length(); i += block_size_de) {
        string block = ciphertext.substr(i, block_size_de);
        unsigned long long numerical_block = letters_to_num(block);
        unsigned long long decrypted_block_numerical = mod_pow(numerical_block, d, n);
        decrypted_text += num_to_letters(decrypted_block_numerical, 2); // Plaintext block size is 2
    }

    return decrypted_text;
}

int main() {
    srand(static_cast<unsigned int>(time(nullptr))); // Seed the random number generator

    while (true) {
        cout << "RSA Encryption/Decryption\n";
        // User inputs p and q
        unsigned long long p, q;
        string pInput, qInput;
        do {
            cout << "Enter prime number p: ";
            cin >> pInput;
            if (pInput.find_first_not_of("0123456789") == string::npos) {
                p = stoull(pInput);
                if (!is_prime(p)) {
                    cout << "p is not a prime number.\n";
                }
            } else {
                cout << "Invalid input.\n";
            }
        } while (!is_prime(p));

        do {
            cout << "Enter prime number q: ";
            cin >> qInput;
            if (qInput.find_first_not_of("0123456789") == string::npos) {
                q = stoull(qInput);
                if (!is_prime(q)) {
                    cout << "q is not a prime number.\n";
                } else if (q == p) {
                    cout << "q must be different from p.\n";
                }
            } else {
                cout << "Invalid input. Please enter a valid positive integer.\n";
            }
        } while (!is_prime(q) || q == p);

        unsigned long long n = p * q;
        unsigned long long phi_n = (p - 1) * (q - 1);

        unsigned long long e;

        while (true) {
            string eChoice;
            cout << "Choose encryption exponent: (1) Random (2) Manual: ";
            cin >> eChoice;

            if (eChoice == "1") {
                // Randomly choose e within the interval (1 < e < φ(n))
                do {
                    e = rand() % (phi_n - 2) + 2;
                } while (gcd(e, phi_n) != 1);
                break; // Exit the loop if a valid e is generated
            } else if (eChoice == "2") {
                // Manual input of e with validation
                do {
                    string eInput;
                    cout << "Enter e (1 < e < " << phi_n << ") such that gcd(e, φ(n)) = 1: ";
                    cin >> eInput;
                    if (eInput.find_first_not_of("0123456789") == string::npos) {
                        e = stoull(eInput);
                        if (!(e > 1 && e < phi_n && gcd(e, phi_n) == 1)) {
                            cout << "Entered e is not in the valid interval or doesn't satisfy gcd(e, φ(n)) = 1.\n";
                        } else {
                            break; // Exit the loop if a valid e is provided
                        }
                    } else {
                        cout << "Invalid input. Please enter a valid positive integer.\n";
                    }
                } while (true);
                break; // Exit the loop if a valid e is provided
            } else {
                cout << "Invalid choice for e. Please select again.\n";
            }
        }

        unsigned long long d = mod_inverse(e, phi_n);

        cout << "Values:\n";
        cout << "Public Key: (n, e) = (" << n << ", " << e << ")" << "\n";
        cout << "Private Key (d) = " << d << "\n";
        cout << "Euler Function: φ(n) = " << phi_n << "\n";

        while (true) {
            cout << "\nMenu:\n";
            cout << "1. Encrypt\n";
            cout << "2. Decrypt\n";
            cout << "3. Generate New Keys\n";
            cout << "4. Quit\n";
            cout << "> ";
            string choice;
            cin >> choice;

            if (choice == "1") {
                while (true) {
                    string plaintext;
                    cout << "Enter plaintext: ";
                    cin >> plaintext;

                    if (!is_valid_input(plaintext)) {
                        cout << "Invalid plaintext. Please use only uppercase letters and underscores ('_').\n";
                        // Continue to the next iteration to ask for input again
                        continue;
                    }

                    // Ensure plaintext length is a multiple of block_size
                    while (plaintext.length() % 2 != 0) {
                        plaintext += "_";
                    }

                    cout << "Plaintext:\n";

                    for (size_t i = 0; i < plaintext.length(); i += 2) {
                        string block = plaintext.substr(i, 2);
                        unsigned long long numerical_block = letters_to_num(block);
                        cout << "Block " << i / 2 + 1 << " of 2 letters: " << block << " - Numerical equivalent: " << numerical_block << "\n";
                    }

                    string encrypted_text = encrypt(n, e, plaintext);
                    cout << "\nEncryption:\n";

                    for (size_t i = 0; i < encrypted_text.length(); i += 3) {
                        string block = encrypted_text.substr(i, 3);
                        unsigned long long numerical_block = letters_to_num(block);
                        cout << "c" << i / 3 + 1 << " = b" << i / 3 + 1 << "^e mod n = " << numerical_block << " - Block of 3 letters: " << block
                             << "\n";
                    }

                    cout << "\nCiphertext: " << encrypted_text << "\n";
                    break;
                }
            } else if (choice == "2") {
                while (true) {
                    string ciphertext;
                    cout << "Enter ciphertext: ";
                    cin >> ciphertext;

                    if (!is_valid_input(ciphertext)) {
                        cout << "Invalid ciphertext. Please use only uppercase letters and underscores ('_').\n";
                        continue; // Skip the rest of this iteration and show the menu again
                    }

                    // Ensure ciphertext length is a multiple of 3 (block size of ciphertext)
                    while (ciphertext.length() % 3 != 0) {
                        ciphertext += "_";
                    }

                    cout << "Ciphertext:\n";

                    for (size_t i = 0; i < ciphertext.length(); i += 3) {
                        string block = ciphertext.substr(i, 3);
                        unsigned long long numerical_block = letters_to_num(block);
                        cout << "Block " << i / 3 + 1 << " of 3 letters: " << block << " - Numerical equivalent: " << numerical_block << "\n";
                    }

                    string decrypted_text = decrypt(n, d, ciphertext);
                    cout << "\nDecryption:\n";

                    for (size_t i = 0; i < decrypted_text.length(); i += 2) {
                        string block = decrypted_text.substr(i, 2);
                        unsigned long long numerical_block = letters_to_num(block);
                        cout << "d" << i / 2 + 1 << " = c" << i / 2 + 1 << "^d mod n = " << numerical_block << " - Block of 2 letters: " << block
                             << "\n";
                    }

                    cout << "\nPlaintext: " << decrypted_text << "\n";
                    break;
                }
            } else if (choice == "3") {
                // Generate new keys
                break;

            } else if (choice == "4") {
                // Quit the program
                return 0;

            } else {
                cout << "Invalid choice. Please select again.\n";
            }
        }
    }

    return 0;
}
