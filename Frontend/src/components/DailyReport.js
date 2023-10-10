import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';

function DailyReport() {
  const [date, setDate] = useState(''); // State to store the entered date
  const [entries, setEntries] = useState([]); // State to store fetched entries
  const [totalAmount, setTotalAmount] = useState(0); // State to store total amount spent

  // Function to handle date input change
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Function to calculate the total amount from entries
  const calculateTotalAmount = () => {
    let total = 0;
    entries.forEach((entry) => {
      const amount = parseFloat(entry.amount.replace('₹', ''));
      if (!isNaN(amount)) {
        total += amount;
      }
    });
    return total;
  };

  // Function to fetch entries for the specified date
  const fetchEntries = async () => {
    try {
      const token = sessionStorage.getItem('token');
      // Make an API request to fetch entries for the specified date
      const response = await axios.get(`http://localhost:3001/expense/date-expense/?date=${date}`, {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      });

      // Update the entries state with the fetched data
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  // Using useEffect to calculate the total amount whenever entries change
  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [entries]);

  return (
    <div>
      <h1>Daily Report</h1>
      <div>
        {/* Date input field */}
        <label>Date (YYYY-MM-DD):</label>
        <input
          type="text"
          value={date}
          onChange={handleDateChange}
          placeholder="Enter date"
        />
        <button onClick={fetchEntries}>Fetch Entries</button>
      </div>
      <div>
        {/* Display the fetched entries */}
        <h2>Entries for {date}</h2>
        <ul>
          <ExpenseList expenses={entries} />
        </ul>
      </div>
      <div>
        {/* Display the total amount */}
        <h2>Total Amount Spent: ₹{totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default DailyReport;
