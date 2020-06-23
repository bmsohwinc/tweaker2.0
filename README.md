# DBMS Lab Project - Tweaker
### A mini-mock of the popular social media site [Twitter](https://twitter.com/explore)

## People behind

### Institute: [IIT Bhubaneswar](https://www.iitbbs.ac.in/)
### Course Instructor : [Dr. Padmalochan Bera](https://scholar.google.co.in/citations?user=_PJ8HK0AAAAJ&hl=en)

### The team:
- [Sourabha Bharadwaj BM](https://www.linkedin.com/in/sourabha-bharadwaj-b-m-561716161/)
- [Jammula Sandeep](https://www.linkedin.com/in/sandeep-jammula-78368a158/)
- [Aneri Manoj Gandhi](https://www.linkedin.com/in/aneri-gandhi-75816374/)


## Tools
### Front End
- [HTML, CSS, JavaScript](https://html-css-js.com/)
    - Regular content, styling, interactions, etc.
- [EJS](https://ejs.co/)
    - Embedding Server data dynamically as HTML elements

### Back End
- [Node](https://nodejs.org/en/)
    - For DB interactions, server get, server post, etc
- [Express](https://expressjs.com/)
    - Frameworks for providing abstract APIs to setup GET and POST routes over Node
- [MySQL](https://www.mysql.com/)
    - The RDBMS used for CRUD operations
    - Maintains relations, thus making data-fetch faster

## Features
- Profile
    - Secure Log In
    - Maintains sessions to facilitate easy site access
    - Check number of Tweets, Comments, Followers, Followings
    - Edit or Delete Profile
    - Follow other tweakers by looking at their profiles
- Tweets
    - Post a new tweet
    - See tweets of people being followed
    - Like a Tweet
    - Comment on a Tweet
    - Like the Comment on a Tweet
    - Edit or Delete a Tweet
- Suggestions
    - 2nd order neighbours are suggested for following

## Usage
Here's the basic philosophy:

0. Install Node.JS in your local machine
1. Clone this repository (the top right green button)
2. Open using your fav IDE ([VS Code](https://code.visualstudio.com/) is great!)
3. Install npm packages mentioned in the [package.json](https://github.com/bmsohwinc/tweaker/blob/master/package.json#L19)
4. Setup mysql on your local machine 
5. Create a user with following creds
    - **username** : tweaker
    - **password** : wethree
6. Provide all privileges to the user
7. Once you re-login to the mysql session as this new user, create a database by the name **for_lab**
8. Then in this database run the sql files mentioned in the [src/db/ddl](https://github.com/bmsohwinc/tweaker/tree/tweaker2.0/src/db/ddl) folder. This will create the necessary tables.
9. Now,
    - Your node_modules are installed
    - DB is ready
10. So, open up the VS Code (or any IDE or no IDE also!) terminal in the project dir; `cd` into the `src` folder; then run
    `nodemone index.js`.
11. This will start the tweaker server on your local maching on PORT 3000.
12. Start playing with the site in your fav browser

**N.B. : The user credentials for MySQL, the database name and the PORT - all are for prelim usage. If you use other creds for these, make sure you do the necessary changes in the [src/index.js](https://github.com/bmsohwinc/tweaker/blob/tweaker2.0/src/index.js#L45) file**