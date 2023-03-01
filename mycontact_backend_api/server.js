const express = require('express');
const app = express();
require('dotenv').config;
const port = process.env.PORT || 5000;

const contactRoutes = require('./router/contactRoutes.js');
const errorHandler = require('./midleware/errorHandler.js');
const connectDb = require('./config/dbConnection.js');
const usersRoutes = require('./router/usersRoutes.js');

connectDb();

// app.use(express.json()):
// The app.use(express.json()) function is used in an Express.js application to enable parsing of JSON data in the incoming HTTP request body.

app.use(express.json())

app.use('/api/contacts', contactRoutes);
app.use('/api/users', usersRoutes);

// Check if there are any other middleware functions that are intercepting the error: If another middleware function is handling the error before it reaches your custom error handling middleware, then your error handling middleware won't execute. Make sure that your error handling middleware is registered after all other middleware functions in your application.

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


