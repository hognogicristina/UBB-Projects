# **Software Engineering Project**

## **Destination Bucket List** - This is an app that allows people to create a personal private vacation destinations bucket list.

## **_Requirements_**

<!-- TODO - Requirement 1 -->

**_1._** **A vacation destination is a place with a geolocation, title, image, description, stay dates.**

<!-- TODO - Requirement 2 -->

**_2._** **There is a public list of destinations managed by an admin.** _(Use case: Create Destination List)_

- **_2.1._** Add a vacation destination to the public list . _(Sub use case: Add Destination To List)_
- **_2.2._** Remove a vacation destination from the public list. _(Sub use case: Remove Destination From List)_
- **_2.3._** Modify a vacation destination from the public list. _(Sub use case: Modify Destination From List)_

<!-- TODO - Requirement 3 -->

**_3._** **Bucket list is private, each user should be able to register and add public items or create new ones private.**

<!-- TODO - Requirement 4 -->

**_4._** **User should be able to manage items, including removal.** _(Use case: Create Bucket List)_

- **_4.1._** Add a public vacation destination to the bucket list. _(Sub usecase: Add Destination To Bucket List)_
- **_4.2._** Add a private vacation destination to the bucket list. _(Sub use case: Add Private Destination To Bucket List)_
- **_4.3._** Remove a vacation destination from the bucket list. _(Sub use case: Remove Destination From Bucket List)_
- **_4.4._** Modify a vacation destination from the bucket list. _(Sub use case: Modify Destination From Bucket List)_

<!-- TODO - Requirement 6 -->

**_6._** **Propose friendly display of items and ways to manage them.** _(Use case: Display Items)_

- **_6.1._** Display items in a list, sorted alphabetically.

<!-- TODO - Requirement 7 -->

**_7._** **Users can cancel their account (GDPR) or modify it.** _(Use case: Manage Account)_

- **_7.1._** Create account. _(Sub use case: Create Account)_
- **_7.2_** Modify account information. _(Sub use case: Modify Account)_
- **_7.3_** Delete account. _(Sub use case: Delete Account)_

| **_Use case_**                 | **_Actors_** |
| ------------------------------ | ------------ |
| Add Destination                | Admin        |
| Modify Destination             | Admin        |
| Remove Destination             | Admin        |
| Add Public Destination         | User         |
| Add Private Destination        | User         |
| Modifiy User Destination       | User         |
| Remove User Destination        | User         |
| Display items                  | User, Admin  |
| Create Account                 | User         |
| Modify Account                 | User         |
| Remove Account (Automatically) | User         |

<!-- TODO - add private destination to public list wihtout stay dates AltFLow -->
