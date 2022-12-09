; -----------------------------------------------------------------------------------------------------

; PROBLEM AREA

; 16. Determine if a tree of type (2) is balanced (the difference between the depth of two subtrees is equal to 1 or 0).

; -----------------------------------------------------------------------------------------------------

; LEGEND AREA

; (2) - a tree is represented as a list of lists, where the first element is the root and the other elements are subtrees
; cadr - returns the second element of a list, which is the left subtree
; caddr - returns the third element of a list, which is the right subtree

; -----------------------------------------------------------------------------------------------------

; CODE AREA

; myMax returns the maximum of two numbers 
(defun myMax (a b) 
    (cond ((> a b) a)
          (t b)))

; myDiff returns the difference between two numbers (absolute value)
(defun myDiff (a b)
    (cond ((> a b) (- a b))
          (t (- b a))))

; myGetDepth returns the depth of a tree (number of nodes)
(defun myGetDepth (l)
    (cond ((null l) 0)
          (t (+ 1 (myMax (myGetDepth (cadr l)) (myGetDepth (caddr l)))))))

; myBalanced returns true if the difference between the depth of two subtrees is equal to 1 or 0
(defun myBalanced (l)
    (cond ((null l) t)
          ((> (myDiff (myGetDepth (cadr l)) (myGetDepth (caddr l))) 1) nil)
          (t (and (myBalanced (cadr l)) (myBalanced (caddr l))))))

; -----------------------------------------------------------------------------------------------------

; TEST AREA

(defun myTest ()
    (and 
        (equal (myBalanced '(A)) t)
        (equal (myBalanced '(A (B (C)) (D))) t)
        (equal (myBalanced '(A (B () (D)) (C (E)))) t)
        (equal (myBalanced '(A (B (C) (E)) (D))) t)
        (equal (myBalanced '(A (B (C)))) nil)
        (equal (myBalanced '(A (B (C)) (D (E () (F () (G)))))) nil)
        (equal (myBalanced '(A (B (C () (G))) (D (E () (F (H)))))) nil)
        (equal (myBalanced '(A (B (C) (G)) (D (E () (F))))) nil)))

; -----------------------------------------------------------------------------------------------------