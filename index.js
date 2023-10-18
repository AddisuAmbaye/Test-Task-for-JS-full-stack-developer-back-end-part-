const express = require('express');
const jwt = require('jsonwebtoken');
const locusRoutes = require('./routes/locus');

const app = express();

// Define the pre-defined users
const users = {
  admin: { role: 'admin' },
  normal: { role: 'normal' },
  limited: { role: 'limited' },
};

// Define the JWT secret key
const secretKey = 'your_secret_key';

// Middleware for authentication
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = users[decodedToken.role];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

// Set up the routes
app.use('/locus', locusRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
