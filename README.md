# Open E-commerce Store - FS16_6_FrontEnd Project 2023

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)
![Material UI](https://img.shields.io/badge/Material_UI-v.5-2196f3)

## Introduction

The purpose of this repository is to demonstrate a solution that serves as an e-commerce store from the [Platzi Fake Store API](https://fakeapi.platzi.com/), using React, Redux Toolkit, RTK Query, TypeScript, and Material UI.

## Table of contents

- [Requirements](#requirement)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Author](#author)
- [Project structure](#project-structure)

## Requirement

1. Visit the Repo of Node.Js server: [BE_SERVER](https://github.com/JuliaThTranNguyen/team-5-backend)
2. Visit the Inventory / Admin App: [Inventory_App](https://github.com/JuliaThTranNguyen/fs16-front-end-FS)
3. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
4. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
5. When adding routers to your application, programmatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
6. Implement unit testing for the reducers (-)
7. Deploy the application and rewrite README file.

### Bonus

1. Use context API to switch theme.
2. Use pagination when fetching/displaying all the products (✔️).
3. Implement performance optimization where applicable.
4. Carousel effect to display product images (✔️).

## Technologies

- React
- TypeScript
- Material UI
- Redux Toolkit
  - RTK Query

## Getting started

1. Clone the repository to your local machine: `git clone git@github.com:JuliaThTranNguyen/fs16_6-frontend-project.git`.
2. Get into the directory: `cd fs16_6-frontend-project`.
3. Run `npm install` in terminal to install all the libraries, packages, and dependencies.
4. Run `npm start` to run the application.
5. Run `npm test` to run all the test cases & review the solution on the console panel.

## Begin this project from scratch on your own.
[Visit the setup.md](./setup.md)

## Application & State management:
Please visit [Redux-store.md](./Redux-store.md) for details explanation.

## Project structure

### Installed packages:
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/b3a2d10d-3a24-49b5-905a-42fedeb04969)

### Tree map - src/ :
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/a125eb14-6aaf-49f4-b351-7ea2550d56f1)

## Proof of complement:
### UI Design:
#### HomePage: 
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/b3e3538e-bbf8-4d49-b6f8-5a54645f07cf)

#### All Products Page:
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/43e37bba-f64d-47dd-a8db-115c993eb8f2)

#### A single product page:
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/8eaf92d9-f501-4cbd-9f75-5827df12f7be)

#### User Profile page -after user authentication: 
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/748984e9-3441-4045-822a-762ceb446642)

#### Contact Section:
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/811489fd-8ca4-4364-bfd2-64ccf542e6e2)

#### Cart Section:
![image](https://github.com/JuliaThTranNguyen/fs16_6-frontend-project/assets/49017322/e623abcf-551c-43fb-80ef-98391b41a41b)

## DEMO VERSION: 
[Visit at](https://fs16-6-frontend-project-gamma.vercel.app/)

## Author
[Visit at](https://github.com/JuliaThTranNguyen)

- Thuy Hien Tran Nguyen - Th.Julia 
