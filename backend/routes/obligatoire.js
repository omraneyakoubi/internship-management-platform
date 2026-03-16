const express = require('express');
const jwt = require('jsonwebtoken'); // Not directly used here, but might be needed in the future
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

// Create a new obligatoire entry (equivalent to user registration)
app.post('/', async (req, res) => {
  try {
    const { annee, domaine, nom, prenom, email, cin } = req.body;

    const newObligatoire = {
      annee,
      domaine,
      nom,
      prenom,
      email,
      cin
    };

    await pool.query('INSERT INTO obligatoire SET ?', newObligatoire);
    res.status(201).json({ message: 'Obligatoire entry created successfully' });
  } catch (error) {
    console.error('Error creating obligatoire entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update obligatoire by ID (similar to update user by ID)
app.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Assuming 'id' refers to the obligatoire entry ID
    const { annee, domaine, nom, prenom, email, cin } = req.body;

    const updatedObligatoire = {
      annee,
      domaine,
      nom,
      prenom,
      email,
      cin
    };

    await pool.query('UPDATE obligatoire SET ? WHERE id = ?', [updatedObligatoire, userId]);
    res.status(200).json({ message: 'Obligatoire entry updated successfully' });
  } catch (error) {
    console.error('Error updating obligatoire entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete obligatoire by ID (similar to delete user by ID)
app.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Assuming 'id' refers to the obligatoire entry ID

    await pool.query('DELETE FROM obligatoire WHERE id = ?', userId);
    res.status(200).json({ message: 'Obligatoire entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting obligatoire entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all obligatoire entries (similar to get all users)
app.get('/all', async (req, res) => {
  try {
    const sql = `SELECT id, annee, domaine, nom, prenom, email, cin FROM obligatoire`;
    const obligatoireEntries = await pool.query(sql);
    res.json({ status: 1, data: obligatoireEntries });
  } catch (error) {
    console.error('Error fetching obligatoire entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get obligatoire entry by ID (similar to get user by ID)
app.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Assuming 'id' refers to the obligatoire entry ID

    const [obligatoireEntry] = await pool.query('SELECT * FROM obligatoire WHERE id = ?', [userId]);

    if (!obligatoireEntry) {
      return res.status(404).json({ message: 'Obligatoire entry not found' });
    }

    res.status(200).json(obligatoireEntry);
  } catch (error) {
    console.error('Error fetching obligatoire entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
