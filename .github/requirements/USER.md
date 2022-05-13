## User features requirements

- ✔ **Create account**
  - [x] It should be possible to create a user account with **name**, **email**, **password** and **driver license**;
  - [x] It must not be possible to create a user account with the **email** of another;
  - [x] It must not be possible to create a user account with the **driver license** of another.
  - [x] Add API documentation;

- ✔ **Authentication**
  - [x] It must be possible to authenticate the user with **email** and **password**;
  - [x] It must not be possible to authenticate a user with the wrong **password**;
  - [x] User authentication must have a **duration** of 15 min.
  - [x] Add API documentation;

- ✔ **Password recovery**
  - [x] Must send a password recovery email to the **email address** provided by the user with a **link** to the password reset page;
  - [x] Email should not be sent if user does not exist;
  - [x] The password recovery link must have a **duration** of 3 hours.
  - [x] Add API documentation;

- 📅 **Profile**
  - [x] It should be possible to get user profile data;
    - [x] Add API documentation;
  - [x] It should be possible to update user **name**;
    - [x] Add API documentation;
  - [x] It should be possible to update user **email**;
    - [x] Add API documentation;
  - [x] It should be possible to update user **password**;
    - [ ] Add API documentation;
  - [x] It should be possible to update user **avatar picture**;
    - [ ] Add API documentation;
  - [ ] It should be possible to remove user **avatar picture**.
    - [ ] Add API documentation;
