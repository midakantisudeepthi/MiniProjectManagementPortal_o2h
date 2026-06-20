const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Register User
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || username.trim().length < 3 || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Username (min 3 chars) and password (min 6 chars) are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username.trim(), hashedPassword]);
    
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Username already exists.' });
    }
    next(error);
  }
});

// Login User
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username.trim()]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, username: user.username });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
