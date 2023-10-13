# Movie Time

this is an assignment to build a React application that allows users to search and view information about movies. The application should have the following
features:

1. A search bar that allows users to search for movies by title.
2. A list of search results that displays the title, release year, and a poster
   image for each movie.
3. The ability to view more detailed information about a movie, including a
   plot summary, list of actors, and IMDb rating.
4. A pagination feature that allows users to view more search results as
   they scroll down the page.
5. Implementing responsive design and accessibility features

## Implementation

- Used React functional components and hooks in implementation the application with three pages:

  - Home Page : this show description for the site
  - Search Results Page: once user search movie , it will be navigated to this page and it show the list of results movies.
  - Detail Page: once user click on movie on search list, it will be navigated to this page and it shows details of the movie

  While reading the assignment, I got the idea to create those three pages the Home page will contain a nice banner and description, and a list of this year's released movies, unfortunately, time was not enough, and also API does not support getting this year's movies :(. Then I added a search route showing the search result component, it will help to search everywhere and navigate that page. Added Detail page to show details and the back search result is shown to go back to the search list without refreshing data.

- Keep all api fetch request seperate location (./src/api/index.js)

  Initially, I didn't add API fetch requests separate folder, because it's just two requests, but while writing the test, I separated them because it is easy to mock. I created .env file to save API base url and API KEY and used them. I added **.env.example** file, it will help to refer env variables that we added to the application. and .env file add to .gitignore to prevent developers commit their own env variables to the system

- Redux is used as state manger to store movie data

  Now Redux Toolkit simplifies the process of writing Redux logic and setting up the store. movieSlice is created to manage movie data in the store. Redux Toolkit provides a createAsyncThunk API to implement the creation and dispatching of these actions, and two actions create using createAsyncThunk to fetch movie data by search query and fetch movie details by id. In this case, listen for the "pending" and "fulfilled" action types dispatched by those thunks and extraReducers to listen for those actions, then updated the state data of movie data, and request loading status ...etc
    Also, add one reducer action to called setQuery, it will be dispatched when trigger key down event on search input with **Enter** key. It helps to reset query and page property.

- [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component) is used to implement loading data while scrolling down
- Used webpack for building aplication

  This is the first time that I build up the project with a native webpack. It was amazing. I used three plugins **html-webpack-plugin** it siplify the creation of HTML files to serve the bundle, **dotenv-webpack** is used to load environment variables from a .env file into process.env, and **copy-webpack-plugin** to copy images from asserts folder to the build. Module rules are configured to compile jsx and scss files using **babel-loader**, **style-loader**, **css-loader**, and **sass-loader**. **webpack-dev-server** is used to run a web server with live reloading. And I added scripts in the package.json file to build and start the application using webpack.

- Used Sass to style the application

  I styled the application using Sass and added few styles. All styles are in './src/styles' folder and all colors addes as variables in variables.scss and it will reduce repetition, do complex math. App.scss will work as global css and created seperate scss file each component. I added few media queries to manage resposive application for mobile and tab views.

## Setup Project

1. Clone the project

   `git clone https://github.com/KTAnj1987/movie-time.git`

2. Go to the project directory

   `cd movie-time`

3. Install all dependencies using npm, In the project directory, you can run:

   `npm install`

4. create copy of .env.example and named it as .env at same level

5. Runs the app in the development mode. In the project directory, you can run:

   `npm run start`

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run Tests

1. jest and react-testing-library are used to write tests, run following command to run test for all application. I addted test cases separatly to test each component and add one test case to test overall functionality.

   `npm run test`

2. Run following command to check the test coverage, and it will summarize the test coverage and it can be shown as html report in **./coverage/Icov-report/index.html** path.

   `npm run coverage`

## Deploy Project

CICD process is integrated with Github Actions and created workflow with two jobs **test** and **deploy**. Once all test passed, it will deployed to github pages. And you can visit web site from [https://ktanj1987.github.io/movie-time/](https://ktanj1987.github.io/movie-time/)

Here I had to change code due to deploy with github pages, because build is deploy to https://ktanj1987.github.io/movie-time/ , application routing is not working propely becasue it identify https://ktanj1987.github.io as based url. Fixed it by using **HashRouter** instead of **BrowserRouter**. Then it will append **#** to homepage url and it is ugly. We must revert that change :) .
