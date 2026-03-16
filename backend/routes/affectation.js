const express = require('express');
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

// CRUD operations for the depot table
// (existing CRUD operations for depot table)

// CRUD operations for the affectation table

// Create a new affectation entry
app.post('/add', async (req, res) => {
  try {
    const { id, nomsociete, sujet, adresse, numrsociete, nomencadreurtechnique, emailetud } = req.body;

    const newAffectation = {
      id,
      nomsociete,
      sujet,
      adresse,
      numrsociete,
      nomencadreurtechnique,
      emailetud
    };

    await pool.query('INSERT INTO affectation SET ?', newAffectation);
    res.status(201).json({ message: 'Affectation entry created successfully' });
  } catch (error) {
    console.error('Error creating affectation entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update affectation by ID
app.put('/:id', async (req, res) => {
  try {
    const affectationId = req.params.id;
    const { nomsociete, sujet, adresse, numrsociete, nomencadreurtechnique, emailetud } = req.body;

    const updatedAffectation = {
      nomsociete,
      sujet,
      adresse,
      numrsociete,
      nomencadreurtechnique,
      emailetud
    };

    await pool.query('UPDATE affectation SET ? WHERE id = ?', [updatedAffectation, affectationId]);
    res.status(200).json({ message: 'Affectation entry updated successfully' });
  } catch (error) {
    console.error('Error updating affectation entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete affectation by ID
app.delete('/:id', async (req, res) => {
  try {
    const affectationId = req.params.id;

    await pool.query('DELETE FROM affectation WHERE id = ?', affectationId);
    res.status(200).json({ message: 'Affectation entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting affectation entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all affectation entries
app.get('/all', async (req, res) => {
  try {
    const sql = 'SELECT id, nomsociete, sujet, adresse, numrsociete, nomencadreurtechnique, emailetud FROM affectation';
    const affectationEntries = await pool.query(sql);
    res.json({ status: 1, data: affectationEntries });
  } catch (error) {
    console.error('Error fetching affectation entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get affectation entry by ID
app.get('/:id', async (req, res) => {
  try {
    const affectationId = req.params.id;

    const [affectationEntry] = await pool.query('SELECT * FROM affectation WHERE id = ?', [affectationId]);

    if (!affectationEntry) {
      return res.status(404).json({ message: 'Affectation entry not found' });
    }

    res.status(200).json(affectationEntry);
  } catch (error) {
    console.error('Error fetching affectation entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
