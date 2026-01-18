Car Rental System Backend
A production-ready backend system for a car rental platform built with Node.js, Express, PostgreSQL, and JWT authentication. This system provides secure user authentication, booking management, and comprehensive API endpoints for managing car rentals.

🚀 Features
🔐 Secure Authentication: JWT-based authentication with password hashing

🚗 Booking Management: Full CRUD operations for car rentals

💰 Business Logic: Validations for rental duration and pricing

📊 User Dashboard: Booking summaries and spending analytics

🛡️ Authorization: Role-based access control and ownership verification

🧪 Testing Ready: Structured for test-driven development

📈 Production Ready: Error handling, logging, and security best practices

🏗️ Tech Stack
Runtime: Node.js (v14+)

Framework: Express.js

Database: PostgreSQL

Authentication: JSON Web Tokens (JWT)

Password Hashing: bcryptjs

Testing: Jest + Supertest

Environment: dotenv

📁 Project Structure
text
car-rental-backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── tests/              # Test files
├── .env.example        # Environment variables template
├── database.sql        # Database schema
├── package.json
└── README.md
🚦 Getting Started
Prerequisites
Node.js (v14 or higher)

PostgreSQL (v12 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone <repository-url>
cd car-rental-backend
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env
# Edit .env with your configuration
Create PostgreSQL database

sql
CREATE DATABASE car_rental;
\c car_rental
\i database.sql
Start the development server

bash
npm run dev
The server will start on http://localhost:3000

⚙️ Environment Variables
Create a .env file in the root directory:

env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=car_rental
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=24h
📊 Database Schema
Users Table
sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Bookings Table
sql
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    car_name VARCHAR(100) NOT NULL,
    days INTEGER NOT NULL CHECK (days > 0),
    rent_per_day DECIMAL(10, 2) NOT NULL CHECK (rent_per_day > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('booked', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🔌 API Endpoints
Authentication
POST /auth/signup
Create a new user account.

Request:

json
{
  "username": "john_doe",
  "password": "securepassword123"
}
Response:

json
{
  "success": true,
  "data": {
    "message": "User created successfully",
    "userId": 1
  }
}
POST /auth/login
Authenticate user and receive JWT token.

Request:

json
{
  "username": "john_doe",
  "password": "securepassword123"
}
Response:

json
{
  "success": true,
  "data": {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
Bookings (Protected Routes)
All booking routes require JWT token in Authorization header:

text
Authorization: Bearer <your_jwt_token>
POST /bookings
Create a new car booking.

Request:

json
{
  "carName": "Toyota Camry",
  "days": 3,
  "rentPerDay": 1500
}
Response:

json
{
  "success": true,
  "data": {
    "message": "Booking created successfully",
    "bookingId": 101,
    "totalCost": 4500
  }
}
Business Rules:

Days must be between 1 and 364

Rent per day must be between 1 and 2000

Status defaults to "booked"

GET /bookings
Get all bookings for the authenticated user.

Response:

json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "car_name": "Toyota Camry",
      "days": 3,
      "rent_per_day": 1500,
      "status": "booked",
      "totalCost": 4500
    }
  ]
}
GET /bookings?bookingId=101
Get a specific booking by ID.

GET /bookings?summary=true
Get booking summary for the user.

Response:

json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "john_doe",
    "totalBookings": 3,
    "totalAmountSpent": 6300
  }
}
Note: Summary only includes "booked" and "completed" statuses, excludes "cancelled".

PUT /bookings/:bookingId
Update booking details or status.

Request (Update Details):

json
{
  "carName": "Honda Accord",
  "days": 5,
  "rentPerDay": 1800
}
Request (Update Status):

json
{
  "status": "completed"
}
Response:

json
{
  "success": true,
  "data": {
    "message": "Booking updated successfully",
    "booking": {
      "id": 101,
      "car_name": "Honda Accord",
      "days": 5,
      "rent_per_day": 1800,
      "status": "completed",
      "totalCost": 9000
    }
  }
}
DELETE /bookings/:bookingId
Delete a booking.

Response:

json
{
  "success": true,
  "data": {
    "message": "Booking deleted successfully"
  }
}
🔒 Error Handling
The API follows a consistent error response format:

json
{
  "success": false,
  "error": "Error message description"
}
Common Error Status Codes
Status Code	Description
400	Bad Request - Invalid input data
401	Unauthorized - Authentication required/invalid
403	Forbidden - Booking doesn't belong to user
404	Not Found - Resource not found
409	Conflict - Username already exists
500	Internal Server Error
🧪 Testing
Run the test suite:

bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
Test files are located in the tests/ directory and include:

Authentication tests

Booking CRUD tests

Authorization tests

Validation tests

🐳 Docker Support
To run with Docker:

Build the image:

bash
docker build -t car-rental-backend .
Run the container:

bash
docker run -p 3000:3000 car-rental-backend
🚀 Deployment
Production Considerations
Security:

Use strong JWT secrets

Enable HTTPS

Implement rate limiting

Use CORS appropriately

Performance:

Database connection pooling

Query optimization

Implement caching where appropriate

Monitoring:

Add structured logging

Implement health checks

Set up error tracking (Sentry, etc.)

Database:

Regular backups

Index optimization

Connection limit management

Deployment to Heroku
bash
# Create Heroku app
heroku create car-rental-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run database migrations
heroku run npm run migrate
Deployment to AWS EC2
SSH into EC2 instance

Clone repository

Install dependencies:

bash
npm install --production
Set up PM2 for process management:

bash
npm install -g pm2
pm2 start src/server.js --name car-rental-api
pm2 startup
pm2 save
📈 API Rate Limits
Endpoint	Rate Limit	Window
/auth/login	5 requests	15 minutes
/auth/signup	3 requests	1 hour
/bookings/*	100 requests	15 minutes
🔐 Security Features
Password Security:

bcrypt hashing with salt rounds

Minimum password length enforcement

JWT Security:

Token expiration (24 hours)

Secure secret storage

Bearer token authentication

Input Validation:

Request body validation

SQL injection prevention

XSS protection

Authorization:

Ownership verification

Protected routes middleware

🛠️ Development
Scripts
bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code (if eslint is configured)
npm run lint

# Format code (if prettier is configured)
npm run format
Code Style
Use async/await for asynchronous operations

Follow consistent error handling patterns

Use meaningful variable and function names

Add JSDoc comments for complex functions

Keep functions small and focused

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

Commit Message Convention
feat: New feature

fix: Bug fix

docs: Documentation changes

style: Code style changes (formatting, etc.)

refactor: Code refactoring

test: Adding or updating tests

chore: Maintenance tasks

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Your Name - Initial work

🙏 Acknowledgments
Express.js team for the amazing framework

PostgreSQL community for robust database support

JWT.io for authentication standards

📞 Support
For support, please:

Check the documentation

Search existing issues

Create a new issue with detailed information

🌟 Features Roadmap
Email notifications

Payment integration

Car inventory management

Admin dashboard

Redis caching

GraphQL API

WebSocket for real-time updates

Mobile app support

Happy Coding! 🚗💨


