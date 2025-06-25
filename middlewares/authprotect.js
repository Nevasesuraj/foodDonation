import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const protect = (req, res, next) => {
  try {
    // Support both token from cookies and Authorization header
    const token =
      req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log('Token used for auth:', token);

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.user = {
      id: decoded.userId,
      role: decoded.role || 'user',
    };

    next();
  } catch (err) {
    console.error('Protect middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
