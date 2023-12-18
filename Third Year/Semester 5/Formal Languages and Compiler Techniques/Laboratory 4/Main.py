from Scanner import Scanner
from FA import FA


def print_menu():
    print("\nMenu:")
    print("1. Use Scanner")
    print("2. Use FA")
    print("0. Exit\n")


def print_menu_fa():
    print("\nMenu:")
    print("1. Print states")
    print("2. Print alphabet")
    print("3. Print output states")
    print("4. Print initial state")
    print("5. Print transitions")
    print("6. Check word")
    print("7. Get matching substring")
    print("0. Go back\n")


if __name__ == "__main__":
    while True:
        print_menu()
        option = int(input("Enter an option: "))
        if option == 0:
            break
        elif option == 1:
            program1 = "p1.txt"
            program2 = "p2.txt"
            program3 = "p3.txt"
            program1err = "p1err.txt"

            while True:
                scanner_option = int(input("Enter an option for Scanner: "))
                if scanner_option == 0:
                    break
                elif scanner_option == 1:
                    scanner = Scanner()
                    scanner.read_tokens()
                    scanner.scan(program1)
                elif scanner_option == 2:
                    scanner = Scanner()
                    scanner.read_tokens()
                    scanner.scan(program2)
                elif scanner_option == 3:
                    scanner = Scanner()
                    scanner.read_tokens()
                    scanner.scan(program3)
                elif scanner_option == 4:
                    scanner = Scanner()
                    scanner.read_tokens()
                    scanner.scan(program1err)
                else:
                    print("Invalid Scanner option. Please try again.")
        elif option == 2:
            fa = FA("utilities/fa.in")

            while True:
                print_menu_fa()
                fa_option = int(input("Enter an option for FA: "))
                if fa_option == 0:
                    break
                elif fa_option == 1:
                    fa.print_states()
                elif fa_option == 2:
                    fa.print_alphabet()
                elif fa_option == 3:
                    fa.print_output_states()
                elif fa_option == 4:
                    fa.print_initial_state()
                elif fa_option == 5:
                    fa.print_transitions()
                elif fa_option == 6:
                    while True:
                        word = input("Enter a word (or type '0' to return to the FA menu): ")
                        if word == '0':
                            break
                        accepted = fa.check_accepted(word)
                        if accepted:
                            print(f"The word '{word}' is accepted.")
                        else:
                            print(f"The word '{word}' is NOT accepted.")
                elif fa_option == 7:
                    while True:
                        word = input("Enter a word (or type '0' to return to the FA menu): ")
                        if word == '0':
                            break
                        longest_accepted = fa.get_next_accepted(word)
                        if longest_accepted:
                            print(f"The longest accepted substring is '{longest_accepted}'.")
                        else:
                            print("No accepted substring found.")
                else:
                    print("Invalid FA option. Please try again.")
        else:
            print("Invalid option. Please try again.")