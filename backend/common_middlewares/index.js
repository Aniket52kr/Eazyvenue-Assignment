const jwt = require('jsonwebtoken');

// Middleware: Require user to be signed in
const requireSignIn = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: 'Authorization token missing or invalid format' });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);

        // Attach full user object to req.user
        req.user = decoded;

        next();
    } catch (error) {
        console.error("❌ Authentication error:", error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Session expired. Please log in again.' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token. Please log in again.' });
        }

        return res.status(500).json({ msg: 'Authentication error', error: error.message });
    }
};

// Middleware: Allow only 'client' role
const clientMiddleware = (req, res, next) => {
    if (req.user?.role !== 'client') {
        return res.status(403).json({ msg: 'Access denied: Clients only' });
    }
    next();
};

// Middleware: Allow only 'dealer' role
const dealerMiddleware = (req, res, next) => {
    if (req.user?.role !== 'dealer') {
        return res.status(403).json({ msg: 'Access denied: Dealers only' });
    }
    next();
};

module.exports = {
    requireSignIn,
    clientMiddleware,
    dealerMiddleware
};
