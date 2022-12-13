; -----------------------------------------------------------------------------------------------------

; PROBLEM AREA

; 9. Write a function that removes all occurrences of an atom from any level of a list.

; -----------------------------------------------------------------------------------------------------

; LEGEND AREA

; mapcan - a function that applies a function to each element of a list and concatenates the results (new list)
; lambda - a function that creates a anonymous function

; -----------------------------------------------------------------------------------------------------

; CODE AREA

(defun myRemoveAtom (atm l)
    (mapcan (lambda (subList)
        (cond ((null subList) nil)
              ((listp subList) (list (myRemoveAtom atm subList)))
              ((equal subList atm) nil)
              (t (list subList)))) l))

(defun myMain (atm l)
    (myRemoveAtom atm l))

; -----------------------------------------------------------------------------------------------------

; TEST AREA

(defun myTest ()
    (and 
        (equal (myMain 'A '(A V (E D A (E A A D)))) '(V (E D (E D))))
        (equal (myMain '9 '(V I 9 (E D 9 (E 5 6 D)))) '(V I (E D (E 5 6 D))))
        (equal (myMain '\? '(A \? (\? D \? (E A \? D)) A \?)) '(A (D (E A D)) A))
        (equal (myMain 'A '(A V (E 9 ! (E A A 6)) A)) '(V (E 9 ! (E 6))))
        (equal (myMain 'D '()) nil)
        (equal (myMain 'A '(V (E 9 ! (E F F 6)) B)) '(V (E 9 ! (E F F 6)) B))))

; -----------------------------------------------------------------------------------------------------