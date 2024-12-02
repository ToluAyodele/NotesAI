const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("Authorization Header:", req.header('Authorization'));

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
