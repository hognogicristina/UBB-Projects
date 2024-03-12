% 1. divided differences table simple nodes
% input: x=[0,1/6,1/2]; f = [0,1/2,1]; divided_diff(x, f)

function t = divided_diff(x, f)
    n = length(x);
    t = zeros(n);
    t(:,1) = f';
    for k = 2:n
        t(1:n-k+1, k) = diff(t(1:n-k+2, k-1))./(x(k:n)-x(1:n-k+1))';
    end
end