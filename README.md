# Northcoders News API

In order to use the test and development databases, please do the following
In the root directory BE-BC-NEWS create two files

.env.test which contains only:
    ```PGDATABASE= ...```

.env.development which contains only
    ```PGDATABASE= ...```

Next download the dependencies by entering into the terminal: 
    ```npm install```

There are several scripts in the package.json

Install husky (node package that stops you committing code that fails tests)
    ```npm run prepare```

Create the PSQL databases using
    ```npm run setup-dbs```

Seed the development database
    ```npm run seed```

Run the tests (test database gets erseed each time) using
    ```npm run test```

Run the development database on nodemon, so that it can be interacted with using PSQL or Insomnia / Postman
    ```npm run dev```

The API is hosted on render at
    https://nc-news-fswv.onrender.com

The api can be interacted by following the URL with endpoints e.g.
    /api

the /api endpoint returns a JSON describing all of the available endpoints and what they return
    /api/articles serves an array of articles


