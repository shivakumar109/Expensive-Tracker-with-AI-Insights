# Expense Tracker with AI Insights

![Expense Tracker](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)

An intelligent, full-stack expense tracking application that not only helps you manage your finances but also leverages Artificial Intelligence to provide smart insights, categorization, and receipt scanning.

## Features

- **User Authentication**: Secure signup and login with JWT and bcrypt.
- **Budget Management**: Set, update, and track your monthly or weekly budgets.
- **Expense Tracking**: Easily add, edit, and delete expenses. 
- **AI-Powered Insights**: Get personalized financial advice and insights using Google Gemini AI.
- **Receipt Scanning (OCR)**: Upload receipts and automatically extract expense data using Tesseract.js and Cloudinary.
- **Data Visualization**: View your spending habits with interactive charts built using Chart.js.
- **Export to PDF**: Generate and download detailed financial reports as PDF files.

## Tech Stack

### Frontend
- **React 19** & **Vite**: For a fast, modern UI.
- **Tailwind CSS 4**: For responsive, utility-first styling.
- **Chart.js**: For interactive data visualization.
- **html2pdf.js**: For exporting reports.
- **React Router**: For seamless client-side navigation.

### Backend
- **Node.js** & **Express**: Fast and scalable server architecture.
- **MongoDB** & **Mongoose**: NoSQL database for flexible data modeling.
- **Google Generative AI (Gemini)**: For generating smart financial insights.
- **Tesseract.js**: For Optical Character Recognition (OCR) on uploaded receipts.
- **Cloudinary** & **Multer**: For image upload and storage management.
- **JWT & Helmet**: For security and authentication.

##  Project Structure


Expensive-Tracker-with-AI-Insights/
├── Backend/                 # Express backend server
│   ├── APIs/                # Route controllers
│   ├── Models/              # Mongoose database schemas
│   ├── Middlewares/         # Custom middlewares (e.g., auth, upload)
│   ├── Services/            # Business logic and external API integrations
│   └── server.js            # Entry point for backend
│
└── Frontend/                # React UI application
    ├── src/                 # React components, pages, and hooks
    ├── public/              # Static assets
    └── vite.config.js       # Vite configuration


##  Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed. You will also need API keys for Cloudinary and Google Gemini.

### 1. Clone the Repository

git clone https://github.com/shivakumar109/Expensive-Tracker-with-AI-Insights.git
cd Expensive-Tracker-with-AI-Insights


### 2. Backend Setup

cd Backend
npm install

Create a `.env` file in the `Backend` directory and add your environment variables:

PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_google_gemini_api_key

Start the backend server:

npm run dev


### 3. Frontend Setup
Open a new terminal window/tab:

cd Frontend
npm install

Start the Vite development server:

npm run dev


##  Usage
- Navigate to `http://localhost:5173` in your browser.
- Create an account or log in.
- Set up your budget.
- Start adding expenses manually or upload receipt images for automatic extraction.
- Navigate to the Insights tab to receive AI-generated financial advice based on your spending patterns.

##  Contributing
Contributions, issues, and feature requests are welcome!
