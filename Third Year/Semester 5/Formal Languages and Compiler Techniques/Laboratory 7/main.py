from Grammar.Grammar import Grammar
from Parser.Parser import Parser
from Parser.ParserOutput import ParserOutput
from Scanner.Scanner import Scanner

import os


def main():
    while True:
        print("Choose an option:")
        print("1. Run Parser 1")
        print("2. Run Parser 2")
        print("3. Testing..")
        print("0. Quit")

        choice = input("Enter your choice: ")

        if choice == '1':
            grammar_file = "grammars/g1.in"
            sequence_file = "grammars/seq1.txt"
            output_file = "out/out1.txt"
            execute_parser(grammar_file, sequence_file, output_file)
        elif choice == '2':
            scanner_program = "p1.txt"
            execute_scanner(scanner_program)

            sequence_file = "grammars/PIF.out"
            if os.path.exists(sequence_file):
                grammar_file = "grammars/g2.in"
                output_file = "out2.txt"
                execute_parser(grammar_file, sequence_file, output_file)
            else:
                print("PIF.out file does not exist. Please check your scanner.")
        elif choice == '3':
            grammar_file = "grammars/g2.in"
            sequence_file = "language/seq3.txt"
            output_file = "out3.txt"
            execute_parser(grammar_file, sequence_file, output_file)

            # scanner_program = "seq3.txt"
            # execute_scanner(scanner_program)
            #
            # sequence_file = "grammars/PIF.out"
            # if os.path.exists(sequence_file):
            #     grammar_file = "grammars/g2.in"
            #     output_file = "out3.txt"
            #     execute_parser(grammar_file, sequence_file, output_file)
        elif choice == '0':
            break
        else:
            print("Invalid choice. Please select a valid option.")
            continue


def execute_scanner(program):
    scanner = Scanner()
    scanner.read_tokens()
    scanner.scan(program, "grammars")


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
