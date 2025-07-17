const jwt = require('jsonwebtoken');

// Middleware to check if the user is signed in
const requireSignIn = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ msg: 'Authorization required' });
        }

        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.jwt_secret); // throws if expired or invalid
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Session expired. Please log in again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token. Please log in again.' });
        } else {
            return res.status(500).json({ msg: 'Something went wrong in authentication' });
        }
    }
};

// Middleware to check if user is a client
const clientMiddleware = (req, res, next) => {
    if (req.user?.role !== 'client') {
        return res.status(403).json({ msg: 'Client access denied' });
    }
    next();
};

// Middleware to check if user is a dealer
const dealerMiddleware = (req, res, next) => {
    if (req.user?.role !== 'dealer') {
        return res.status(403).json({ msg: 'Dealer access denied' });
    }
    next();
};

module.exports = {
    requireSignIn,
    clientMiddleware,
    dealerMiddleware
};
