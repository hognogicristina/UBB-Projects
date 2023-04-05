# ID: 2, Name: Modify Destination

## **Primary actor**: Admin

## **Secondary actor**: -

## **Description**:

- Admin can modify destinations
- Any field can be modified except the destination ID

## Trigger:

- A destination's data or planning has been updated

## Preconditions:

- The destination must exist in the list and it must be valid
- The destination ID must be valid and not mutable
- The destination must be retrieved from the database before modifying it

## Postconditions:

- The destination is modified in the database
- The destination is modified in the list
- The destination has the updated data in the list that the user can see

## Normal flow:

- Admin selects a destination from the list
- Admin clicks on the modify button
- Admin enters the new data
- Admin clicks on the save button
- The destination is modified in the database
- The destination is modified in the list

## Exception:

- If the destination ID is not valid, the system will show an error message
- If the destination data is not valid, the system will show an error message
- If the admin inputs an invalid destination ID or invalid data, the system will show an error message
