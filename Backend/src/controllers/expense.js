// src/controllers/expense.js

const pool = require('../db/database');
const moment = require('moment-timezone');

function formatTimestampToIST(timestamp) {
  return moment.tz(timestamp, 'Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { category, itemName, amount } = req.body;
    const username = req.user;
    const connection = await pool.getConnection();
    const [results] = await connection.execute(
      'INSERT INTO financial_entries (username, category, item_name, amount) VALUES (?, ?, ?, ?)',
      [username, category, itemName, amount]
    );
    connection.release();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (err) {
    console.error('Error adding entry: ' + err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const username = req.user;
    //console.log(req.user);
    const [results] = await connection.execute('SELECT * FROM financial_entries WHERE username = ?', [username]);
    connection.release();

    const formattedResults = results.map((row) => ({
      ...row,
      entry_date: formatTimestampToIST(row.entry_date), // Use the utility function
    }));

    //console.log(formattedResults);
    res.status(200).json(formattedResults);
  } catch (err) {
    console.error('Error fetching data: ' + err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get expenses for a specific date
exports.getExpensesByDate = async (req, res) => {
    try {
      const {date} = req.query; // Retrieve the date from the URL parameter
      const username = req.user;
      const connection = await pool.getConnection();
      const [results] = await connection.execute('SELECT * FROM financial_entries WHERE entry_date = ? and username = ?',[date, username]);
    connection.release();

    const formattedResults = results.map((row) => ({
      ...row,
      entry_date: formatTimestampToIST(row.entry_date), // Use the utility function
    }));
  
      res.status(200).json(formattedResults);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Get expenses for a specific month
exports.getExpensesinPeriod = async (req, res) => {

  function isValidDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  }

  try {
    const { fromDate, toDate } = req.query;
    const username = req.user;
    // Validate that the provided dates are in a valid format (YYYY-MM-DD)
    if (!isValidDate(fromDate) || !isValidDate(toDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Retrieve expenses within the specified date range from the database
    const [results] = await pool.execute(
      'SELECT * FROM financial_entries WHERE username = ? and entry_date BETWEEN ? AND ? ',
      [username, fromDate, toDate]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'No entries found within the specified date range' });
    }

    const formattedResults = results.map((row) => ({
      ...row,
      entry_date: formatTimestampToIST(row.entry_date), // Use the utility function
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

