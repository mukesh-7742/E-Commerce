import jwt from 'jsonwebtoken';

const AdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized, token missing' });
    }

    const token = authHeader.split(' ')[1];

    // ✅ Verify token and catch specific errors
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // ✅ Check if it's the correct admin
      if (decoded.email !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ success: false, message: 'Access denied. Not an admin.' });
      }

      // ✅ Token and role valid
      next();
    });

  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ success: false, message: 'Authentication failed.' });
  }
};

export default AdminAuth;
