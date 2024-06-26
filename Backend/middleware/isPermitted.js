// Importing required modules and files
const { next } = require('locutus/php/array'); 
const USERS = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const config = require('../config/config'); 
const secret = require('../config/secret'); 

// Middleware function to check if user has permission
const isPermitted = (permission) => {
    return (req, res, next) => {
        const { authorization } = req.headers; // Extracting authorization header from request

        // If no authorization header found, send 401 Unauthorized
        if (!authorization) {
            console.log('No authorization Found');
            return res.status(401).send({
                error: 'You must be logged in.'
            });
        }

        const token = authorization.replace('Bearer', ''); // Extracting token from authorization header

        // If token is missing, send 401 Unauthorized
        if (!token) {
            return res.status(401).send({
                error: 'You must be logged in.'
            });
        }

        // Verifying JWT token
        jwt.verify(token, secret.secret, async (err, payload) => {
            // If user has required permission, proceed to next middleware
            if (permission.includes(payload.user_role)) {
                next();
            } else if (err) { // If token verification fails, send 401 Unauthorized
                console.log('Not Allowed');
                return res.status(401).send({ error: 'You must be logged in.' });
            } else { // If user doesn't have required permission, send 401 Unauthorized
                console.log('Not Allowed');
                return res.status(401).send({ error: 'You must be logged in.' });
            }
        });
    };
};

module.exports = isPermitted; // Exporting the middleware function
