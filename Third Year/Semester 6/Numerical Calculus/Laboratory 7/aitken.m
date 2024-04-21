function f = aitken(xi, fi, x)
    n = length(xi);
    for i = 1:n
        p(i, 1) = fi(i);
        for j = 1:i-1
            p(i, j+1) = ((x-xi(j))* p(i,j) - (x-xi(i)) * 
            p(j,j)) / (xi(i)-xi(j));
        end
    end
    
    f(n) = p(n, n);
end 
