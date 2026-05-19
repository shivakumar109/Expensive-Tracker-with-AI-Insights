import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { userRoute } from './APIs/userAPI.js';
import { expenseRoute } from "./APIs/expenseAPI.js"
import { budgetRoute } from './APIs/budgetAPI.js';
import { aiRoute } from './APIs/aiAPI.js';
import { receiptRoute } from './APIs/receiptAPI.js';

//process.env 
config()

// Environment Variable Validation
const requiredEnv = ['DB_URL', 'PORT', 'JWT_SECRET', 'GOOGLE_API_KEY'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0) {
  console.error(`FATAL ERROR: Missing environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

const app = exp()

// Security middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // increased to 1000 for complex dashboard loading
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

//add body parser middleware
app.use(exp.json());
//add cookiParser
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//connect to db
const connectDb = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connection successful");
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (err) {
    console.log('Error in DB Connection ', err);
  }
}
connectDb();

//connect-apis
app.use('/user-api', userRoute);
app.use('/expense-api', expenseRoute);
app.use('/budget-api', budgetRoute);
app.use('/ai-api', aiRoute);
app.use('/receipt-api', receiptRoute);

//error handling middle ware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  
  if (statusCode === 500) {
    console.error("Server Error occurred: ", err);
  } else {
    console.log(`[Client Error] ${statusCode}: ${err.message}`);
  }
  
  const errorResponse = {
    message: err.message || "Internal Server Error",
    payload: process.env.NODE_ENV === 'production' ? null : err.stack
  };

  res.status(statusCode).json(errorResponse);
});

// server.js