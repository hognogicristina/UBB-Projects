; -----------------------------------------------------------------------------------------------------

; PROBLEM AREA

; 16. Determine if a tree of type (2) is ballanced (the difference between the depth of two subtrees is equal to 1).

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

; myBallanced returns true if the difference between the depth of two subtrees is equal to 1 or 0 
(defun myBallanced (l)
    (cond ((null l) t)
          ((> (myDiff (myGetDepth (cadr l)) (myGetDepth (caddr l))) 1) nil)
          (t (and (myBallanced (cadr l)) (myBallanced (caddr l))))))

; -----------------------------------------------------------------------------------------------------

; TEST AREA

(defun myTest ()
    (cond ((equal (myBallanced '(A)) t) t)
          ((equal (myBallanced '(A (B (C)) (D))) t) t)
          ((equal (myBallanced '(A (B () (D)) (C (E)))) t) t)
          ((equal (myBallanced '(A (B (C) (E)) (D))) t) t)
          ((equal (myBallanced '(A (B (C)))) nil) t)
          ((equal (myBallanced '(A (B (C)) (D (E () (F () (G)))))) nil) t)
          ((equal (myBallanced '(A (B (C () (G))) (D (E () (F (H)))))) nil) t)
          ((equal (myBallanced '(A (B (C) (G)) (D (E () (F))))) nil) t)))

; -----------------------------------------------------------------------------------------------------