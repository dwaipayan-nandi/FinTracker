import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import Navbar from '../modules/Navbar';
import './styles.css'

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
    <>
    <div class='w-screen h-screen bg-gradient-to-r from-blue-800 to-neutral-800'>
    <div class='grid custom-grid grid-rows-2 grid-cols-2 grid-flow-row justify-items-stretch'>
    <div class='col-span-2'><Navbar/></div>
    <div class='justify-self-center row-span-2'>
      {entries.length > 0 ? (
          <>
            <p class='text-center font-sans text-xl font-semibold text-white mb-5'>Entries for the Selected Date Range!</p>
            <ul>
              <ExpenseList expenses={entries} />
            </ul>
          </>
        ) : (
          <p class='text-center font-sans text-xl font-semibold text-red-600 mb-5'>No entries found for the selected date range!</p>
        )}
        <div>
        {/* Display the total amount */}
        <p class='text-center font-sans text-xl font-semibold text-white'>Total Amount Spent: ₹{totalAmount.toFixed(2)}</p>
      </div>
        </div>   
    <div class='justify-self-center mt-2'> <p class='text-center font-sans text-xl font-semibold pb-3 text-white'>Date Range Filter</p>
    <div>
    <div class='ml-12'><label for="fromdate" class="block mb-2 text-l font-medium text-gray-900 dark:text-white">From Date:</label>
    <input
          type="text"
	        id ="fromdate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={fromDate}
          onChange={handleFromDateChange}
          placeholder="Enter From Date"
        /></div>
        <div class='ml-12'>
        {/* To Date input field */}
        <label for="todate" class="block mb-2 text-l font-medium text-gray-900 pt-2 dark:text-white">To Date :</label>
        <input
          type="text"
          id="todate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={toDate}
          onChange={handleToDateChange}
          placeholder="Enter To Date"
        />
      </div>
      <div class='mt-5 ml-12'>
        <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2" onClick={handleLast1MonthClick}>Last 1 Month</button>
        <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 mb-2" onClick={handleLast2MonthsClick}>Last 2 Months</button>
      </div>
      <div class="mt-4 ml-32"><button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleFetchEntriesClick}>Fetch Entries</button></div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default DateRangeFilter;
