const express = require('express');
const jwt = require('jsonwebtoken');
const util = require('util');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Provide your database password here if you have one
    database: 'pfe'
});

// Promisify pool.query
pool.query = util.promisify(pool.query);

const app = express();
app.use(express.json());
app.use(cors());

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { cin, nom, prenom, email, etablissement, mdp,role } = req.body;

        const newUser = {
            cin,
            nom,
            prenom,
            email,
            etablissement,
            mdp,role
        };

        await pool.query('INSERT INTO users SET ?', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Authenticate user and generate JWT token
// Authenticate user and generate JWT token
// Authenticate user and generate JWT token
app.post('/login', async (req, res) => {
    try {
        const { email, mdp } = req.body;

        // Validate request body
        if (!email || !mdp ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Query the database to fetch user with the provided email and password
        const [userRows] = await pool.query('SELECT id, email, role FROM users WHERE email = ? AND mdp = ?', [email, mdp]);
      
        console.log("userRows:", userRows); // Log the result

        // Check if user exists
        if (!userRows || userRows.length === 0) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Extract user from the row data
        const user = userRows[0];

        console.log('User object:', userRows); // Log the user object

        // Check if user object is valid
        if (!userRows || !userRows.id || !userRows.email) {
            console.log('Invalid user object');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       // Generate JWT token
       const token = jwt.sign({ userId: userRows.id, email: userRows.email, role: userRows.role }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
    
    // Set token in response headers
    res.set('Authorization', `Bearer ${token}`);
    console.log("Generated token:", token);
    
    res.status(200).json({ token, role: userRows.role }); 
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in: ' + error.message });
    }
});















// Update user by ID
app.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { cin, nom, prenom, email, etablissement, mdp,role } = req.body;

        const updatedUser = {
            cin,
            nom,
            prenom,
            email,
            etablissement,
            mdp,role
        };

        await pool.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete user by ID
app.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await pool.query('DELETE FROM users WHERE id = ?', userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users
app.get('/all', async (req, res) => {
    try {
        const sql = `SELECT id, cin, nom, prenom, email, etablissement,mdp,role FROM users`;
        const users = await pool.query(sql);
        res.json({ status: 1, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user by ID
app.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Use array destructuring to extract the result rows
        const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      
        // Check if user exists
        if (!userRows || userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userRows[0];
        res.status(200).json(userRows);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Check if email exists
app.get('/check-email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const [userRows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

        if (userRows && userRows.length > 0) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = app;
