import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import Navbar from '../modules/Navbar';

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
   <>
   <div class='w-screen h-screen bg-gradient-to-r from-blue-800 to-neutral-800'>
   <div class='grid grid-rows-2 grid-cols-2 grid-flow-row justify-items-stretch'>
    <div class='col-span-2'><Navbar/></div>
    <div class='justify-self-center'><div>
        {/* Display the fetched entries */}
        <p class='text-center font-semibold text-white'>Entries for {date}</p>
        <ul>
          <ExpenseList expenses={entries} />
        </ul>
      </div>
      <div>
        {/* Display the total amount */}
        <p class='text-center font-sans text-xl font-semibold pb-3 text-white'>Total Amount Spent: ₹{totalAmount.toFixed(2)}</p>
      </div></div>
    <div class='justify-self-center mt-2'>
    <p class='text-center ml-2 mt-24 text-xl font-semibold text-white'>Daily Report!</p>
      <div class='ml-9'>
        {/* Date input field */}
        <label for="date" class="block mb-2 text-l font-medium text-gray-900 dark:text-white">Date (YYYY-MM-DD):</label>
        <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id='date'
          value={date}
          onChange={handleDateChange}
          placeholder="Enter date"
        />
        <div class='ml-8 mt-5'>
        <button class='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={fetchEntries}>Fetch Entries</button>
        </div>  
        </div>
    </div>
    </div>
   </div>
   </>
  );
}

export default DailyReport;
