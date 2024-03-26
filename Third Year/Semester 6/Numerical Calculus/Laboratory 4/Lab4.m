%x Ex. 1 Method 1
A = [2 1 -1 -2; 4 4 1 3; -6 -1 10 10; -2 1 8 4];
b = [2 4 -5 1]';

[L, U, P] = lu(A);

%y = forward_subs(L, P * b);
%x = backward_subs(U, y);

% Ex. 1 Method 2
% Gaussian elimination and factorizations
x = gauss_pivot(A, b)