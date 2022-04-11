import express from "express";
const router = express.Router();

// this part gets the URL and parses the parameters from the query string
router.get("/", (request, response) => {
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

export default router;