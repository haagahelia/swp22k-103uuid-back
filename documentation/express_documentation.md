# Express documentation

## Setup

To get an **Express** app working, we need Node.js and npm package manager.

To check the version of Node and npm on your machine use

- `node -v`
- `npm -v`

If you don't have Node installed on your machine yet, download it [here](https://nodejs.org/en/download/).

Install Express.js with the command

- `npm install express`

First create simple Express app following the Hello World tutorial [here](https://expressjs.com/en/starter/hello-world.html).

Run the app with the command

- `node index.js`

### Nodemon

Recommended to use Nodemon so the server restarts automatically on every save.

Nodemon installation and usage can be found [here](https://www.npmjs.com/package/nodemon).

## Basic Express server setup

```const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

```

Now you can run the server with the commend:

- `node index.js`

When you go to localhost:3001 you should see the message 'Hello World!'. Now your Express app is ready to be tweaked for your purposes.

## Our use case

In this particular case we need the Express app to listen to a custom URL that has some parameters, and be able to parse the parameters from the query string.

For that we are using the query property of the request object. The `request.query` returns a JSON objet with all the parameters from the query string, which then can be saved in variables if needed.

```
    let uuid = request.query.uuid;
    let countrycode = request.query.countrycode;
    let order = request.query.orderID;
```
