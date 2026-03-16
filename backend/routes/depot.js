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

// Create a new depot entry
app.post('/add', async (req, res) => {
  try {
    const { id, cin, nomprenom, inscri, diplome, spec, annee } = req.body;

    const newDepot = {
      id,
      cin,
      nomprenom,
      inscri,
      diplome,
      spec,
      annee
    };

    await pool.query('INSERT INTO depot SET ?', newDepot);
    res.status(201).json({ message: 'Depot entry created successfully' });
  } catch (error) {
    console.error('Error creating depot entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update depot by ID
app.put('/update/:id', async (req, res) => {
  try {
    const depotId = req.params.id;
    const { cin, nomprenom, inscri, diplome, spec, annee } = req.body;

    const updatedDepot = {
      cin,
      nomprenom,
      inscri,
      diplome,
      spec,
      annee
    };

    await pool.query('UPDATE depot SET ? WHERE id = ?', [updatedDepot, depotId]);
    res.status(200).json({ message: 'Depot entry updated successfully' });
  } catch (error) {
    console.error('Error updating depot entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete depot by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const depotId = req.params.id;

    await pool.query('DELETE FROM depot WHERE id = ?', depotId);
    res.status(200).json({ message: 'Depot entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting depot entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all depot entries
app.get('/all', async (req, res) => {
  try {
    const sql = `SELECT id, cin, nomprenom, inscri, diplome, spec, annee FROM depot`;
    const depotEntries = await pool.query(sql);
    res.json({ status: 1, data: depotEntries });
  } catch (error) {
    console.error('Error fetching depot entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get depot entry by ID
app.get('/:id', async (req, res) => {
  try {
    const depotId = req.params.id;

    const [depotEntry] = await pool.query('SELECT * FROM depot WHERE id = ?', [depotId]);

    if (!depotEntry) {
      return res.status(404).json({ message: 'Depot entry not found' });
    }

    res.status(200).json(depotEntry);
  } catch (error) {
    console.error('Error fetching depot entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
