#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Function to encrypt the plaintext using a 2x2 Hill matrix
string hillCipherEncrypt(const string &plaintext, const vector<vector<int>> &keyMatrix) {
    string ciphertext;

    for (int i = 0; i < plaintext.length(); i += 2) {
        // Convert the character to its ASCII value and subtract 65
        int p1 = plaintext[i] - 'A';
        int p2 = plaintext[i + 1] - 'A';

        // Display the intermediate values
        cout << "Step " << (i / 2) + 1 << ":" << endl;
        // p1 and p2 the actual text
        cout << "p1 = " << p1 << " (ASCII value of first character - 'A')" << endl;
        cout << "p2 = " << p2 << " (ASCII value of second character - 'A')" << endl;

        // c1 and c2 are the encrypted values
        // Modulo 26 to wrap around the alphabet
        int c1 = (keyMatrix[0][0] * p1 + keyMatrix[0][1] * p2) % 26;
        int c2 = (keyMatrix[1][0] * p1 + keyMatrix[1][1] * p2) % 26;

        cout << "c1 = (" << keyMatrix[0][0] << " * " << p1 << " + " << keyMatrix[0][1] << " * " << p2 << ") % 26 = " << c1 << endl;
        cout << "c2 = (" << keyMatrix[1][0] << " * " << p1 << " + " << keyMatrix[1][1] << " * " << p2 << ") % 26 = " << c2 << endl;

        // Convert the ASCII value back to a character
        ciphertext += static_cast<char>(c1 + 'A');
        ciphertext += static_cast<char>(c2 + 'A');

        cout << "Intermediate Ciphertext: " << ciphertext << endl;
    }

    return ciphertext;
}

// Function to calculate the determinant of a 2x2 matrix
int determinant(const vector<vector<int>> &matrix) {
    return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
}

// Function to calculate the gcd of two numbers
int gcd(int a, int b) {
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

int main() {
    string plaintext, ciphertext;
    vector<vector<int>> keyMatrix(2, vector<int>(2));

    // Initialize the key matrix (2x2)
    keyMatrix[0][0] = 3;
    keyMatrix[0][1] = 1;
    keyMatrix[1][0] = 6;
    keyMatrix[1][1] = 5;

//    keyMatrix[0][0] = 2;
//    keyMatrix[0][1] = 2;
//    keyMatrix[1][0] = 2;
//    keyMatrix[1][1] = 13;

    // Add this check in the main function before the encryption
    int det = determinant(keyMatrix);
    int det_gcd = gcd(det, 26);

    // If the determinant is 0 or gcd(det, 26) is not 1, the matrix is not invertible
    if (det == 0 || det_gcd != 1) {
        cout << det << endl;
        cout << "ERROR: Key matrix is not invertible." << endl;
        return 1;
    }

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
