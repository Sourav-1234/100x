const validateSignup = (username, password) => {
  const errors = [];
  
  if (!username || username.trim().length < 3 || username.trim().length > 50) {
    errors.push('Username must be between 3 and 50 characters');
  }
  
  if (!password || password.length < 3) {
    errors.push('Password must be at least 3 characters long');
  }
  
  return errors;
};

const validateLogin = (username, password) => {
  const errors = [];
  
  if (!username || !username.trim()) {
    errors.push('Username is required');
  }
  
  if (!password) {
    errors.push('Password is required');
  }
  
  return errors;
};

const validateBooking = (carName, days, rentPerDay) => {
  const errors = [];
  
  if (!carName || carName.trim().length < 1 || carName.trim().length > 100) {
    errors.push('Car name must be between 1 and 100 characters');
  }
  
  if (!days || days < 1 || days > 364) { // Less than 365 as per requirements
    errors.push('Days must be between 1 and 364');
  }
  
  if (!rentPerDay || rentPerDay < 1 || rentPerDay > 2000) {
    errors.push('Rent per day must be between 1 and 2000');
  }
  
  return errors;
};

const validateStatus = (status) => {
  const validStatuses = ['booked', 'completed', 'cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return 'Status must be one of: booked, completed, cancelled';
  }
  return null;
};

module.exports = {
  validateSignup,
  validateLogin,
  validateBooking,
  validateStatus,
};