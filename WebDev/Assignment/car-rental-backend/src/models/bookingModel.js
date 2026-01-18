const db = require('../config/database');

const Booking = {
  // Create new booking
  async create(userId, carName, days, rentPerDay) {
    const result = await db.query(
      `INSERT INTO bookings (user_id, car_name, days, rent_per_day, status) 
       VALUES ($1, $2, $3, $4, 'booked') 
       RETURNING id, car_name, days, rent_per_day, status, created_at`,
      [userId, carName, days, rentPerDay]
    );
    
    return result.rows[0];
  },

  // Get booking by ID
  async findById(id) {
    const result = await db.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  },

  // Get bookings by user ID
  async findByUserId(userId, bookingId = null) {
    let query = 'SELECT * FROM bookings WHERE user_id = $1';
    const params = [userId];
    
    if (bookingId) {
      query += ' AND id = $2';
      params.push(bookingId);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  },

  // Update booking
  async update(id, updates) {
    const { carName, days, rentPerDay, status } = updates;
    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    if (carName !== undefined) {
      setClauses.push(`car_name = $${paramIndex++}`);
      values.push(carName);
    }
    
    if (days !== undefined) {
      setClauses.push(`days = $${paramIndex++}`);
      values.push(days);
    }
    
    if (rentPerDay !== undefined) {
      setClauses.push(`rent_per_day = $${paramIndex++}`);
      values.push(rentPerDay);
    }
    
    if (status !== undefined) {
      setClauses.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    values.push(id);
    
    const query = `
      UPDATE bookings 
      SET ${setClauses.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING id, car_name, days, rent_per_day, status, created_at
    `;
    
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Delete booking
  async delete(id) {
    const result = await db.query(
      'DELETE FROM bookings WHERE id = $1 RETURNING id',
      [id]
    );
    
    return result.rowCount > 0;
  },

  // Get booking summary for user
  async getSummary(userId) {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_bookings,
        COALESCE(SUM(days * rent_per_day), 0) as total_amount_spent
       FROM bookings 
       WHERE user_id = $1 
       AND status IN ('booked', 'completed')`,
      [userId]
    );
    
    return result.rows[0];
  },

  // Check if booking belongs to user
  async belongsToUser(bookingId, userId) {
    const result = await db.query(
      'SELECT 1 FROM bookings WHERE id = $1 AND user_id = $2',
      [bookingId, userId]
    );
    
    return result.rowCount > 0;
  },
};

module.exports = Booking;