% ex 1
% a
xi = [0,1/3,1/2,1];
fi = cos(pi*xi);
d = divided_diff(xi, fi); 
xx = linspace(0,1,100);

% b
%plot(xx,cos(pi*xx),xx,newton_int(xi,d,xx))

% d
x = 1/5;
n = newton_int(xi, d, x);
c = cos(pi/5);

% ex 2
xi = -4:4;
fi = 2.^xi;
a = aitken(xi, fi, 1/2)
s = sqrt(2)

% ex 3
xi = [1000,1010,1020,1030,1040,1050];
fi = [3.0000000,3.0043214,3.0086002,3.0128372,3.0170333,3.0211893];

d = divided_diff(xi,fi);
x = [1001,1002,1003,1004,1005,1006,1007,1008,1009];
n = newton_int(xi, d, x);
l = log10(x);