// Using express-async-handler is especially useful when you have multiple asynchronous functions in your route handler chain, as it helps you avoid having to write try-catch blocks or add error handling middleware to each function. It can also make your code easier to read and maintain by keeping error handling centralized in one place.
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const Contact = require("../models/contactModals.js");
const { options } = require('../router/contactRoutes.js');
// const { User } = require('../router/usersRoutes.js');

//@desc Register The User ---- @route GET /api/users/register ---- @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username, !email, !password) {
        res.status(400);
        throw new Error("All Fields Are Mendatory...!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Registered...!");
    }
    //HAsh Passowrd bcrypt.hash take tow arguments 1st the value and second salt rounds
    // salt round :  actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash.
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    // console.log("-------------user are here -----------------", user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
        // console.log(`User Created Successfully : ${user}`);
    } else {
        res.status(400);
        throw new Error("User Are Not Valid");
    }
});

//@desc Login The User ---- @route GET /api/users/login ---- @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        res.status(400);
        throw new Error("All Fields Are Mendatory...!");
    }
    const user = await User.findOne({ email });
    console.log("user ---- ", user);
    // Compared Password with hashed password ;
    const ACCESS_TOKEN_SECRETE = "sohaib123";

    // bcrypt.compare is used to compare the plaintext password entered by the user during login with the hashed password retrieved from the database for the specified email address.

    if (user && (await bcrypt.compare(password, user.password))) {
        // jwt.sign is a method from the jsonwebtoken library used to create a JSON Web Token (JWT)
        // header is created automatically by the jwt.sign function when it creates a JWT token.
        // jwt.sign take three arguments
        // payload
        // secretOrPrivateKey
        // options
        const accessToken = jwt.sign(
        //payload
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
        // secretOrPrivateKey
            ACCESS_TOKEN_SECRETE,
        // options
            { expiresIn: "1h" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email Or Password Is InValid...");
    }
});

//@desc Currnet User Info ---- @route POST /api/users/current ---- @access private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser };