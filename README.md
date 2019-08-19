## The problem

The task requires to create a simple one-page application that interacts with the PunkAPI. This page should allow you to:

- Display a random beer section, with a button/link to display random beers and random non-alcoholic beers.
- Display a small search form where users can search for beers by name (using a free text search) or 'brewed-before' date.
- Show search result from the PunkAPI.

## The solution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

There are several reasons to use React Hooks:

- Separate (and isolated) concerns.
- Avoid juggling between HOCs, render props, children as functions, and classes.
- Avoid duplicated logic between lifecycle methods and components.

For test, I use `react-hooks-testing-library` that allows to create a simple test harness for React hooks.

## Installation

Clone the repository

```sh
git clone https://github.com/manueldelpozo/beer-search-app.git
cd beer-search-app
```
Install the project

```sh
yarn
```
Easy!

## Lets run it

After installation, you can run:

### `npm start`
or
### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
or
### `yarn test`

Launches the test runner in the interactive watch mode.<br>