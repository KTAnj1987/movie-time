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

- Redux is used as state manger to store movie data
- [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component) is used to implement loading data while scrolling down
- Used webpack for building aplication
- Used Sass to style the application

## Setup Project

1. Clone the project

   `git clone https://github.com/KTAnj/movie-time.git`

2. Go to the project directory

   `cd movie-time`

3. Install all dependencies using npm, In the project directory, you can run:

   `npm install`

4. create copy of .env.example and named it as .env at same level

5. Runs the app in the development mode. In the project directory, you can run:

   `npm run start`

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run Tests

1. jest and react-testing-library are used to write tests, run following command to run test for all application

   `npm run test`

2. Run following command to check the test coverage, and it will summarize the test coverage and it can be shown as html report in **./coverage/Icov-report/index.html** path.

   `npm run coverage`

## Deploy Project

CICD process is integrated with Github Actions and created workflow with two jobs **test** and **deploy**. Once all test passed, it will deployed to github pages. And you can visit web site from [https://ktanj.github.io/movie-time/](https://ktanj.github.io/movie-time/)
