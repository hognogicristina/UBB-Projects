from Grammar import Grammar

if __name__ == '__main__':
    g = Grammar()
    file_name = "g1.txt"
    g.read_from_file(file_name)

    print(str(g))

    base_name = file_name.split(".")[0]
    if g.check_cfg():
        print(f"The grammar {base_name} is a CFG\n")
    else:
        print(f"The grammar {base_name} is not a CFG\n")

    file_name = "g2.txt"
    g.read_from_file(file_name)

    print(str(g))

    base_name = file_name.split(".")[0]
    if g.check_cfg():
        print(f"The grammar {base_name} is a CFG\n")
    else:
        print(f"The grammar {base_name} is not a CFG\n")

    file_name = "g3.txt"
    g.read_from_file(file_name)

    print(str(g))

    base_name = file_name.split(".")[0]
    if g.check_cfg():
        print(f"The grammar {base_name} is a CFG\n")
    else:
        print(f"The grammar {base_name} is not a CFG\n")
