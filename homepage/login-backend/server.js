// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret_key'; // Use a secure key in production

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected Route (example)
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json({ message: 'Access granted' });
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

