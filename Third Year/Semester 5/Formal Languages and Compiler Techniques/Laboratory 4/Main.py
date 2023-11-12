from FA import FA


def print_menu():
    print("\nMenu:")
    print("1. Print states")
    print("2. Print alphabet")
    print("3. Print output states")
    print("4. Print initial state")
    print("5. Print transitions")
    print("6. Check word")
    print("7. Get matching substring")
    print("0. Exit\n")


if __name__ == "__main__":
    fa = FA("utilities/fa.in")

    try:
        while True:
            print_menu()
            option = int(input("Enter an option: "))
            if option == 0:
                break  # Exit the loop and end the program
            elif option == 1:
                fa.print_states()
            elif option == 2:
                fa.print_alphabet()
            elif option == 3:
                fa.print_output_states()
            elif option == 4:
                fa.print_initial_state()
            elif option == 5:
                fa.print_transitions()
            elif option == 6:
                while True:
                    word = input("Enter a word (or type 'exit' to return to the main menu): ")
                    if word.lower() == 'exit':
                        break
                    accepted = fa.check_accepted(word)
                    if accepted:
                        print(f"The word '{word}' is accepted.")
                    else:
                        print(f"The word '{word}' is NOT accepted.")
            elif option == 7:
                while True:
                    word = input("Enter a word (or type 'exit' to return to the main menu): ")
                    if word.lower() == 'exit':
                        break
                    longest_accepted = fa.get_next_accepted(word)
                    if longest_accepted:
                        print(f"The longest accepted substring is '{longest_accepted}'.")
                    else:
                        print("No accepted substring found.")
            else:
                print("Invalid option. Please try again.")
    except KeyboardInterrupt:
        print("\nProgram interrupted. Exiting...")
