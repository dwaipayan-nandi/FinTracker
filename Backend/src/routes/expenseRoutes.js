
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new expense
router.post('/', authMiddleware.authenticateToken, expenseController.createExpense);

// Get all expenses
router.get('/', authMiddleware.authenticateToken, expenseController.getAllExpenses);

// Get expenses for a specific date
router.get('/date-expense', authMiddleware.authenticateToken, expenseController.getExpensesByDate);

// Get expenses for a given period
router.get('/period-report', authMiddleware.authenticateToken, expenseController.getExpensesinPeriod);

module.exports = router;
