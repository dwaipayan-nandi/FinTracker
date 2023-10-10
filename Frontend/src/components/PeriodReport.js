import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';

function DateRangeFilter() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to handle date input changes
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

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

  

  // Function to fetch entries based on the selected date range
  const fetchEntries = async (from, to) => {
    try {
      const token = sessionStorage.getItem('token');
      // Make an API request to fetch entries within the specified date range
      const response = await axios.get(`http://localhost:3001/expense/period-report/?fromDate=${from}&toDate=${to}`, {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      });
  
      if (Array.isArray(response.data)) {
        return response.data; // Return the fetched data
      } else {
        return []; // Return an empty array if no entries are returned
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      return []; // Return an empty array in case of an error
    }
  };
  // Function to fill the date fields with the last 1 month's range
  const handleLast1MonthClick = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth() - 1);

    // Format the dates as YYYY-MM-DD
    const lastMonthStartDate = formatDate(lastMonth);
    const currentDateFormatted = formatDate(currentDate);

    setFromDate(lastMonthStartDate);
    setToDate(currentDateFormatted);
  };

  // Function to fill the date fields with the last 2 months' range
  const handleLast2MonthsClick = () => {
    const currentDate = new Date();
    const last2Months = new Date(currentDate);
    last2Months.setMonth(currentDate.getMonth() - 2);

    // Format the dates as YYYY-MM-DD
    const last2MonthsStartDate = formatDate(last2Months);
    const currentDateFormatted = formatDate(currentDate);

    setFromDate(last2MonthsStartDate);
    setToDate(currentDateFormatted);
  };

  // Function to format a date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [entries]);

  const handleFetchEntriesClick = async () => {
    // Update the fromDate and toDate states with the current input values
    const updatedFromDate = fromDate;
    const updatedToDate = toDate;

    // Make the API request with the updated dates
    const newEntries = await fetchEntries(updatedFromDate, updatedToDate);
    setEntries(newEntries);
  };

  

  return (
    <div>
      <h1>Date Range Filter</h1>
      <div>
        {/* From Date input field */}
        <label>From Date (YYYY-MM-DD):</label>
        <input
          type="text"
          value={fromDate}
          onChange={handleFromDateChange}
          placeholder="Enter From Date"
        />
      </div>
      <div>
        {/* To Date input field */}
        <label>To Date (YYYY-MM-DD):</label>
        <input
          type="text"
          value={toDate}
          onChange={handleToDateChange}
          placeholder="Enter To Date"
        />
      </div>
      <div>
        <button onClick={handleLast1MonthClick}>Last 1 Month</button>
        <button onClick={handleLast2MonthsClick}>Last 2 Months</button>
        <button onClick={handleFetchEntriesClick}>Fetch Entries</button>
      </div>
      {/* Display the fetched entries or a message if no entries */}
      {entries.length > 0 ? (
          <>
            <h2>Entries for the Selected Date Range</h2>
            <ul>
              <ExpenseList expenses={entries} />
            </ul>
          </>
        ) : (
          <p>No entries found for the selected date range.</p>
        )}
      <div>
        {/* Display the total amount */}
        <h2>Total Amount Spent: ₹{totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default DateRangeFilter;
