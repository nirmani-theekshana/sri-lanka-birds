const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    //validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        //check if user exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        //hash password
        const hashed = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashed]
        );

        res.status(201).json({ message: "Registration successful", user: result.rows[0] 
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error' });
    }
    });

// Login
router.post('/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        //token expires in 7 days if 'remember me' else 1 day
        const expiresIn = rememberMe ? '7d' : '1d';
        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn }
        );

        res.json({ 
            token, 
            expiresIn,
            user: { id: user.id, username: user.username, email: user.email } 
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;