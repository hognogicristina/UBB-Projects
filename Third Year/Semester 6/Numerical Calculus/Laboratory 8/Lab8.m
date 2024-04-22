% 1
xi = [0, 1, 2];
fi = 1./(1 + xi);
d = divdiff(xi, fi);
xx = linspace(0, 2, 100);
Lf = newton_int(xi, d, xx);
plot(xx, Lf)

dfi = -1./(1+xi).^2;
[zi, d2] = divdiff2(xi, fi, dfi);
Hf = newton_int(zi, d2, xx);

hold on;
plot(xx, Hf);

% 2
xi = [0, 3, 5, 8, 13]; % time
fi = [0, 225, 383, 623, 993]; % distance
dfi = [0, 77, 80, 74, 72]; % velocity

x = 10;
[zi, d2] = divdiff2(xi, fi, dfi);
pos = newton_int(zi, d2, x)

d = divdiff(xi, dfi);
newton_int(xi, d, x)

d3 = divdiff(fi, dfi);
newton_int(fi, d3, pos)