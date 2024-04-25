% 1).
log(2); % 0.6931
f = @(x)1./x;
r1 = rect(f, 1, 2, 10); % 0.6928
r2 = rect(f, 1, 2, 15); % 0.6930
t1 = trapezoid(f, 1, 2, 9); % 0.6939

% 4).
g = @(x)sqrt(1+(pi*cos(pi*x)).^2);
adaptadquad(g, 0, 1, 10^(-6), @simpson, 4); % 2.3049