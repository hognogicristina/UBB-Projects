function [x, nit] = no_name2_jacobi(A, b, x0, max_it, err)
    M = diag(diag(A));
    N = M - A;
    T = inv(M)*N;
    c = inv(M)*b;
    alfa = norm(T, inf);
    
    for nit = 1:max_it
        x = T*x0+c;
        if norm(x - x0, inf) < err*(1-alfa)/alfa
            return
        end
        x0 = x;
    end
end