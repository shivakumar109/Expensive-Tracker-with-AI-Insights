import express from 'express';
import multer from 'multer';
import Tesseract from 'tesseract.js';
import { verifyToken } from '../Middlewares/verifyToken.js';

export const receiptRoute = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

receiptRoute.post('/upload', verifyToken, upload.single('receipt'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No receipt image uploaded' });
    }

    // Recognize text from image buffer
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng');

    // Basic extraction logic
    const amountMatch = text.match(/\$?\s*(\d+\.\d{2})/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : null;

    const dateMatch = text.match(/(\d{1,4}[-/]\d{1,2}[-/]\d{1,4})/);
    const date = dateMatch ? dateMatch[1] : null;

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const merchant = lines.length > 0 ? lines[0] : 'Unknown Merchant';

    res.status(200).json({
      message: 'Receipt processed successfully',
      payload: {
        extracted: {
          amount,
          date,
          merchant,
          category: "Other" // Default category
        },
        rawText: text
      }
    });

  } catch (error) {
    next(error);
  }
});
