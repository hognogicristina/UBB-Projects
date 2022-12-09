; -----------------------------------------------------------------------------------------------------

; PROBLEM AREA

; 2.
; a) Write a function to return the dot product of two vectors.
; b) Write a function to return the depth of a list. Example: the depth of a linear list is 1. 
; c) Write a function to sort a linear list without keeping the double values.
; d) Write a function to return the intersection of two sets.

; -----------------------------------------------------------------------------------------------------

; LEGEND AREA

; car = first element of a list
; cdr = rest of the list
; t = true
; listp = list predicate (returns t if the argument is a list)
; cons = construct a list from two arguments (first element and rest of the list)
; list = construct a list from a sequence of arguments (first element, second element, third element, ...)
; equal = test if two arguments are equal (returns t if they are equal)
; nil = null value (empty list)

; -----------------------------------------------------------------------------------------------------

; CODE AREA

; a. Write a function to return the dot product of two vectors.
; dot product of two vectors: [1, 3, -5] * [1, 3, -5] = 1*1 + 3*3 + (-5)*(-5) = 35
; for command line: (myDotProduct '(1 3 -5) '(1 3 -5)) => 35

(defun myDotProduct (v1 v2)
    (cond ((null v1) 0)
          ((null v2) 0)
          ((not (equal (length v1) (length v2))) -1)
          (t (+ (* (car v1) (car v2)) (myDotProduct (cdr v1) (cdr v2))))))

; b. Write a function to return the depth of a list. Example: the depth of a linear list is 1. 
; for command line: (myMain '(1 2 3)) => 1 (linear list)
; for command line: (myMain '(1 2 (2 3 4) (1 2 3 (4 5 (69 420)) 1) (23 4 5) (1))) => 4 (nested list)

(defun myMax (a b)
    (cond ((> a b) a)
          (t b)))

; c is the current depth, l is the list
(defun myFindDepth (l c)
    (cond ((null l) c)
          ((listp (car l)) (myMax (myFindDepth (car l) (+ c 1)) (myFindDepth (cdr l) c)))
          (t (myFindDepth (cdr l) c))))

(defun myMain (l)
    (cond (t (myFindDepth l 1))))

; c. Write a function to sort a linear list without keeping the double values.
; for command line: (mySort '(3 6 2 9 3 4 7 5 1 9 2 3 81 35 23)) => (1 2 3 4 5 6 7 9 23 35 81)

(defun myInsert (l e)
    (cond ((null l) (list e))
          ((= (car l) e) l)
          ((< e (car l)) (cons e l))
          (t (cons (car l) (myInsert(cdr l) e)))))

(defun mySort (l)
    (cond ((null l) nil)
          (t (myInsert (mySort (cdr l)) (car l)))))

; d. Write a function to return the intersection of two sets (no duplicates).
; for command line: (myIntersection '(3 7 8 56 9) '(9 2 7 5 6 11)) => (7 9)

(defun myContains (e l)
    (cond ((null l) nil)
          ((equal (car l) e) t)
          (t (myContains e (cdr l)))))

; modification: before intersection, transform lists into sets (without duplicates)
(defun myRemoveDuplicates (l)
    (cond ((null l) nil)
          ((myContains (car l) (cdr l)) (myRemoveDuplicates (cdr l)))
          (t (cons (car l) (myRemoveDuplicates (cdr l))))))

(defun myIntersection (l p)
    (cond ((null l) nil)
          ((null p) nil)
          ((myContains (car l) p) (cons (car l) (myIntersection (cdr l) p)))
          (t (myIntersection (cdr l) p))))

; -----------------------------------------------------------------------------------------------------

; TESTS AREA

; a.
(defun myTestA ()
    (and 
        (equal (myDotProduct '(1 3 -5) '(1 3 -5)) 35) ; true
        (equal (myDotProduct '(1 3 -5) '(1 3)) -1) ; true
        (equal (myDotProduct '(1 3 -5) '()) 0) ; true
        (equal (myDotProduct '(7 8) '(1 3)) 6))) ; false
    

; b.
(defun myTestB ()
    (and 
        (equal (myMain '(1 2 3)) 1) ; true
        (equal (myMain '(1 2 (2 3 4) (1 2 3 (4 5 (69 420)) 1) (23 4 5) (1))) 4) ; true
        (equal (myMain '(1 2 (3) 4)) 1) ; false
        (equal (myMain '(1 2 (3 4 (3)) 2 (9 7 (3 6 (1))) 1)) 3))) ; false

; c.
(defun myTestC ()
    (and 
        (equal (mySort '(3 6 2 9 3 4 7 5 1 9 2 3 81 35 23)) '(1 2 3 4 5 6 7 9 23 35 81)) ; true
        (equal (mySort '(5 6 3 8 9 1 2 7 6 2 7)) '(1 2 3 5 6 7 8 9)) ; true
        (equal (mySort '(5 6 3 8 9 1 2 7 6 2 7)) '(1 2 2 3 5 6 6 7 7 8 9)) ; false
        (equal (mySort '(5 6 3 8 9 1 2 7 6 2 7)) '(5 6 3 8 9 1 2 7 6 2 7)))) ; false

; d.
(defun myTestD ()
    (and 
        (equal (myIntersection '(3 7 8 56 9) '(9 2 7 5 6 11)) '(7 9)) ; true
        (equal (myIntersection '(3 7) '(9 2)) nil) ; true
        (equal (myIntersection '(3 7) '(9 2)) '(3 7)) ; false
        (equal (myIntersection '(3 7) '(0)) '(3 7)) ; false
        ; modification
        (equal (myIntersection '(3 7 8 8 9) '(9 2 7 5 7 11)) '(7 9)); true
        (equal (myIntersection '(3 7 8 7 9) '(2 7 5 7 11)) '(7 7)))) ; false


; test all functions
(defun myTestAll ()
    (and
        (myTestA)
        (myTestB)
        (myTestC)
        (myTestD)))

; -----------------------------------------------------------------------------------------------------

