const User = require('../Models/SignUp');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const { successResponse, errorResponse, validationErrorResponse } = require('../Helper/Message');

const signup = async (req, res) => {
    const { name, mpin, phone, username } = req.body;
    if (!name || !mpin || !phone || !username) {
        return validationErrorResponse(res, { name: 'Name is required', mpin: 'MPIN is required', phone: 'Phone is required', username: 'Username is required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return validationErrorResponse(res, { username: 'Username already exists' });
        }
        const newUser = new User({
            name,
            mpin,
            phone,
            username,
        });
        await newUser.save();
        return successResponse(res, newUser, "User created successfully");
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Error creating user");
    }
};
//login 
const JWT_SECRET =process.env.secretKey

const login = async (req, res) => {
    const { phone, mpin } = req.body;
    if (!phone || !mpin) {
        return validationErrorResponse(res, {
            phone: 'Phone number is required',
            mpin: 'MPIN is required'
        });
    }
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return validationErrorResponse(res, { phone: 'Phone number not found' });
        }
        if (user.mpin !== mpin) {
            return validationErrorResponse(res, { mpin: 'Invalid MPIN' });
        }
        const token = jwt.sign(
            { userId: user._id, phone: user.phone }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        const { mpin:_, ...userData } = user.toObject();
        return successResponse(res, { userData, token }, "Login successful");
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Error logging in");
    }
};
module.exports = {
    signup,login
};
