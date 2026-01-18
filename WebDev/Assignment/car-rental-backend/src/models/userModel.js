const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  // Create new user
  async create(username, password) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const result = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
      );
      
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Username already exists');
      }
      throw error;
    }
  },

  // Find user by username
  async findByUsername(username) {
    const result = await db.query(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );
    
    return result.rows[0];
  },

  // Find user by ID
  async findById(id) {
    const result = await db.query(
      'SELECT id, username FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  },

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Check if username exists
  async usernameExists(username) {
    const result = await db.query(
      'SELECT 1 FROM users WHERE username = $1',
      [username]
    );
    
    return result.rowCount > 0;
  },
};

module.exports = User;