const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization ;
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g. { userId, role, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or 12expired token' });
  }
}

module.exports = { verifyToken };
