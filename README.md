# Puzzle Please - Charlie Stokes Solo Project
## Fortunate Cohort - June 2021

Puzzle Please is a user driven Nonogram Puzzle hosting platform. It is the culmination of my time in Prime Digital Academy's Full Stack Engineering program.

## Description

I play nonogram puzzles online all the time. I love puzzles. But there are no sites that I have found which allow the user to make and play puzzles made by their friends or of their own. This app fills this need! Anyone who registers an account can create a puzzle, play any of the puzzles created by other users and keep track of their times to complete increasingly challenging puzzles! It also should be noted that any size puzzle is supported with this app. Have fun puzzling!

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Setup Instructions

First, please note that the project is deployed to heroku so you can play [here](https://puzzle-please.herokuapp.com/#/home) without having to set up the code on your computer. If you would like to see the code then the instructions below will allow you to spin up a local environment for this project and see (with the redux logger in the console) all of the processes going on in the background as you navigate between and play/add puzzles.

And if you are still reading. Thank you so much for your attention and consideration! I see you!

- Fork and clone this repository
- Run `npm install` in the terminal in the file's directory on your computer
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
