% 1 a) and b)
p(-2.5)
help polyval
p=[1,-5,-16,16,-17,21]
polyval(p,-2.5)
[-4,7.2]
x = -4:0.1:7.2
px = polyval(p,x)
plot(x,px)

% c)
roots(p)
polyval(p,7)
polyval(0,2*pi,150)
x = linspace(0,2*pi,150)

% 2
plot(x, sin(x))
plot(x, sin(x),x,sin(2*x),x,sin(3*x))
clf
clf(x, sin(x),x,sin(2*x),x,sin(3*x))
hold on
plot(x, sin(2*x))
f = @(x) sin(x)
f([1,2])
fplot(f,[0,2*pi])
hold on
subplot(3,1,1)
fplot(f,[0,2*pi])
subplot(3,1,2)

% 3
fplot(@(x) sin(2*x), [0,2*pi])
t = linspace(0,10*pi,1000)
y = (R+r)*sin(t)-r*sin((R/r+1)*t)
plot(x,y)

% 4
[x,y] = meshgrid(linspace(-2,2),linspace(0.5,4.5))
f=sin(exp(x)).*cos(log(y))
mesh(x,y,f)
plot3(x,y,f)