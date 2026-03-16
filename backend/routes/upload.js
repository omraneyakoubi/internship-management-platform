const express = require('express');
const util = require('util');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Set up storage for rapport upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be stored in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create a new rapport entry
app.post('/rapport', upload.single('rapport'), async (req, res) => {
  try {
    const { nomprenom } = req.body;

    const newRapport = {
      nomprenom,
      rapport: req.file.path // Save rapport path to database
    };

    await pool.query('INSERT INTO rapport SET ?', newRapport);
    res.status(201).json({ message: 'Rapport entry created successfully' });
  } catch (error) {
    console.error('Error creating rapport entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update rapport by ID
app.put('/rapport/:id', upload.single('rapport'), async (req, res) => {
  try {
    const rapportId = req.params.id; // Extracting rapport ID from request URL
    const { nomprenom, rapport } = req.body; // Extracting nomprenom and rapport from request body

    // Constructing updatedRapport object with new values
    const updatedRapport = {
      nomprenom,
      rapport: req.file.path // File path of the uploaded rapport
    };

    // Updating the rapport entry in the database
    await pool.query('UPDATE rapport SET ? WHERE id = ?', [updatedRapport, rapportId]);
    
    // Sending success response
    res.status(200).json({ message: 'Rapport entry updated successfully' });
  } catch (error) {
    // Handling errors
    console.error('Error updating rapport entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete rapport by ID
app.delete('/rapport/:id', async (req, res) => {
  try {
    const rapportId = req.params.id;

    await pool.query('DELETE FROM rapport WHERE id = ?', rapportId);
    res.status(200).json({ message: 'Rapport entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting rapport entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all rapport entries
app.get('/rapport/all', async (req, res) => {
  try {
    const sql = `SELECT id, nomprenom, rapport FROM rapport`;
    const rapportEntries = await pool.query(sql);
    res.json({ status: 1, data: rapportEntries });
  } catch (error) {
    console.error('Error fetching rapport entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Download rapport by ID
app.get('/rapport/:id/download', async (req, res) => {
  try {
    const rapportId = req.params.id;

    const [rapportEntry] = await pool.query('SELECT * FROM rapport WHERE id = ?', [rapportId]);

    if (!rapportEntry) {
      return res.status(404).json({ message: 'Rapport entry not found' });
    }

    // Check if file exists
    if (!fs.existsSync(rapportEntry.rapport)) {
      return res.status(404).json({ message: 'Rapport file not found' });
    }

    // Set content disposition to attachment
    res.setHeader('Content-Disposition', `attachment; filename="${rapportEntry.nomprenom}.pdf"`);

    // Send the file
    res.sendFile(path.resolve(rapportEntry.rapport));
  } catch (error) {
    console.error('Error downloading rapport entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get rapport entry by ID
// Get rapport entry by ID
// Get rapport entry by ID
app.get('/rapport/:id', async (req, res) => {
  try {
    const rapportId = req.params.id;
    console.log('Fetching rapport with ID:', rapportId);

    const [rapportEntry] = await pool.query('SELECT * FROM rapport WHERE id = ?', [rapportId]);

    if (!rapportEntry) {
      console.log('Rapport entry not found');
      return res.status(404).json({ message: 'Rapport entry not found' });
    }

    console.log('Rapport entry found:', rapportEntry);

    // Check if file exists
    if (!fs.existsSync(rapportEntry.rapport)) {
      console.log('Rapport file not found');
      return res.status(404).json({ message: 'Rapport file not found' });
    }

    console.log('Sending rapport file:', rapportEntry.rapport);

    // Set content disposition to attachment
    res.setHeader('Content-Disposition', `attachment; filename="${rapportEntry.nomprenom}.pdf"`);

    // Send the file
    res.sendFile(path.resolve(rapportEntry.rapport));
  } catch (error) {
    console.error('Error fetching rapport entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get nomprenom and rapport by ID
app.get('/rapport/:id/details', async (req, res) => {
  try {
    const rapportId = req.params.id;
    
    // Fetch nomprenom and rapport based on the provided ID
    const [rapportDetails] = await pool.query('SELECT nomprenom, rapport FROM rapport WHERE id = ?', [rapportId]);

    if (!rapportDetails) {
      return res.status(404).json({ message: 'Rapport entry not found' });
    }

    res.json({ status: 1, data: rapportDetails });
  } catch (error) {
    console.error('Error fetching rapport details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
