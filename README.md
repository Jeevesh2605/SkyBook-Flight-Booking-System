# ✈️ SkyBook - Flight Booking System

A modern, full-stack flight booking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). SkyBook provides a seamless experience for searching, booking, and managing flight tickets with real-time availability and secure wallet-based payments.

## 🌟 Features

### User Features
- **Smart Flight Search**: Search flights by origin, destination, date, and passenger count
- **Real-time Availability**: View live flight availability and pricing
- **Secure Authentication**: JWT-based authentication with protected routes
- **Digital Wallet**: Built-in wallet system with ₹50,000 initial balance for new users
- **Instant Booking**: Book flights with automatic seat allocation
- **E-Ticket Generation**: Digital tickets with complete flight and passenger details
- **Booking Management**: View all bookings with status tracking
- **User Profile**: Manage account details and view booking history

### Technical Features
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Secure Payments**: Wallet-based payment system with transaction validation
- **RESTful API**: Well-structured backend with proper error handling
- **Data Validation**: Input validation on both frontend and backend
- **Protected Routes**: Authentication middleware for secure endpoints
- **Real-time Updates**: Dynamic flight availability and pricing

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/airplane-ticket-booking.git
cd airplane-ticket-booking
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5001
```

Seed the database with demo flights:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `Config.js` file in `src/Config/`:
```javascript
export const BACKENDURL = "http://localhost:5001";
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

## 📁 Project Structure
```
airplane-ticket-booking/
├── backend/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Flight.js
│   │   ├── Booking.js
│   │   └── Wallet.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── flight.routes.js
│   │   ├── booking.routes.js
│   │   └── wallet.routes.js
│   ├── .env
│   ├── server.js
│   └── seed.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── FlightCard.jsx
    │   │   ├── BookingForm.jsx
    │   │   └── Ticket.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── SearchResults.jsx
    │   │   ├── BookingPage.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Login.jsx
    │   │   └── SignUp.jsx
    │   ├── context/
    │   │   └── authContext.jsx
    │   ├── Routes/
    │   │   └── AppRoutes.jsx
    │   ├── Config/
    │   │   └── Config.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (Protected)

### Flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights/:id` - Get flight details

### Bookings
- `POST /api/bookings/create` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking details (Protected)

### Wallet
- `GET /api/wallet` - Get wallet balance (Protected)

## 🔐 Authentication Flow

1. User signs up with name, email, and password
2. Password is hashed using bcryptjs
3. User and wallet (₹50,000 initial balance) are created
4. JWT token is generated and returned
5. Token is stored in localStorage on frontend
6. Token is sent in Authorization header for protected routes

## 💳 Booking Flow

1. User searches for flights
2. Selects a flight and clicks "Book Now"
3. Fills passenger details (name, age, gender, seat)
4. System validates wallet balance
5. Amount is deducted from wallet
6. Flight seats are reduced
7. Booking is created with "confirmed" status
8. E-ticket is generated and displayed

## 🎨 Design Features

- **Gradient Backgrounds**: Modern blue gradient themes
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Client and server-side validation
- **Protected Routes**: Redirect to login if not authenticated

## 📊 Database Models

### User
- name, email, password (hashed)
- timestamps

### Flight
- flightNumber, airline, from, to
- departureTime, arrivalTime
- price, availableSeats, class, stops

### Booking
- userId, flightId, passengers[], totalPrice
- status (confirmed/cancelled)
- timestamps

### Wallet
- userId, balance
- timestamps

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev    # Start with nodemon
npm start      # Start server
node seed.js   # Seed demo flights
```

**Frontend:**
```bash
npm run dev    # Start development server
npm run build  # Build for production
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/Jeevesh2605)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/jeevesh-chaurasiya-794625273/)

## 🙏 Acknowledgments

- Built with the MERN stack
- UI design inspired by modern flight booking platforms
- Icons from Lucide React

---

**Made with ❤️ by [Your Name]**

For any questions or support, please open an issue or contact me directly.
