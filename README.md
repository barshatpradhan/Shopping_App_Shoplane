# Shoplane Shopping App

A React-based e-commerce frontend inspired by Shoplane. The app fetches products from [Fake Store API](https://fakestoreapi.com/), supports category browsing, product detail pages, cart and wishlist management, and Firebase Authentication (sign up/login/logout) for protected routes.

## Project Overview

This project is built with:

- **React 18** + **React Router v6** for page navigation.
- **Redux Toolkit** for cart, wishlist, and auth-related state.
- **Formik + Yup** for login/signup form handling and validation.
- **Firebase Authentication** for user signup/login.
- **Axios** for API calls to Fake Store API.
- **Bootstrap 4** + custom CSS for UI styling.

## Current App Features

- Home page with all products.
- Category pages:
  - Electronics
  - Jewellery
  - Men's Clothing
  - Women's Clothing
- Product detail page.
- Cart page with subtotal, shipping estimate, tax estimate, and total.
- Favorites (wishlist) page.
- Authentication pages (Sign Up, Login).
- Route protection for cart, favorites, category, and product detail pages.

## Requirements to Run Locally

- **Node.js 18+** (recommended)
- **npm 9+** (recommended)

## Installation

From the project root:

```bash
npm install --legacy-peer-deps
```

> Why `--legacy-peer-deps`?
> This project depends on `react-custom-scrollbars`, which has older peer dependency constraints that conflict with React 18 under strict npm resolution.

## Run the App

```bash
npm start
```

Then open:

- http://localhost:3000

## Build for Production

```bash
npm run build
```

## Test Command

```bash
npm test
```

## Authentication & Data Sources

- **Firebase Auth** is configured in `src/firebase/firebase.js` using an existing project config in code.
- Product/catalog data is loaded from Fake Store API via `src/api/Constants.js` and `src/api/Endpoints.js`.

## Routes

- `/` - Home
- `/products/category/:categoryName` - Category products (protected)
- `/products/:id` - Product detail (protected)
- `/cartPage` - Cart (protected)
- `/favorites` - Wishlist (protected)
- `/login` - Login
- `/signup` - Signup

## Notes

- Protected pages require a `userToken` in localStorage (set after successful login).
- If dependencies fail to install in your environment due to network/policy restrictions, ensure npm can access `https://registry.npmjs.org/`.
