import countriesModule from require("./countries");
let countryCodes = countriesModule.array;

const express = require("express");
const app = express();
const mariadb = require("mariadb");
const winston = require("winston");
const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

// Creating a logger using winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "uuidError.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "uuidCombined.log" }),
    ],
});

app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

// this part gets the URL and parses the parameters from the query string
app.get("/items", (request, response) => {
    // printing the query object to console just to see if it's correct
    console.log(JSON.stringify(request.query));

    // saving query params in variables
    let uuid = request.query.uuid;
    let countrycode = request.query.countrycode;
    let order = request.query.orderID;

    // checking if query parameters are missing
    if (!uuid || !countrycode || !order) {
        response.sendStatus(400);
        return;
    }

    var validatedCountryCode = false;
    var validatedOrderType = false;

    //validating country codes with external npm module
    const lookup = require("country-code-lookup");

    for (var i = 0; i < lookup.countries.length; i++) {
        if (countrycode == lookup.countries[i].internet) {
            validatedCountryCode = true;
        }
    }

    //validating order type (if between 1-10)
    if (order >= 1 && order <= 10) {
        validatedOrderType = true;
    }

    postUUID(uuid, countrycode, order);

    if (validatedCountryCode && validatedOrderType) {
        response.send(
            "UUID is " +
                uuid +
                " countrycode is " +
                countrycode +
                " order type is " +
                order
        );
    } else {
        response.sendStatus(400);
    }
});

async function postUUID(uuid, countryCode, orderType) {
    try {
        let connection = pool.getConnection();
        await connection.query(
            "INSERT INTO orders (uuid, countryCode, orderType) VALUES (?,?,?)",
            [uuid, countryCode, orderType]
        );
        conn.release();
    } catch (err) {
        console.error(err);
    }
}

// returns a randomUUID
function createRandomUUID() {
    let uuid = crypto.randomUUID();
    //console.log(uuid);
    let cleanUuid = "";

    for (let i = 0; i < uuid.length; i++) {
        if (uuid[i] !== "-") {
            cleanUuid += uuid[i];
        }
    }

    //console.log(cleanUuid);
    let finalUuid = cleanUuid;

    for (let x = 0; x < 8; x++) {
        let randNumb = Math.floor(Math.random() * finalUuid.length);
        finalUuid =
            finalUuid.substring(0, randNumb) +
            finalUuid.substring(randNumb + 1);
    }

    //console.log(finalUuid);
    //console.log(finalUuid.length);
    return finalUuid;
}

// returns a random orderType
function createRandomOrderType() {
    // Since we decided to keep the OrderType as an integer I decided to return a random number between 1 and 10
    return Math.floor(Math.random() * 10) + 1;
}

// returns a random countryCode
function createRandomCountryCode() {
    let randomCountryNumber = Math.floor(Math.random() * countryCodes.length);
    return countryCodes[randomCountryNumber].alpha3Code;
}

// returns a list of random values as [uuid, orderType, countryCode]
function randomOrder() {
    let randomUUID = createRandomUUID();
    let randomOrderType = createRandomOrderType();
    let randomCountryCode = createRandomCountryCode();
    
    return [randomUUID, randomOrderType, randomCountryCode]
}

// endpoint to list all from database
app.get("/all", async (request, response) => {
    try {
        let connection = pool.getConnection();
        await connection.query("SELECT * FROM orders");
        console.log((response) => response.json());
    } catch (err) {
        console.error(err);
    }
});

function randomCountryCode() {}

// saving data using the logger
const PORT = 3001;
app.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
});
