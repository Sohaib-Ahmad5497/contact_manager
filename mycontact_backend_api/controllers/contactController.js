// Using express-async-handler is especially useful when you have multiple asynchronous functions in your route handler chain, as it helps you avoid having to write try-catch blocks or add error handling middleware to each function. It can also make your code easier to read and maintain by keeping error handling centralized in one place.

const asyncHandler = require('express-async-handler');

const Contact = require("../models/contactModals.js")

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });   
    res.status(200).json(contact);
});

//@desc Create new contact "POST"
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        // err.message and err.stack are properties of the Error object in JavaScript.
        throw new Error("All Fields To Fill Is Mendatory")
    }
    const contact = await Contact.create({
        // if we have same name of keys and values then in ES6 we can give only keys instead of giving the values with thata
        name,
        phone,
        email,
        user_id : req.user.id 
    });

    res.status(200).json(contact);
    console.log("this is request  from : ", req.body)
});

//@desc Get a contact "GET"

const getContactFor = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "not found" });
        throw new Error("Contact Not Find");
    }
    res.status(200).json(contact);
});

//@desc Update a contact "PUT"

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "not found" });
        throw new Error("Contact Not Find");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Don't Have Permission To Update the Other User Contacts...");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact)
});

//@desc Delete a contact "DELETE"
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "not found" });
        throw new Error("Contact Not Find");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Don't Have Permission To delete the Other User Contacts...");
    }
    await Contact.remove(contact);
    res.status(200).json({ message: `Delete Contact For ${req.params.id}` })
});

module.exports = { getContact, createContact, getContactFor, updateContact, deleteContact };