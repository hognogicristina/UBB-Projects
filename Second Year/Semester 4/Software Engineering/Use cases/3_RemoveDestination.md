# ID: 3, Name: Remove destination

## **Primary actor**: Admin

## **Secondary actor**: -

## **Description**:

- The process through which the admin selects a public destination and removes it from the list

## Trigger:

- The admin wants to remove a destination from the list
- The destination is not valid anymore

## Preconditions:

- The destination must exist in the list and it must be valid
- The destination ID must be valid and not mutable
- The destination must be retrieved from the database before removing it

## Postconditions:

- The destination is removed from the database
- The destination is removed from the list
- The destination is no longer visible in the list
- The user cannot select it anymore

## Normal flow:

- Admin selects a destination from the list
- Admin clicks on the remove button
- Admin confirms the removal
- The destination is removed from the database
- The destination is removed from the list
- The destination is no longer visible in the list

## Exception:

- The destination ID is not valid, the system will show an error message
- The destination data is not valid, the system will show an error message
- The admin inputs an invalid destination ID or invalid data, the system will show an error message
- The destination is not removed from the database, the system will show an error message
