from Grammar.Grammar import Grammar
from Parser.Parser import Parser
from Parser.ParserOutput import ParserOutput
from Scanner.Scanner import Scanner

import os


def main():
    while True:
        print("Choose an option:")
        print("1. Using Sequence w = aacbc")
        print("2. Using program p1.txt")
        print("0. Quit")

        choice = input("Enter your choice: ")

        if choice == '1':
            grammar_file = "grammars/g1.in"
            sequence_file = "sequence/seq1.txt"
            output_file = "out/out1.txt"
            execute_parser(grammar_file, sequence_file, output_file)
        elif choice == '2':
            scanner_program = "p1.txt"
            execute_scanner(scanner_program)

            sequence_file = "sequence/PIF.out"
            if os.path.exists(sequence_file):
                grammar_file = "grammars/g2.in"
                output_file = "out/out2.txt"
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
