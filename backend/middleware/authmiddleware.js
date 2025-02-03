const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided, access denied' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      // If the token is expired or invalid, clear the cookie
      if (err.name === 'TokenExpiredError') {
        res.clearCookie('jwt');
        return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
      }
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    req.newAdmin = decoded.id; // Set the decoded admin ID in the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { requireAuth };