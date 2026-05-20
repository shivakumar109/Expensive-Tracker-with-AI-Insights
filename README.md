#  Expense Tracker with AI Insights

A modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application goes beyond simple tracking by incorporating AI-driven financial insights and OCR capabilities for receipt scanning, helping users manage their budgets effectively.

##  Features

- **User Authentication:** Secure signup and login with JWT and bcrypt password hashing.
- **Dashboard & Analytics:** Visual representations of your income, expenses, and budget using interactive charts.
- **AI Financial Insights:** Get intelligent financial advice and summaries powered by Google Generative AI (Gemini).
- **Receipt Scanning (OCR):** Upload receipts and automatically extract expense data using Tesseract.js.
- **Budget Management:** Set monthly or yearly budgets and track your spending against them.
- **Export Data:** Easily download your financial reports as PDF files.
- **Responsive UI:** A beautiful, responsive user interface designed with Tailwind CSS v4 and React.
- **Cloud Storage:** Securely upload and store user profile pictures and receipt images via Cloudinary.

##  Tech Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS v4** for styling
- **React Router** for navigation
- **Chart.js / react-chartjs-2** for interactive charts
- **html2pdf.js** for report generation
- **Axios** for API requests

### Backend
- **Node.js** with **Express 5**
- **MongoDB** with **Mongoose**
- **@google/generative-ai** for AI insights
- **Tesseract.js** for Optical Character Recognition
- **Cloudinary & Multer** for image upload management
- **JWT & bcryptjs** for secure authentication

##  Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with MongoDB (local or Atlas).

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expensive-Tracker-with-AI-Insights
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
   Start the backend server:
   ```bash
   node server.js
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```
   Create a `.env` file in the `Frontend` directory (if needed) and add:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

##  Usage
1. Register a new account or log in to an existing one.
2. Set your initial budget via the dashboard.
3. Start adding your income and expenses manually, or try uploading a receipt to automatically parse the data.
4. Navigate to the AI Insights tab to get personalized financial advice based on your spending habits.
5. Export your monthly summary as a PDF to keep for your records.

## Contributing
Contributions, issues, and feature requests are welcome!


