## Rent features requirements

- ✔ **Rent a car**
  - [x] It should be possible to a user to rent a **car** with **start date** and **end date**;
  - [x] A car cannot be rented for less than 24 hours;
  - [x] A rental can only be scheduled for at least the following day;
  - [x] It should not be possible to rent a **car** that has a rental **in progress** for that date;
  - [x] A user can only rent a car if he does not have a **lease outstanding** rental.
  - [x] If a rental car is returned within 24 hours, the **full daily rate** must be charged;
  - [x] If the rented car is returned after the deadline, a **fine** and **daily rate** must be charged proportional to the days of delay;
  - [x] If a car's **daily rate** and **fine** have been changed during a rental, the amounts **prior to the change** must be charged;
  - [ ] Add API documentation;

- 📅 **Car schedule**
  - [ ] It should be possible to list the car's schedule with all the periods the car will be rented starting from now.
  - [ ] Add API documentation;

- 📅 **User's rentals**
  - [ ] It should be possible to list all car rentals from a user.
  - [ ] Add API documentation;
