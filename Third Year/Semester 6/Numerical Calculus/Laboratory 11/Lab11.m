% ex1.
pi*sqrt(3)/9
[I, nf] = romberg(@(x)1./(2 + sin(x)), 0, pi/2, 10^(-6), 50);

% ex2.
[I, n, c] = gauss_quad(@(x)(x.^2 + 1)./(x.^2 + 1), 2, 3);
2*I;

% ex3.
for nodes = 1:5
  gauss_quad(@(x) exp(cos(x)), nodes, 1);
end
integral(@(x) exp(cos(x)), 0, pi/4);

% ex4.
% b)
gauss_quad(@(x)cos(x), 4, 5)