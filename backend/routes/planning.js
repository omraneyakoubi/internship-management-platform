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

// Create a new planning entry
app.post('/planning', async (req, res) => {
  try {
    const { email, date, fedback } = req.body;

    const newPlanningEntry = {
      email,
      date,
      fedback
    };

    await pool.query('INSERT INTO planning SET ?', newPlanningEntry);
    res.status(201).json({ message: 'Planning entry created successfully' });
  } catch (error) {
    console.error('Error creating planning entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update planning entry by ID
app.put('/planning/:id', async (req, res) => {
  try {
    const planningId = req.params.id;
    const { email, date, fedback } = req.body;

    const updatedPlanningEntry = {
      email,
      date,
      fedback
    };

    await pool.query('UPDATE planning SET ? WHERE id = ?', [updatedPlanningEntry, planningId]);
    res.status(200).json({ message: 'Planning entry updated successfully' });
  } catch (error) {
    console.error('Error updating planning entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete planning entry by ID
app.delete('/planning/:id', async (req, res) => {
  try {
    const planningId = req.params.id;

    await pool.query('DELETE FROM planning WHERE id = ?', planningId);
    res.status(200).json({ message: 'Planning entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting planning entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all planning entries
app.get('/planning/all', async (req, res) => {
  try {
    const sql = `SELECT id, email, date, fedback FROM planning`;
    const planningEntries = await pool.query(sql);
    res.json({ status: 1, data: planningEntries });
  } catch (error) {
    console.error('Error fetching planning entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get planning entry by ID
app.get('/planning/:id', async (req, res) => {
  try {
    const planningId = req.params.id;

    const [planningEntry] = await pool.query('SELECT * FROM planning WHERE id = ?', [planningId]);

    if (!planningEntry) {
      return res.status(404).json({ message: 'Planning entry not found' });
    }

    res.status(200).json(planningEntry);
  } catch (error) {
    console.error('Error fetching planning entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get planning entry by email
app.get('/planning/email/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;

    const sql = 'SELECT * FROM planning WHERE email = ?';
    const planningEntries = await pool.query(sql, [userEmail]);

    if (planningEntries.length === 0) {
      return res.status(404).json({ message: 'No planning entry found for the provided email' });
    }

    res.status(200).json(planningEntries);
  } catch (error) {
    console.error('Error fetching planning entries by email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = app;
