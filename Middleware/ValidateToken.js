const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helper/responseHelper');

const JWT_SECRET =process.env.secretKey ||'your_key'; 

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is provided
    if (!token) {
        return errorResponse(res, 'No token, authorization denied');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded;
        next(); 
    } catch (error) {
        return errorResponse(res, 'Token is not valid');
    }
};

module.exports = jwtAuthMiddleware;
