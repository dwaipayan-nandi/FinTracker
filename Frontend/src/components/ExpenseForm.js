import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';

function ExpenseForm() {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalAmountToday, setTotalAmountToday] = useState(0);

  // Function to get today's date in 'YYYY-MM-DD' format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchExpenses = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/expense/', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchTotalAmountToday = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const todayDate = getTodayDate();
      const response = await axios.get(`http://localhost:3001/expense/date-expense/?date=${todayDate}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        // Calculate the total amount for today
        let total = 0;
        for (const entry of response.data) {
          total += parseFloat(entry.amount);
        }
        setTotalAmountToday(total);
      } else {
        setTotalAmountToday(0);
      }
    } catch (error) {
      console.error('Error fetching total amount for today:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchTotalAmountToday(); // Fetch the total amount for today when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/expense/', {
        category,
        itemName,
        amount,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log('Expense added:', response.data);
      // Display a success message
      setMessage('Expense added successfully');

      // Clear the input fields after successful submission
      setCategory('');
      setItemName('');
      setAmount('');
      fetchExpenses();
      fetchTotalAmountToday(); // Fetch the updated total amount for today
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining Out">Dining Out</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Total Amount Spent Today: ₹{totalAmountToday.toFixed(2)}</h2>
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default ExpenseForm;
