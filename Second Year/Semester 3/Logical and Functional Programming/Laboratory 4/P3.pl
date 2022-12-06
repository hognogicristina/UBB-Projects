% -----------------------------------------------------------------------------------------------------

% PROBLEM AREA

% 3. Write a predicate to determine all decomposition of n (n given, positive), as sum of consecutive natural numbers.

% -----------------------------------------------------------------------------------------------------

% CODE AREA

% oneSol(N: number, I: integer, L: list)
% flow model: (i, i, o), (i, i, i)
% for command line: oneSol(15, 1, L).

oneSol(0, _, []).
oneSol(N, I, [I|T]):-
    N >= I,
    N1 is N - I,
    I1 is I + 1,
    oneSol(N1, I1, T).

% decomposition(N: number, I: integer, L: list)
% flow model: (i, i, o), (i, i, i)
% for command line: decomposition(15, 1, L).

decomposition(N, I, L):-
    I < N, 
    oneSol(N, I, L).
decomposition(N, I, L):-
    I < N,
    I1 is I + 1,
    decomposition(N, I1, L).

% allSols(N: number, L: list)
% flow model: (i, o), (i, i)
% for command line: allSols(15, L).

allSols(N, L):-
    findall(L1, decomposition(N, 1, L1), L).
    
% -----------------------------------------------------------------------------------------------------

% TESTS AREA

% for command line: testAllSols.
testAllSols:-
    allSols(15, [[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]]),
    allSols(30, [[4, 5, 6, 7, 8], [6, 7, 8, 9], [9, 10, 11]]),
    allSols(18, [[3, 4, 5, 6], [5, 6, 7]]),
    allSols(6, [[1, 2, 3]]),
    \+(allSols(6, [[1, 2, 3], [2, 4]])).