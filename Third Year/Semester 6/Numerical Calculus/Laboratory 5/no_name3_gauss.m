function [x, nit] = no_name3_gauss(A, b, x0, max_it, err)
    M = tril(A);
    N = -triu(A, 1);
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