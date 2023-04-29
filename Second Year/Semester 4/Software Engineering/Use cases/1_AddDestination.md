# ID: 1, Name: Add Destination

## **Primary actor**: Admin

## **Secondary actor**: -

## **Description**:

- The add action for the admin, he is the only one able to do this.

## Trigger:

- A new vacation destination has been enrolled and it needs to be added.

## Preconditions:

- At least one destination and one admin is available .

## Postconditions:

- The destination has been added and it is available for the regular user.

## Normal flow:

- The admin enrolls a new destination in the list.
- The item should have an id, stay dates, title, description, image and geolocation.
- The admin adds the destination to the list.

## Alternative flow:

- Nil

## Exception:

- The add cannot be executed due to a database error
- The item misses some of the properties
