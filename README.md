# A minimalist typing practice app

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A React application that allows you to practice typing in a distraction-free and minimalist environment.

- [Running the application](#running-the-application)
- [Running the application locally](#running-the-application-locally)
- [Deploying the application](#deploying-the-application)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
- [Built with](#built-with)

## Running the application

Simply browse to <https://marktheskies.github.io/minimalist-typer/> and start typing. Mobile browsers are not currently supported.

## Running the application locally

Clone this repository, install dependencies and then run start the development server.

```bash
git clone https://github.com/marktheskies/minimalist-typer.git
cd minimalist-typer
npm install
npm start
```

## Deploying the application

The application is hosted on GitHub pages. [A GitHub Action](https://github.com/marktheskies/minimalist-typer/blob/main/.github/workflows/deploy-prod.yml) is configured to detect a push to the main branch, which triggers deployment.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Built with

- [Quotable API](https://github.com/lukePeavey/quotable).
- [create-react-app](https://github.com/facebook/create-react-app)
