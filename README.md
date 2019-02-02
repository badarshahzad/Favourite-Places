# Favourite-Places 
Show Case Project :+1: Hire me. If you learn somthing from project don't forget to give :star:. Contribution is most welcome.

[![HitCount](http://hits.dwyl.io/badarshahzad/Favourite-Places.svg)](http://hits.dwyl.io/badarshahzad/Favourite-Places)
![issues](https://img.shields.io/github/issues/badarshahzad/Favourite-Places.svg)
![forks](https://img.shields.io/github/forks/badarshahzad/Favourite-Places.svg)
![stars](https://img.shields.io/github/stars/badarshahzad/Favourite-Places.svg)

![Favourite Places](https://github.com/badarshahzad/Favourite-Places/blob/master/gif/AppView.gif)

## Installation

There is one directory and its name `Places`. In this directory you will find two more ones. One is the `client` in which the user side interface and integration with backend implemented. 

* For Client

`Places $> ls`

`Places $> cd client/`

`client $> cd places/`

`places $> npm intall`

`places $> npm start`

if you are on Linux Ctrl+Shift+T or open new terminal.

* For Server

`places $> cd ..`

`client $> cd ..`

`Places $> cd server/`

`server $> npm run server`

Second is `server` in this directory the backend API, communication with mongoose using [mlab](https://mlab.com/home) [5] and fetching the results from Yelp API.

### Tools
`create-react-app`, `redux-dev-tools-extention`, 

### Editor
`Visual Studio Code`,

### Libraries
* client side

`   "@material-ui/core": "^3.7.1",
    "@material-ui/icons": "^3.0.1",
    "axios": "^0.18.0",
    "classnames": "^2.2.6",
    "jwt-decode": "^2.2.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-js-pagination": "^3.0.2",
    "react-paginate": "^6.0.0",
    "react-places-autocomplete": "^7.2.0",
    "react-redux": "^6.0.0",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.2",
    "redux": "^4.0.1",
    "redux-thunk": "^2.3.0" `
    
* server side

 `  "axios": "^0.18.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "gravatar": "^1.8.0",
    "i": "^0.3.6",
    "jsonwebtoken": "^8.4.0",
    "mongoose": "^5.4.1",
    "npm": "^6.5.0",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "validator": "^10.10.0",
    "yelp-fusion": "^2.2.1"
    "nodemon": "^1.18.9"`

## FavPlaces


### Application should have a dashboard showing some graphs.
The grapsh could be included but in this application we are not going to dicuss about business statistical analysis so I don't this application need any graph. But we can add graphs related to the famous business places and camparions between them.

 * Number of reviews for all Favorite Places.
 
I can easily tackle this feature. I am fetching the reviews from the Yelp API and I just simple have to create a compoenent show the rating.

 * Map of a country or state or province with all the Favorite Places tagged on it.
  
  By using one of the library from them such as the Google Maps library or `react-google-maps` or `react-map-gl`, I can do this task.


### Test driven development to validate your code. (Optional, works as a plus point)

I would like to this one but I'm newbie to ReactJs so may be in future I would easily do this task.

### Travis CI / Circle CI integration. (Optional, works as a plus point)

In 2017, I have integrated Travis with one my open-soruce project [JFX Browser](https://github.com/badarshahzad/JFX-Browser). I don't think it take much time to integrate but I would definately integrate Travis or Circle with my project.

### API documentation (Optional, works as a plus point)

I would also like to write API documentation but due to time constrainte I have to first meet the functional requirements and implementaion.

### You will get brownie points if you can implement some sort of tooling in your project which restarts your
It seems to me an interesting. I can share my vived thoughts, I think I just simply have to have a script which will be integrated with the a server. Whenever the application server down or crash it will restart the app.

### Dockerization of your application and a link of your application image on Docker Hub. (Optional, works as a pluspoint)


### Referances:
* [0] https://www.udemy.com/mern-stack-front-to-back/
* [1] https://www.yelp.com/developers/graphql/query/search
* [2] https://www.yelp.com/developers/graphql/objects/business
* [3] https://www.robinwieruch.de/react-with-graphql-tutorial/	
* [4] https://www.whoishostingthis.com/compare/mongodb/
* [5] https://mlab.com/home
* [6] https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
* [7] https://www.npmjs.com/package/body-parser
* [8] https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
* [9] https://www.robinwieruch.de/react-with-graphql-tutorial/
* [10] https://github.com/themikenicholson/passport-jwt/issues/153	
* [11] https://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import
* [12] https://www.youtube.com/watch?v=7giZGFDGnkc
* [13] https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400 
* [14] https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60
* [15] https://reacttraining.com/react-router/web/api/withRouter

