// The errorHandler function you provided is an error handling middleware function that will be called whenever an error occurs during the processing of a request. It takes four parameters: err, req, res, and next. When an error is thrown in any middleware or route handler function, Express will automatically call this function with the error object and other request/response objects.
const constants = require('../constants');

const errorHandler = (err, req, res, next) => {

    // The statusCode property of the res object is set by the server framework or library that is being used to handle HTTP requests and responses
    const statusCode = res.statusCode ? res.statusCode : 500;

    // err.message and err.stack are properties of the Error object in JavaScript.
    res.json({ message: err.message, stackTrace: err.stack });
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validatio Failed Error",
                message: err.message,
                stackTrace: err.stackf
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found Error",
                message: err.message,
                stackTrace: err.stackf
            });
            break;
        case constants.UNAUTORIZED:
            res.json({
                title: "Not Uathorized Error",
                message: err.message,
                stackTrace: err.stackf
            });
            break;
        case constants.FOR_BIDDEN:
            res.json({
                title: "Forbidden Error",
                message: err.message,
                stackTrace: err.stackf
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stackf
            });
            break;
        // default:
        // console.log("No Error, All Good!");
        // break;
    }

    // console.log("this is error handler middleware")
}

module.exports = errorHandler;

