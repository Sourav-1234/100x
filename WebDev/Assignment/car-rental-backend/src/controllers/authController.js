const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwt');
const { validateSignup, validateLogin } = require('../utils/validators');

const authController = {
  // Sign up new user
  async signup(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validate input
      const validationErrors = validateSignup(username, password);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(', '),
        });
      }
      
      // Check if username exists
      const exists = await User.usernameExists(username);
      if (exists) {
        return res.status(409).json({
          success: false,
          error: 'Username already exists',
        });
      }
      
      // Create user
      const user = await User.create(username, password);
      
      return res.status(201).json({
        success: true,
        data: {
          message: 'User created successfully',
          userId: user.id,
        },
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.message === 'Username already exists') {
        return res.status(409).json({
          success: false,
          error: error.message,
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  // Login user
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validate input
      const validationErrors = validateLogin(username, password);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(', '),
        });
      }
      
      // Find user
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User does not exist',
        });
      }
      
      // Verify password
      const isValidPassword = await User.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect password',
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        secret,
        { expiresIn }
      );
      
      return res.status(200).json({
        success: true,
        data: {
          message: 'Login successful',
          token,
        },
      });
      
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },
};

module.exports = authController;