#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Function to encrypt the plaintext using a 2x2 Hill matrix
string hillCipherEncrypt(const string &plaintext, const vector<vector<int>> &keyMatrix) {
    string ciphertext;

    for (int i = 0; i < plaintext.length(); i += 2) {
        int p1 = plaintext[i] - 'A'; // Convert the character to its ASCII value and subtract 65
        int p2 = plaintext[i + 1] - 'A'; // Convert the character to its ASCII value and subtract 65

        // Display the intermediate values
        cout << "Step " << (i / 2) + 1 << ":" << endl;
        cout << "p1 = " << p1 << " (ASCII value of first character - 'A')" << endl;
        cout << "p2 = " << p2 << " (ASCII value of second character - 'A')" << endl;

        int c1 = (keyMatrix[0][0] * p1 + keyMatrix[0][1] * p2) % 26; // Modulo 26 to wrap around the alphabet
        int c2 = (keyMatrix[1][0] * p1 + keyMatrix[1][1] * p2) % 26; // Modulo 26 to wrap around the alphabet

        cout << "c1 = (" << keyMatrix[0][0] << " * " << p1 << " + " << keyMatrix[0][1] << " * " << p2 << ") % 26 = " << c1 << endl;
        cout << "c2 = (" << keyMatrix[1][0] << " * " << p1 << " + " << keyMatrix[1][1] << " * " << p2 << ") % 26 = " << c2 << endl;

        ciphertext += static_cast<char>(c1 + 'A'); // Convert the ASCII value back to a character
        ciphertext += static_cast<char>(c2 + 'A'); // Convert the ASCII value back to a character

        cout << "Intermediate Ciphertext: " << ciphertext << endl;
    }

    return ciphertext; // Return the ciphertext
}

int main() {
    string plaintext, ciphertext;
    vector<vector<int>> keyMatrix(2, vector<int>(2));

    // Initialize the key matrix (2x2)
    keyMatrix[0][0] = 3;
    keyMatrix[0][1] = 2;
    keyMatrix[1][0] = 5;
    keyMatrix[1][1] = 7;

    // Input plaintext (uppercase letters only)
    cout << "Enter the plaintext (uppercase letters only): ";
    cin >> plaintext;

    // Check if the plaintext contains lowercase letters
    for (char c: plaintext) {
        if (c < 'A' || c > 'Z') {
            cout << "ERROR: Plaintext must contain only uppercase letters." << endl;
            return main();
        }
    }

    // Encrypt the plaintext
    ciphertext = hillCipherEncrypt(plaintext, keyMatrix);

    // Display the final ciphertext
    cout << "Final Ciphertext: " << ciphertext << endl;

    return 0;
}
