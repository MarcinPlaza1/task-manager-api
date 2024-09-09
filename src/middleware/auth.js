import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        // Retrieve token from Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verification of the token with the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');

        // Searching for a user in the database based on _id and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        // If the user is not found, return error
        if (!user) {
            throw new Error('Unauthorised user');
        }

        // Assign token and user to the request object so that they can be used in other middleware
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Token expired, log in again' });
        } else {
            return res.status(401).send({ error: 'Unauthorised' });
        }
    }
};

export default auth;

