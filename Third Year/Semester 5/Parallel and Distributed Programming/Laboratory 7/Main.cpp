#include <iostream>
#include <vector>
#include <mpi.h>
#include "Polynomial.h"
#include "Util.h"

int main(int argc, char* argv[]) {
    MPI_Init(&argc, &argv);

    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    if (world_rank == 0) {
        Polynomial polyA(4);
        polyA.GeneratePolynomial();
        Polynomial polyB(8);
        polyB.GeneratePolynomial();

        std::cout << "A: " << polyA.ToString() << std::endl;
        std::cout << "B: " << polyB.ToString() << std::endl;

        std::cout << "Rank: " << world_rank << std::endl;
        std::cout << "PolyKaraCheck: " << Util::Karatsuba(polyA, polyB).ToString() << std::endl;
        // You can call MpiKaratsubaParent here if needed.
    } else {
        std::cout << "Rank: " << world_rank << std::endl;
        // You can call MpiKaratsubaChild here if needed.
    }

    MPI_Finalize();
    return 0;
}
