const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController.js');
const validateToken = require('../midleware/validateTokenHandler.js');

router.post("/register", registerUser);

router.post("/login", loginUser);



// validateToken is a middleware function that is used to validate the access token sent by the client. When a request is made to the /current endpoint, the validateToken middleware is executed first, and only if it passes the validation, the currentUser handler function is executed.

// Therefore, the currentUser handler function doesn't need to worry about token validation, as it is taken care of by the validateToken middleware before the request reaches the currentUser handler function.

router.get("/current", validateToken, currentUser);



module.exports = router;