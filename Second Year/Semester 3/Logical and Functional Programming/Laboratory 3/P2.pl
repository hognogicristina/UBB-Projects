% -----------------------------------------------------------------------------------------------------

% PROBLEM AREA

/* 
9.
a. For a list of integer number, write a predicate to add in list after 1-st, 3-rd, 7-th, 15-th element a given value e.
b. For a heterogeneous list, formed from integer numbers and list of numbers; add in every sublist after 1-st, 3-rd, 7-th, 15-th element 
the value found before the sublist in the heterogenous list. The list has the particularity that starts with a number and there aren’t 
two consecutive elements lists.

Eg.: [1, [2, 3], 7, [4, 1, 4], 3, 6, [7, 5, 1, 3, 9, 8, 2, 7], 5] =>
[1, [2, 1, 3], 7, [4, 7, 1, 4, 7], 3, 6, [7, 6, 5, 1, 6, 3, 9, 8, 2, 6, 7], 5].
*/

% -----------------------------------------------------------------------------------------------------

% CODE AREA

% a.
% P is initialized with 1
% addElem(L:list, E:elem, P:position, R:list)
% flow model (i, i, i, o), (i, i, i, i)
% for command line: addElem([1, 2, 3, 4, 5, 6], 9, 1, R).

indexOf(V, [H|T], A, I):-
    V = H,
    A = I, 
    !,
    A1 is A + 1,
    indexOf(V, T, A1, I).
indexOf(V1, L, I):-
    indexOf(V1, L, 0, I).

pow2Minus1(1).
pow2Minus1(N):-
    N > 1,
    N1 is N // 2,
    N1 * 2 + 1 =:= N,
    pow2Minus1(N1).

addElem([], _, _, []). 
addElem([H|T], E, P, R):- 
    pow2Minus1(P), 
    !, 
    P1 is P + 1, 
    R = [H, E|TR],
    addElem(T, E, P1, TR). 
addElem([H|T], E, P, R):-
    \+ pow2Minus1(P),
    !,
    P1 is P + 1,
    R = [H|TR],
    addElem(T, E, P1, TR).

% a. 
% Modification for a: For a list of integer number, write a predicate to add in list after 2-nd, 4-th, 8-th, 16-th a given value e.

pow2(2).
pow2(N):-
    N > 2,
    N1 is N // 2,
    N1 * 2 =:= N,
    pow2(N1).

addElemModif([], _, _, []). 
addElemModif([H|T], E, P, R):- 
    pow2(P), 
    !, 
    P1 is P + 1, 
    R = [H, E|TR],
    addElemModif(T, E, P1, TR). 
addElemModif([H|T], E, P, R):-
    \+ pow2(P),
    !,
    P1 is P + 1,
    R = [H|TR],
    addElemModif(T, E, P1, TR).

% b.
% E is initialized with 0 (or can get any value, because it's value is always changing)
% addElemHetero(L:list, E:elem, R:list)
% flow model (i, o, o), (i, i, o), (i, i, i)
% for command line: addElemHetero([1, [2, 3], 7, [4, 1, 4], 5], E, R).

addElemHetero([], _, []).
addElemHetero([H|T], E, R):-
    is_list(H),
    !,
    R = [R1|TR],
    addElem(H, E, 1, R1),
    addElemHetero(T, E, TR).
addElemHetero([H|T], _, R):-
    \+ is_list(H),
    !,
    R = [H|TR],
    addElemHetero(T, H, TR).

% -----------------------------------------------------------------------------------------------------

% TESTS AREA

% a.
% for command line: testAddElem.
testAddElem:- 
    addElem([1, 2], 22, 1, [1, 22, 2]),
    addElem([1, 2, 3], 22, 1, [1, 22, 2, 3, 22]),
    addElem([1, 2, 3, 4, 5], 22, 1, [1, 22, 2, 3, 22, 4, 5]),
    addElem([1, 2, 3, 4, 5, 6], 22, 1, [1, 22, 2, 3, 22, 4, 5, 6]),
    addElem([1, 2, 3, 4, 5, 6, 7], 22, 1, [1, 22, 2, 3, 22, 4, 5, 6, 7, 22]),
    addElem([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 22, 1, [1, 22, 2, 3, 22, 4, 5, 6, 7, 22, 8, 9, 10, 11, 12, 13, 14, 15, 22]),
    \+(addElem([1, 2, 3, 4, 5, 6], 22, 1, [1, 22, 2, 3, 22, 4, 5, 22, 6])),
    \+(addElem([1, 2, 3], 22, 1, [1, 22, 2, 3])).

% a.
% for command line: testAddElemModif.
testAddElemModif:-
    addElemModif([1, 2, 3, 4, 5, 6, 7, 8], 22, 1, [1, 2, 22, 3, 4, 22, 5, 6, 7, 8, 22]).

% b.
% for command line: testAddElemHetero.
testAddElemHetero:-
    addElemHetero([1, [2, 3]], 0, [1, [2, 1, 3]]),
    addElemHetero([1, [2, 3], 7, [4, 1, 4], 5], 0, [1, [2, 1, 3], 7, [4, 7, 1, 4, 7], 5]),
    \+(addElemHetero([1, [2, 3], 7, [4, 1, 4], 5], 0, [1, [2, 1, 3], 7, [4, 0, 1, 4, 0], 5])),
    \+(addElemHetero([1, [2, 3], 7, [4, 1, 4], 5], 0, [1, [2, 1, 3], 7, [4, 1, 4], 5])),
    \+(addElemHetero([1, [2, 3], 7, [4, 1, 4], 5], 0, [1, [2, 1, 3], 7, [4, 7, 1, 4], 5])).

% -----------------------------------------------------------------------------------------------------
