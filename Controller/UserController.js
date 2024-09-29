const User = require('../Models/signup');
const { successResponse, errorResponse, validationErrorResponse } = require('../helper/responseHelper');

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

module.exports = {
    signup,
};
