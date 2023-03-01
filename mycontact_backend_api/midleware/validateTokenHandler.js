const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// The req, res, and next parameters are automatically passed to the middleware function by Express when a request is made to the server.
// next is a function that is called to pass control to the next middleware function in the application's request-response cycle.
const validateToken = asyncHandler((req, res, next) => {
    const ACCESS_TOKEN_SECRETE = "sohaib123";
    let token;
    // If the authHeader value is not empty and starts with the string "Bearer", then the token is extracted from the authHeader string by splitting the string into two parts, separated by a space character. The second part contains the token value.
    
    let authHader = req.headers.authorization || req.headers.Authorization;
    if (authHader && authHader.startsWith("Bearer")) {
        token = authHader.split(" ")[1];

        jwt.verify(token, ACCESS_TOKEN_SECRETE, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("user is not authorized");
            }
            req.user = decode.user;
            next();
        });
    }
});

module.exports = validateToken;