import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user payload to req
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};