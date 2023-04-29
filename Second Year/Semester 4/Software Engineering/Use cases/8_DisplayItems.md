# ID: 8, Name: Display items

## **Primary actor**: Admin, User

## **Secondary actor**: -

## **Description**:

- The process through which the admin or user can see the items in the list
- They are sorted alphabetically and also by starting dates

## Trigger:

- The admin/user needs to see the items in the list, one may need to update one while the other may need add one to their list

## Preconditions:

- The list must exist and it must have at least one valid item
- The items must be retrieved from the database before displaying them

## Postconditions:

- The items are displayed in the list
- The items must be sorted alphabetically and by starting dates

## Normal flow:

- Admin/user selects a destination from the list
- Admin/user clicks on the display display button
- The items are displayed in a sublist\
- Admin/user can add items to their list

## Alternative flow:

- User can modify or remove one from their private list
- Admin can modify or remove one from the public list

## Exception:

- The list is empty, the system will show an error message
- The items are not retrieved from the database, the system will show an error message
- The items are not displayed in the list, the system will show an error message
