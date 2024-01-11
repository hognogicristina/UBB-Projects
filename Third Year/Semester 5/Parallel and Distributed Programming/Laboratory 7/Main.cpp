#include "Util.h"
#include "Polynomial.h"
#include <iostream>
#include <mpi.h>
#include <vector>

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);

    int world_rank, world_size;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    Polynomial polyA = Polynomial(100000);
    Polynomial polyB = Polynomial(100000);
    if (world_rank == 0) {
        polyA.GeneratePolynomial();
        polyB.GeneratePolynomial();

        std::cout << "A: " << polyA.ToString() << std::endl;
        std::cout << "B: " << polyB.ToString() << std::endl;
    }

    int sizeA = polyA.getN();
    int sizeB = polyB.getN();
    MPI_Bcast(&sizeA, 1, MPI_INT, 0, MPI_COMM_WORLD);
    MPI_Bcast(&sizeB, 1, MPI_INT, 0, MPI_COMM_WORLD);

    if (world_rank != 0) {
        polyA = Polynomial(sizeA);
        polyB = Polynomial(sizeB);
    }

    MPI_Bcast(&polyA.GetCoefficients()[0], sizeA, MPI_INT, 0, MPI_COMM_WORLD);
    MPI_Bcast(&polyB.GetCoefficients()[0], sizeB, MPI_INT, 0, MPI_COMM_WORLD);

    double start_time, end_time;
    if (world_rank == 0) {
        std::cout << "Rank: " << world_rank << std::endl;
        start_time = MPI_Wtime();
        Polynomial resultKaratsuba = Util::Karatsuba(polyA, polyB);
        end_time = MPI_Wtime();
        std::cout << "Karatsuba Multiplication Time: " << (end_time - start_time) * 1000000 << " microseconds"
                  << std::endl;
    } else {
        std::cout << "Rank: " << world_rank << std::endl;
    }

    int start = (sizeA / world_size) * world_rank;
    int end = start + (sizeA / world_size);
    if (world_rank == world_size - 1) {
        end = sizeA;
    }

    MPI_Barrier(MPI_COMM_WORLD);
    start_time = MPI_Wtime();
    Polynomial partialResult = Util::MpiMultiplication(polyA, polyB, start, end);
    end_time = MPI_Wtime();

    int degreeMul = sizeA + sizeB - 1;
    std::vector<int> totalCoefficients(degreeMul, 0);
    MPI_Reduce(&partialResult.GetCoefficients()[0], &totalCoefficients[0], degreeMul, MPI_INT, MPI_SUM, 0,
               MPI_COMM_WORLD);

    if (world_rank == 0) {
        std::cout << "Rank: " << world_rank << std::endl;
        Polynomial resultMPI(degreeMul, totalCoefficients);
        std::cout << "MPI Multiplication Time: " << (end_time - start_time) * 1000000 << " microseconds" << std::endl;
    } else {
        std::cout << "Rank: " << world_rank << std::endl;
    }

    MPI_Finalize();
    return 0;
}
