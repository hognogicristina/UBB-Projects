function I = simpson(f, a, b, n)
    h = (b-a)/n;
    m = n/2;
    I = h/3*(f(a) + 4*sum(f(a + (2*[1:m] - 1)*h)) + 2*sum(f(a + (2*[1:m-1]*2)*h)) + f(b));
end

% xL1 = [1:m]*2-1;
% x2 = [1:m-1]*2;
% f(a+x2*h);
% fi = f(a+ih);