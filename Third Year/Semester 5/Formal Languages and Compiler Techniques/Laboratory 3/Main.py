from Scanner import Scanner

if __name__ == "__main__":
    program1 = "p1.txt"
    program2 = "p2.txt"
    program3 = "p3.txt"
    program1err = "p1err.txt"

    scanner1 = Scanner()
    scanner1.read_tokens()
    scanner1.scan(program1)

    scanner2 = Scanner()
    scanner2.read_tokens()
    scanner2.scan(program2)

    scanner3 = Scanner()
    scanner3.read_tokens()
    scanner3.scan(program3)

    scanner4 = Scanner()
    scanner4.read_tokens()
    scanner4.scan(program1err)