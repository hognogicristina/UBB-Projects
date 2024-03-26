% test no_name, no_name2_jacobi, no_name3_gauss
n = 500;
[A, b] = no_name(n);
x0 = zeros(size(b));
max_it = 100;
err = 10^(-5);

[x, nit] = no_name2_jacobi(A, b, x0, max_it, err);
[x, nit] = no_name3_gauss(A, b, x0, max_it, err);

x
nit

% 2.
A = [10, 7, 8, 7; 7, 5, 6, 5; 8, 6, 10, 9; 7, 5, 9, 10];
b = [32; 23; 33; 31];

% a).
x1 = inv(A)*b

% b).
bi = [32.1; 22.9; 33.1; 30.9];

x2 = inv(A)*bi
err_1 = norm(bi - b)/norm(b)

% c).
Ai = [10, 7, 8.1, 7.2; 7.8, 5.04, 6, 5; 8, 5.98, 9.89, 9; 6.99, 4.99, 9, 9.98];

x3 = inv(Ai)*b
err_2 = norm(x3 - x1)/norm(x1)

% d).
condA = norm(A) * norm(inv(A))
condA = norm(Ai) * norm(inv(Ai))