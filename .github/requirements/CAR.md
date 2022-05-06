## Car features requirements

- ✔ **Create car**
  - [x] It should be possible to create a car with a **name**, **description**, **brand**, **category**, **license plate**, **maximum speed**, **horse power**, **number of seats**, **type of fuel (eletricity, gas or alcohol)**, **type of transmission (auto or manual)**, **time to get 100kmph**, **daily rate**, **fine amount** and optionaly some **specifications**;
  - [x] It must not be possible to create a car with the **license plate** of another;
  - [x] Add API documentation;
  - [x] Only administrators can create cars.

- 📅 **Car specifications**
  - [ ] It should be possible to add **specifications** to a car;
  - [ ] It must not be possible to add same **specification** to a car;
  - [ ] It should be possible to remove **specifications** from a car;
  - [ ] Add API documentation;
  - [ ] Only administrators can update car specifications.

- 📅 **Car images**
  - [ ] It should be possible to add **images** to a car;
  - [ ] Add API documentation;
  - [ ] Only administrators can update car **images**.

- ✔ **Get car details**
  - [x] It should be possible to get **all data** from a car.
  - [x] Add API documentation;

- ✔ **List all cars**
  - [x] It should be possible to list all cars **with paging**;
  - [x] It should be possible to list all cars sorted by **name**, **number of seats**, **maximum speed**, **horse power** or **creation date**;
  - [x] By default it should list **10** cars sorted by **name** from **A to Z**;
  - [x] It should be possible to filter cars by **brand** and **category**;
  - [x] Add API documentation;
  - [x] Only administrators can view all cars.

- 📅 **List available cars**
  - [ ] It should be possible to list **only cars without rents in progress at the moment**;
  - [ ] It should be possible to list cars **with paging**;
  - [ ] It should be possible to list all cars sorted by **name**, **number of seats**, **maximum speed**, **horse power** or **creation date**;
  - [ ] By default it should list **10** cars sorted by **name** from **A to Z**;
  - [ ] It should be possible to filter cars by **brand** and **category**.
  - [ ] Add API documentation;
  - [ ] Non authenticated users can list the car categories;
