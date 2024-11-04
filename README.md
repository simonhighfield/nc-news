# About Northcoders News
This repository provides the back-end for the [Discus](https://discus-app.netlify.app/) web-app (formerly known as NC News)  
An API is defined, and an MVC structure is used to interface between API calls and a Postgres SQL database that articles, comments etc.  
There are separate test, development, and production databases.


# Structure

* __tests folder contains tests built with jest to check the functionality of the back-end.  
If developing this project, use a test-driven-development procedure and add tests to integration.test.js

* db folder contains a data folder (raw data in .json format) and a seeds folder (containing seed scripts to create and populate the PSQL database)

* app.js interfaces between the front-end or user (API endpoints calls) and the MVC structure. For example it receives a GET request and returns the data or an error

* MVC folder contains controller.js and models.js that make up the MVC structure. 

* listen.js is responsible for starting the development server when running npm run dev with nodemon. This allows the development database to be interfaced with using tools like Postman or Insomnia, as well as a development front-end, facilitating the testing of persistent storage and application functionality.

# Getting Started
Ensure to install a PSQL environment, such as [PostgresApp](https://postgresapp.com/)

In the root directory BE-BC-NEWS create two files for storing environmental variables.  
***TIP** ensure to save the files, or ensure your IDE has autosave turned on!*

1 .env.test which contains only:  
    
    PGDATABASE=...
<br>

2 .env.development which contains only:
    
    PGDATABASE=...  
<br>

Next download the dependencies by entering into the terminal:  

    npm install
<br>  

There are several scripts in the package.json

Install husky (node package that stops you committing code that fails tests):

    npm run prepare  
<br>


Create the PSQL databases using:  

    npm run setup-dbs
<br>

Seed the development database:

    npm run seed
<br>

Run the tests (test database that reseeds each time) using:

    npm run test
<br>

Run the development database on nodemon, so that it can be interacted with using PSQL or Insomnia / Postman:

    npm run dev
<br>

# Hosting

The front-end is hosted on Netlify: https://discus-app.netlify.app

The front-end repo is on Github: https://github.com/simonhighfield/fe-nc-news

The back-end repo is on Github: https://github.com/simonhighfield/nc-news

The API is hosted on Render: https://nc-news-fswv.onrender.com/api

# Using the API

The following URL uses the endpoint ```/api``` returns in the .json format a description of all the available endpoints and the data they return: https://nc-news-fswv.onrender.com/api

To give an example on how to make an API call, the following code can be run in a JavaScript environment (like a browser console or Node.js) in order to console log the .json mentioned above:

    fetch("https://nc-news-fswv.onrender.com/api")
    .then((response) => response.json())
    .then((json) => console.log(json));


As is described above, the ```/api``` endpoint can be extended to return different data

The following endpoint serves an array of articles
    
    /api/articles 

The following endpoint serves an array of comments

    /api/comments