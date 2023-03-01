const mongoose = require('mongoose');

// A schema is a JSON object that defines the the structure and contents of your data. 

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Add the user Name..."]
        },
        email: {
            type: String,
            required: [true, "Please Add the user Email..."],
            unique: [true, "Email Already Exisit"]
        },
        password: {
            type: String,
            required: [true, "Please Add the User Password"]
        }
    },
    {
        // save the current time of the document created and also when it was updated in form of a Date by turning it true.
        timestamps: true,
    },
);

// mongoose.model is a method that creates a model from a schema, and registers that model with Mongoose. It takes two arguments: the name of the model, and the schema for that model.

module.exports = mongoose.model("user", userSchema);