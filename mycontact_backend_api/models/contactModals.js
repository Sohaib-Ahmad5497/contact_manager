const mongoose = require('mongoose');

// A schema is a JSON object that defines the the structure and contents of your data. 

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User",
        },
        name: {
            type: String,
            require: [true, "Please Add the Contact Name..."]
        },
        email: {
            type: String,
            require: [true, "Please Add the Contact Email..."]
        },
        phone: {
            type: String,
            require: [true, "Please Add the Phone No..."]
        }
    },
    {
        // save the current time of the document created and also when it was updated in form of a Date by turning it true.
        timestamps: true,
    },
);

// mongoose.model is a method that creates a model from a schema, and registers that model with Mongoose. It takes two arguments: the name of the model, and the schema for that model.

module.exports = mongoose.model("Contact", contactSchema);