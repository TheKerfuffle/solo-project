# Puzzle Please - Charlie Stokes Solo Project
## Fortunate Cohort - June 2021

Puzzle Please is a user driven Nonogram Puzzle hosting platform. It is the culmination of my time in Prime Digital Academy's Full Stack Engineering program.

## Description

I play nonogram puzzles online all the time. I love puzzles. But there are no sites that I have found which allow the user to make and play puzzles made by their friends or of their own. This app fills this need! Anyone who registers an account can create a puzzle, play any of the puzzles created by other users and keep track of their times to complete increasingly challenging puzzles! It also should be noted that any size puzzle is supported with this app. Have fun puzzling!

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Setup Instructions
- Fork and clone this repository
- Run `npm install` in the file's directory on your computer
- create a new database in postico called "prime_app"
- Run all commands in the database.sql file in postico
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
- Replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. 
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
