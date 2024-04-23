% 1.
xi = -2:4;
x = linspace(-2, 4);
fi = (xi + 1)./(3*xi.^2 + 2*xi + 1);
plot(xi, fi, 'o');
f = (x + 1)./(3*x.^2 + 2*xx + 1);
hold on;
plot(x, f);

d = divided_diff(xi, fi);
plot(x,newton_int(xi,d,x));

dfi = -(3*xi.^2 + 6*xi + 1)./(3*xi.^2 + 2*xi + 1).^2;

[zi, d2] = divided_diff2(xi, fi, dfi);
plot(x, newton_int(zi, d2, x));

S = spline(xi, fi, x);
plot(x, S);


% 2. 
xi = [-1, -1/2, 0, 1/2, 1, 3/2];
fi = xi.*sin(pi*xi);
plot(xi, fi, 'o');
x = linspace(-1, 3/2);
f = x.*sin(pi*x);
hold on
plot(x, f);
s = spline(xi, fi, x);
plot(x, s);

dfi = sin(pi*xi) + pi*xi.*cos(pi*xi);
dc = spline(xi, [pi, fi, -1], x);
pchip(xi, fi, x);

% 3.

xi = [0.5, 1.5, 2, 3, 3.5, 4.5, 5, 6, 7, 8];
fi = [5, 5.8, 5.8, 6.8, 6.9, 7.6, 7.8, 8.2, 9.2, 9.9];
hold on
scatter(xi, fi);
plot(xi, fi, 'o');
p = polyfit(xi, fi, 1);
plot([0.5, 8], polyval(p, [0.5, 8]))
norm(fi - polyval(p, xi));