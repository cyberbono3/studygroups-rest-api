#Software Requirements
In order to run this, the following are requirements:
1. NodeJS
2. Postgres
3. Redis

Node.js can be installed from the nodejs website. The other two should be installed via package manager.

#Database Setup
Run the postgres server via command line. Then, open up the postgres console (command line), and run `CREATE DATABASE "studygroup-express"`. 

Edit the file at `models/index.js`. Find the following:
```
    myPostgres: {
      adapter: 'postgresql',
      host: 'localhost',
      user: 'ganeshdatta',
      database: 'studygroup-express'
    }
```
Change the user field to the user of your postgres database (most likely root).

#Express setup
It is recommended to install nodemon to live update changes to the files. To do so, run `npm install -g nodemon`. Otherwise, continue to the next step.

`cd` to this directory and run `npm install`.

#Running the app
Make sure you are in this directory. If using nodemon, run `nodemon bin/www`. Otherwise, `node bin/www`.