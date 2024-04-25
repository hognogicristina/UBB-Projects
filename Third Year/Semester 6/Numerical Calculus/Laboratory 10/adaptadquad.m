function I = adaptadquad(f, a, b, eps, met, m)
    I1 = met(f, a, b, m);
    I2 = met(f, a, b, 2*m);
    
    if (abs(I1 - I2)) < eps
        I = I2;
    else
        I = adaptadquad(f, a, (a+b)./2, eps, met, m) + adaptadquad(f, (a+b)./2, b, eps, met, m);
     
end