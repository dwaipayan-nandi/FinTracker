import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import Navbar from '../modules/Navbar';

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
      setMessage('Expense added successfully!');

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
    <>
    <div class='grid grid-rows-5 justify-stretch w-screen h-screen grid-cols-2 grid-flow-row justify-items-stretch bg-gradient-to-r from-blue-800 to-neutral-800'>
      <div class='col-span-2'><Navbar/></div>
      <div class='justify-self-center row-span-2 mb-7'><ExpenseList expenses={expenses} /></div>
      <div class='justify-self-center row-span-2 mb-7'> <p class='text-center font-sans text-xl font-semibold text-white'>Add Expense</p>
      
      <form onSubmit={handleSubmit}>
        <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
<select id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="">Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining Out">Dining Out</option>  
</select>
            {/* Add more options as needed */}

        </div>
        <div>
          <label for="itemName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name:</label>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
          <input
            type="number"
            id="amount"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit"  class="w-full  text-white mt-5 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Expense</button>
      </form>
      {message && <p class='text-center mt-2 font-sans font-semibold text-white'>{message}</p>}

      <p class='text-center mt-2 font-sans text-xl font-semibold text-white'>Total Amount Spent Today: ₹{totalAmountToday.toFixed(2)}</p>
      </div>
    </div>
    </>
  );
}

export default ExpenseForm;
