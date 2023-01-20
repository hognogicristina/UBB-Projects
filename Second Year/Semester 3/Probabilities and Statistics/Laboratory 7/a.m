pkg load statistics

% a)
fprintf('\nPart a.\n')
% reject the null hypothesis if the test statistic is less than the critical value

standard = [46, 37, 39, 48, 47, 44, 35, 31, 44, 37];
new = [35, 33, 31, 35, 34, 30, 27, 32, 31, 31];
alpha = 0.05;

% vartest2 is a two-sample test for the null hypothesis that the variances of two independent samples are equal
[h, p, ci, stats] = vartest2(standard, new, 'alpha', alpha, 'tail', 'left')

if h == 0  % if we fail to reject the null hypothesis
    fprintf("The variances are not significantly different at the %g level.\n", alpha);
else
    fprintf("The variances are significantly different at the %g level.\n", alpha);
end
