import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Not authorized, no token provided" 
    });
  }

  // Remove 'Bearer ' prefix if it exists
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authorized, user not found" 
      });
    }

    req.user = user; // This sets the full user object
    next()
  } catch (error) {
    console.log('Auth error:', error.message);
    res.status(401).json({ 
      success: false, 
      message: "Not authorized, token failed" 
    });
  }
}
