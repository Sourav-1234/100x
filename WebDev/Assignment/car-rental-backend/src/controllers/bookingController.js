const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const { validateBooking, validateStatus } = require('../utils/validators');

const bookingController = {
  // Create new booking
  async createBooking(req, res) {
    try {
      const { carName, days, rentPerDay } = req.body;
      const userId = req.user.userId;
      
      // Validate input
      const validationErrors = validateBooking(carName, days, rentPerDay);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(', '),
        });
      }
      
      // Create booking
      const booking = await Booking.create(userId, carName, days, rentPerDay);
      
      // Calculate total cost
      const totalCost = days * rentPerDay;
      
      return res.status(201).json({
        success: true,
        data: {
          message: 'Booking created successfully',
          bookingId: booking.id,
          totalCost,
        },
      });
      
    } catch (error) {
      console.error('Create booking error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  // Get bookings
  async getBookings(req, res) {
    try {
      const userId = req.user.userId;
      const { bookingId, summary } = req.query;
      
      // If summary is requested
      if (summary === 'true') {
        const user = await User.findById(userId);
        const summaryData = await Booking.getSummary(userId);
        
        return res.status(200).json({
          success: true,
          data: {
            userId: user.id,
            username: user.username,
            totalBookings: parseInt(summaryData.total_bookings),
            totalAmountSpent: parseFloat(summaryData.total_amount_spent),
          },
        });
      }
      
      // Get specific booking or all bookings
      const bookings = await Booking.findByUserId(userId, bookingId);
      
      // If bookingId was specified but not found
      if (bookingId && bookings.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found',
        });
      }
      
      // Format response with totalCost
      const formattedBookings = bookings.map(booking => ({
        id: booking.id,
        car_name: booking.car_name,
        days: booking.days,
        rent_per_day: parseFloat(booking.rent_per_day),
        status: booking.status,
        totalCost: booking.days * parseFloat(booking.rent_per_day),
        created_at: booking.created_at,
      }));
      
      return res.status(200).json({
        success: true,
        data: formattedBookings,
      });
      
    } catch (error) {
      console.error('Get bookings error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  // Update booking
  async updateBooking(req, res) {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const userId = req.user.userId;
      const updates = req.body;
      
      // Check if booking exists and belongs to user
      const belongsToUser = await Booking.belongsToUser(bookingId, userId);
      if (!belongsToUser) {
        return res.status(403).json({
          success: false,
          error: 'Booking does not belong to user',
        });
      }
      
      // Validate status if provided
      if (updates.status) {
        const statusError = validateStatus(updates.status);
        if (statusError) {
          return res.status(400).json({
            success: false,
            error: statusError,
          });
        }
      }
      
      // Validate booking details if provided
      if (updates.carName || updates.days || updates.rentPerDay) {
        const validationErrors = validateBooking(
          updates.carName || 'dummy',
          updates.days || 1,
          updates.rentPerDay || 1
        );
        
        if (validationErrors.length > 0) {
          return res.status(400).json({
            success: false,
            error: validationErrors.join(', '),
          });
        }
      }
      
      // Update booking
      const updatedBooking = await Booking.update(bookingId, updates);
      
      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found',
        });
      }
      
      // Calculate total cost
      const totalCost = updatedBooking.days * parseFloat(updatedBooking.rent_per_day);
      
      return res.status(200).json({
        success: true,
        data: {
          message: 'Booking updated successfully',
          booking: {
            id: updatedBooking.id,
            car_name: updatedBooking.car_name,
            days: updatedBooking.days,
            rent_per_day: parseFloat(updatedBooking.rent_per_day),
            status: updatedBooking.status,
            totalCost,
            created_at: updatedBooking.created_at,
          },
        },
      });
      
    } catch (error) {
      console.error('Update booking error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },

  // Delete booking
  async deleteBooking(req, res) {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const userId = req.user.userId;
      
      // Check if booking exists and belongs to user
      const belongsToUser = await Booking.belongsToUser(bookingId, userId);
      if (!belongsToUser) {
        return res.status(403).json({
          success: false,
          error: 'Booking does not belong to user',
        });
      }
      
      // Delete booking
      const deleted = await Booking.delete(bookingId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          message: 'Booking deleted successfully',
        },
      });
      
    } catch (error) {
      console.error('Delete booking error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  },
};

module.exports = bookingController;