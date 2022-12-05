% Hognogi Ana-Maria Cristina, Gr. 923
% https://www.brainzilla.com/logic/zebra/origami-animals/
% Origami Animals Zebra Puzzle

% Five boys are side by side doing some origamis. Each boy has already made an animal. 
% Try to find out which animal each one made and which paper they used.

% 1. The White paper was used to make the Cat.
% 2. The boy who likes Cheese sandwich is somewhere between the 9-year-old boy and the boy who made the Frog, in that order.
% 3. Frank is exactly to the left of the boy that likes Pineapple juice.
% 4. The boy who made the Cat is somewhere to the right of the boy who used the Blue paper.
% 5. The youngest boy is next to the boy that loves Chicken sandwich.
% 6. At the fifth position is the boy who likes Strawberry juice.
% 7. The boy who likes Cheese sandwich is next to the 11-year-old boy.
% 8. Phillip is exactly to the right of the boy that loves Tuna sandwich.
% 9. The boy who made the Elephant is somewhere to the left of the boy that used the Blue paper.
% 10. The White paper was used by the boy that is somewhere to the left of the boy who made the Dog.
% 11. The boy who likes Pineapple juice is somewhere between the 9-year-old boy and the boy that likes Lemon juice, in that order.
% 12. Jeffrey is somewhere to the right of the boy who made his origami using the Green paper.
% 13. The boy that used the White paper is somewhere to the left of the boy who likes Pepperoni sandwich.
% 14. Albert is immediately before the boy that used the White paper.
% 15. The boy that loves Bacon sandwich is next to the boy who used the Green paper.
% 16. The boy that made the Bird is next to the boy that likes Lemon juice.
% 17. The boy who likes Lemon juice is somewhere between the boy who made the Elephant and the boy that loves Apple juice, in that order.
% 18. In the middle is the boy that likes Bacon sandwich.
% 19. The 8-year-old boy is next to the boy that used the Red paper.
% 20. The boy who likes Bacon sandwich is exactly to the left of the boy who used the White paper.
% 21. The 10-year-old boy is at the fifth position.

:- use_rendering(table, [header(animal('Paper', 'Name', 'Origami', 'Age', 'Sandwich', 'Juice'))]).

nextToLeft(A, B, Ls) :- append(_, [A,B|_], Ls). 

nextTo(A,B, Ls):-append(_,[B,A|_], Ls).
nextTo(A,B, Ls):-append(_,[A,B|_], Ls).

atAnyEnd(A, Ls):- Ls=[A|_].
atAnyEnd(A, Ls):- Ls=[_,_,_,_,A].
    
somewhereLeft(A,B, Ls):- append(_, [A, B|_], Ls).
somewhereLeft(A,B, Ls):- append(_, [A,_, B|_], Ls).
somewhereLeft(A,B, Ls):- append(_, [A,_,_, B|_], Ls).
somewhereLeft(A,B, Ls):- append(_, [A,_,_,_, B|_], Ls).

somewhereBetween(A, B, C, Ls):- somewhereLeft(A, B, Ls), somewhereLeft(B,C, Ls).

animals(Animals):-
    % each animal in the group is represented as:
	% animal('Paper', 'Name', 'Origami', 'Age', 'Sandwich', 'Juice')

    length(Animals, 5),

    % 1. The White paper was used to make the Cat.
    member(animal(white, _, cat, _, _, _), Animals),

    % 2. The boy who likes Cheese sandwich is somewhere between the 9-year-old boy and the boy who made the Frog, in that order.
    somewhereBetween(animal(_, _, _, 9, _, _), animal(_, _, _, _, cheese, _), animal(_, _, frog, _, _, _), Animals),

    % 3. Frank is exactly to the left of the boy that likes Pineapple juice.
    nextToLeft(animal(_, frank, _, _, _, _), animal(_, _, _, _, _, pineapple), Animals),

    % 4. The boy who made the Cat is somewhere to the right of the boy who used the Blue paper.
    somewhereLeft(animal(blue, _, _, _, _, _), animal(_, _, cat, _, _, _), Animals),

    % 5. The youngest boy is next to the boy that loves Chicken sandwich.
    nextTo(animal(_, _, _, 8, _, _), animal(_, _, _, _, chicken, _), Animals),

    % 6. At the fifth position is the boy who likes Strawberry juice.
    Animals = [_,_,_,_,animal(_, _, _, _, _, strawberry)],

    % 7. The boy who likes Cheese sandwich is next to the 11-year-old boy.
    nextTo(animal(_, _, _, 11, _, _), animal(_, _, _, _, cheese, _), Animals), 

    % 8. Phillip is exactly to the right of the boy that loves Tuna sandwich.
    nextToLeft(animal(_, _, _, _, tuna, _), animal(_, phillip, _, _, _, _), Animals),

    % 9. The boy who made the Elephant is somewhere to the left of the boy that used the Blue paper.
    somewhereLeft(animal(_, _, elephant, _, _, _), animal(blue, _, _, _, _, _), Animals),

    % 10. The White paper was used by the boy that is somewhere to the left of the boy who made the Dog.
    somewhereLeft(animal(white, _, _, _, _, _), animal(_, _, dog, _, _, _), Animals),

    % 11. The boy who likes Pineapple juice is somewhere between the 9-year-old boy and the boy that likes Lemon juice, in that order.
    somewhereBetween(animal(_, _, _, 9, _, _), animal(_, _, _, _, _, pineapple), animal(_, _, _, _, _, lemon), Animals),

    % 12. Jeffrey is somewhere to the right of the boy who made his origami using the Green paper.
    somewhereLeft(animal(green, _, _, _, _, _), animal(_, jeffrey, _, _, _, _), Animals), 

    % 13. The boy that used the White paper is somewhere to the left of the boy who likes Pepperoni sandwich.
    somewhereLeft(animal(white, _, _, _, _, _), animal(_, _, _, _, pepperoni, _), Animals),

    % 14. Albert is immediately before the boy that used the White paper.
    nextToLeft(animal(_, albert, _, _, _, _), animal(white, _, _, _, _, _), Animals),

    % 15. The boy that loves Bacon sandwich is next to the boy who used the Green paper.
    nextTo(animal(_, _, _, _, bacon, _), animal(green, _, _, _, _, _), Animals),
    
    % 16. The boy that made the Bird is next to the boy that likes Lemon juice.
    nextTo(animal(_, _, bird, _, _, _), animal(_, _, _, _, _, lemon), Animals),

    % 17. The boy who likes Lemon juice is somewhere between the boy who made the Elephant and the boy that loves Apple juice, in that order.
    somewhereBetween(animal(_, _, elephant, _, _, _), animal(_, _, _, _, _, lemon), animal(_, _, _, _, _, apple), Animals),

    % 18. In the middle is the boy that likes Bacon sandwich.
    Animals = [_,_,animal(_, _, _, _, bacon, _),_,_],

    % 19. The 8-year-old boy is next to the boy that used the Red paper.
    nextTo(animal(_, _, _, 8, _, _), animal(red, _, _, _, _, _), Animals),

    % 20. The boy who likes Bacon sandwich is exactly to the left of the boy who used the White paper.
    nextToLeft(animal(_, _, _, _, bacon, _), animal(white, _, _, _, _, _), Animals),

    % 21. The 10-year-old boy is at the fifth position.
    Animals = [_,_,_,_,animal(_, _, _, 10, _, _)],

    % one has the name Roy
    member(animal(_, roy, _, _, _, _), Animals),

    % one has color Black
    member(animal(black, _, _, _, _, _), Animals),

    % one is 12 years old
    member(animal(_, _, _, 12, _, _), Animals),

    % one likes Orange juice
    member(animal(_, _, _, _, _, orange), Animals).

/* Examples:
Animals = [animal(red, frank, elephant, 9, chicken, orange), 
           animal(green, roy, bird, 8, cheese, pineapple), 
           animal(blue, albert, frog, 11, bacon, lemon), 
           animal(white, jeffrey, cat, 12, tuna, apple), 
           animal(black, philip, dog, 10, pepperoni, strawberry)]
*/