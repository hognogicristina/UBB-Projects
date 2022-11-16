% -----------------------------------------------------------------------------------------------------

% PROBLEM AREA

% Given a numerical linear list consisting of integers, delete all elements from N to N.

% [1, 2, 3, 4, 5, 6, 7, 8] 3 -> [1, 2, 4, 5, 7, 8]
% [1, 2, 3, 4] 5 -> [1, 2, 3, 4]
% [1, 2, 3, 4, 5, 6, 7, 8] 2 -> [1, 3, 5, 7]
% [1, 2, 3, 4, 5, 6, 7, 8, 9] 5 -> [1, 2, 3, 4, 6, 7, 8, 9]

% -----------------------------------------------------------------------------------------------------

% CODE AREA

% removeElement(L: list, N: integer, R: list)
% flow model: (i, i, o), (i, i, i)
% for command line: removeElement([1, 2, 3, 4, 5, 6, 7, 8], 3, R).

removeElement([], _, []).
removeElement([H|T], N, [H|T1]):-
    H mod N =\= 0,
    removeElement(T, N, T1).
removeElement([H|T], N, T1):-
    H mod N =:= 0,
    removeElement(T, N, T1).

% -----------------------------------------------------------------------------------------------------

% TESTS AREA

% for command line: testRemoveElement.

testRemoveElement():-
    removeElement([1, 2, 3, 4, 5, 6, 7, 8], 3, [1, 2, 4, 5, 7, 8]),
    removeElement([1, 2, 3, 4], 5, [1, 2, 3, 4]),
    removeElement([1, 2, 3, 4, 5, 6, 7, 8], 2, [1, 3, 5, 7]),
    removeElement([1, 2, 3, 4, 5, 6, 7, 8, 9], 5, [1, 2, 3, 4, 6, 7, 8, 9]),
    \+(removeElement([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, [1, 2, 3, 4, 5, 6, 7, 8, 9])).

% -----------------------------------------------------------------------------------------------------
