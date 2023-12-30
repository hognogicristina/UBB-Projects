from Grammar.Grammar import Grammar
from Parser.Parser import Parser
from Parser.ParserOutput import ParserOutput
from Scanner.Scanner import Scanner

import os


def main():
    while True:
        print("Choose an option:")
        print("1. Using Sequence w = aacbc")
        print("2. Using program p1.txt, p2.txt, or p3.txt")
        print("0. Quit")

        choice = input("Enter your choice: ")

        if choice == '1':
            grammar_file = "grammars/g1.in"
            sequence_file = "sequence/seq1.txt"
            output_file = f"out/out1.txt"
            execute_parser(grammar_file, sequence_file, output_file)
        elif choice == '2':
            while True:
                print("Choose a program:")
                print("1. p1.txt")
                print("2. p2.txt")
                print("3. p3.txt")
                print("0. Go back")
                program_choice = input("Enter your program choice: ")

                if program_choice == '1':
                    scanner_program = "p1.txt"
                    output_file_prefix = "out2p1"
                elif program_choice == '2':
                    scanner_program = "p2.txt"
                    output_file_prefix = "out2p2"
                elif program_choice == '3':
                    scanner_program = "p3.txt"
                    output_file_prefix = "out2p3"
                elif program_choice == '0':
                    break
                else:
                    print("Invalid program choice. Please select a valid option.")
                    continue

                execute_scanner(scanner_program)

                sequence_file = "sequence/PIF.out"
                if os.path.exists(sequence_file):
                    grammar_file = "grammars/g2.in"
                    output_file = f"out/{output_file_prefix}.txt"
                    execute_parser(grammar_file, sequence_file, output_file)
                else:
                    print("PIF.out file does not exist. Please check your scanner.")
        elif choice == '0':
            break
        else:
            print("Invalid choice. Please select a valid option.")
            continue


def execute_scanner(program):
    scanner = Scanner()
    scanner.read_tokens()
    scanner.scan(program, "sequence")


def execute_parser(grammar_file, sequence_file, output_file):
    grammar = Grammar()
    grammar.read_from_file(grammar_file)

    parser = Parser(grammar, sequence_file, output_file)
    parser.run()

    parser_output = ParserOutput(grammar, sequence_file, output_file)
    parser_output.create_parsing_tree(parser.working)
    parser_output.write_parsing_tree(parser.state, parser.working)


if __name__ == "__main__":
    main()
