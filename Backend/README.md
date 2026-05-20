#  Expense Tracker - Backend Server

This is the Backend application for the **Expense Tracker with AI Insights** project. It provides a robust and secure RESTful API built with Express, MongoDB, and integrates advanced features like AI insights (Google Gemini) and OCR receipt scanning (Tesseract.js).

## Technologies Used

- **Node.js & Express v5**: Scalable server framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data schemas.
- **Google Generative AI**: Gemini API integration for personalized financial advice.
- **Tesseract.js**: OCR engine for extracting text from uploaded receipts.
- **Cloudinary & Multer**: Cloud-based image management and upload handling.
- **JWT (JSON Web Tokens)**: Secure user authentication and session management.
- **Bcrypt.js**: Password hashing and security.
- **Helmet & Express Rate Limit**: Enhanced API security.

## Directory Structure


Backend/
├── APIs/                # Route definitions and controllers
│   ├── budgetAPI.js
│   ├── expensesAPI.js
│   └── usersAPI.js
├── Middlewares/         # Custom Express middlewares (e.g., auth verification, rate limiting)
├── Models/              # Mongoose data models (User, Expense, Budget)
├── Services/            # Business logic and external API integrations
├── server.js            # Main application entry point
├── eng.traineddata      # Tesseract language data for OCR
└── package.json         # Backend dependencies and scripts

##  API Endpoints (Overview)

### Users
- `POST /user-api/register` - Register a new user
- `POST /user-api/login` - Authenticate a user and return a JWT

### Budgets
- `POST /budget-api/budget` - Set a specific budget for the user
- `GET /budget-api/budget` - Get the user's current budget
- `GET /budget-api/check-budget` - Check if the user is out of budget
- `PUT /budget-api/updatebudget` - Update the user's budget

### Expenses
*(See `expensesAPI.js` for full details)*
- Add, retrieve, update, and delete expenses
- Upload receipts and trigger OCR extraction
- Request AI insights based on spending history

## Setup & Development

### 1. Install Dependencies

npm install


### 2. Environment Variables
Create a `.env` file in the `Backend` directory:

PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_google_gemini_api_key


### 3. Start the Server
For development (with automatic restarts):

npm run dev

##  Main Project README
For information on the full-stack setup, including the React frontend UI, please refer to the [Main Project README](../README.md) located in the root directory.
