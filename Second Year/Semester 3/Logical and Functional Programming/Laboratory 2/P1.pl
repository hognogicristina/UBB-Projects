% -----------------------------------------------------------------------------------------------------

% PROBLEM AREA

% 7.
% a. Write a predicate to compute the intersection of two sets.
% b. Write a predicate to create a list (m, ..., n) of all integer numbers from the interval [m, n].

% -----------------------------------------------------------------------------------------------------

% LEGEND AREA

/* Legend to help me:
    . means "end of the line" 
    :- means "if"
    ! means that the function stops/cuts (like a break)
    
    % E|_ means "the head of the list"
    % [_|T] means "the tail of the list" (head is not included, only the rest of the list)
    % [H|T] means "the head of the list is H and the tail of the list is T"
    % [H|R] means "the head of the list is H and the rest of the list is R"
*/  

% -----------------------------------------------------------------------------------------------------

% CODE AREA

% a.
% intersection(L1: list, L2: list, R: list)
% flow model (i, i, o), (i, i, i)
% for command line: intersection([1, 2, 3], [2, 3, 4], R).

final(E, [E|_]).
final(E, [_|T]):-
    final(E, T).

intersection([], _, []).
intersection(_,[], []).
intersection([H|T], L2, R):- 
    final(H, L2),
    !,
    R = [H|TR],
    intersection(T, L2, TR). 
intersection([_|T], L2, R):-
    intersection(T, L2, R). 

% b.
% integer(A: int, B: int, R: list)
% flow model (i, i, o), (i, i, i)
% for command line: integer(-3, 5, R).

integer(A, B, [A|R]):-
    A > B,
    A1 is A - 1,
    integer(A1, B, R).
integer(A, B, [A|R]):- 
    A < B,
    A1 is A + 1, 
    integer(A1, B, R).
integer(A, A, [A]). 

% -----------------------------------------------------------------------------------------------------

% TESTS AREA

% a.
% for command line: testIntersection([1,2], [], []). % should return true
testIntersection:-
    intersection([1, 2], [], []), % true
    \+(intersection([1, 2], [1], [])), % false
    intersection([1, 2, 3, 4], [2, 3, 6], [2, 3]), % true
    intersection([], [2, 3, 6], []), % true
    \+(intersection([1, 2, 3, 4], [6], [6])). % false

% b.
% for command line: testInteger(6, 5, []). % should return true
testInteger:-
    integer(1, 3, [1, 2, 3]), % true
    \+(integer(4, 3, [])), % false
    integer(1, 1, [1]), % true
    integer(-1, 2, [-1, 0, 1, 2]), % true
    \+(integer(1, 1, [])), % false
    integer(4, 3, [4, 3]). % true

% -----------------------------------------------------------------------------------------------------

