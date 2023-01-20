pkg load statistics

% b)
fprintf('\nPart b.\n')
% check if the average assembling time of the standard method is greater than the average assembling time of the new method

x = [46, 37, 39, 48, 47, 44, 35, 31, 44, 37];
y = [35, 33, 31, 35, 34, 30, 27, 32, 31, 31];
alpha = 0.05;
l = length(x);

% the critical value of the t-distribution with l - 1 degrees of freedom for a two-tailed test, at the probability 1 - alpha/2
critical_value = tinv(1 - alpha/2, l - 1);

% ttest2 is a two-sample t-test for the null hypothesis that the means of two independent samples are equal
[h, p, ci, stats] = ttest2(x, y, 'alpha', alpha, 'tail', 'left')

fprintf('95%% Confidence interval for the difference of the average assembling time is [%.3f, %.3f]\n', ci(1), ci(2));
