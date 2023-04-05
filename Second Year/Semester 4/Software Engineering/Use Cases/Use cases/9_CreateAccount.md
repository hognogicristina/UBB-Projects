# ID: 9, Name: Create Account

## **Primary actor**: User

## **Secondary actor**: -

## **Description**:

- The user wants to create an account.

## Trigger:

- The user selects the option to create an account.

## Preconditions:

- The user is not currently logged in to an existing account.

## Postconditions:

- A new account is created for the user.

## Normal flow:

- The user navigates to the account creation page.
- The user inputs their email address and creates a password for the account.
- The user confirms the password.
- The user submits the account creation form.
- The system validates the user's information and creates the new account.

## Exception:

- If the email address is already associated with an existing account, the system prompts the user to use a different email address or log in to the existing account.
- If the password and confirmation do not match, the system prompts the user to enter matching passwords.
- If the user inputs invalid information, such as an invalid email address, the system prompts the user to correct the information before submitting the form.