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

pool.query = util.promisify(pool.query);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new etudencadrent entry
app.post('/add', async (req, res) => {
  try {
    const { nomet,emailetud, encadreur, sujet } = req.body;

    const newEtudencadrent = {
      nomet,emailetud,
      encadreur,
      sujet
    };

    await pool.query('INSERT INTO etudencadrent SET ?', newEtudencadrent);
    res.status(201).json({ message: 'Etudencadrent entry created successfully' });
  } catch (error) {
    console.error('Error creating etudencadrent entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update etudencadrent by ID
app.put('/update/:id', async (req, res) => {
  try {
    const etudencadrentId = req.params.id;
    const { nomet,emailetud, encadreur, sujet } = req.body;

    const updatedEtudencadrent = {
      nomet,emailetud,
      encadreur,
      sujet
    };

    await pool.query('UPDATE etudencadrent SET ? WHERE id = ?', [updatedEtudencadrent, etudencadrentId]);
    res.status(200).json({ message: 'Etudencadrent entry updated successfully' });
  } catch (error) {
    console.error('Error updating etudencadrent entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete etudencadrent by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const etudencadrentId = req.params.id;

    await pool.query('DELETE FROM etudencadrent WHERE id = ?', etudencadrentId);
    res.status(200).json({ message: 'Etudencadrent entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting etudencadrent entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all etudencadrent entries
app.get('/all', async (req, res) => {
  try {
    const sql = `SELECT id, nomet,emailetud, encadreur, sujet FROM etudencadrent`;
    const etudencadrentEntries = await pool.query(sql);
    res.json({ status: 1, data: etudencadrentEntries });
  } catch (error) {
    console.error('Error fetching etudencadrent entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get etudencadrent entry by ID
app.get('/get/:id', async (req, res) => {
  try {
    const etudencadrentId = req.params.id;

    const [etudencadrentEntry] = await pool.query('SELECT * FROM etudencadrent WHERE id = ?', [etudencadrentId]);

    if (!etudencadrentEntry) {
      return res.status(404).json({ message: 'Etudencadrent entry not found' });
    }

    res.status(200).json(etudencadrentEntry);
  } catch (error) {
    console.error('Error fetching etudencadrent entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
