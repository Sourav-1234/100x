const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    // 1. Check Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header missing',
      });
    }

    // 2. Check Bearer token format
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: 'Token missing or malformed',
      });
    }

    const token = tokenParts[1];

    // 3. Verify JWT token
    const decoded = jwt.verify(token, secret);
    
    // 4. Attach user info to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
      });
    }
    
    return res.status(401).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};

module.exports = authMiddleware;