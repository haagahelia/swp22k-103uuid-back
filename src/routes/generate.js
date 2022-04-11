import express from "express";
import countriesModule from "../countries.js";
let countryCodes = countriesModule.array;
const router = express.Router();

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

function insertIntoDatabase (uuid, country_code, order_type, address){
    let con = pool.createConnection();
    con.connect(function(err){
        if (err) throw err;
        let sql = "INSERT INTO orders (uuid, country_code, order_type, address) VALUES ?";
        let values = [
            [uuid, country_code, order_type, address]
        ];

        con.query(sql, [values], function (err,result){
        if (err) throw err;

        });
    });
}

router.post("/", (req, res) => {

});

export default router;