import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import Navbar from '../modules/Navbar';
import './styles.css';

function DailyReport() {
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleDateChange = (event) => {
    setDate(event.target.value);
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

  const fetchEntries = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/expense/date-expense/?date=${date}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [entries]);

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-blue-800 to-neutral-800'>
      <div className='grid custom-grid grid-rows-2 grid-cols-2 grid-flow-row justify-items-stretch'>
        <div className='col-span-2'>
          <Navbar />
        </div>
        <div className='justify-self-center row-span-2'>
          <div>
            {entries.length > 0 ? (
              <>
                <p className='text-center font-sans text-xl font-semibold text-white mb-5'>
                  Entries for the Selected Date Range!
                </p>
                <ul>
                  <ExpenseList expenses={entries} />
                </ul>
              </>
            ) : (
              <p className='text-center font-sans text-xl font-semibold text-red-600 mb-5'>
                No entries found for the selected date range!
              </p>
            )}
            <div>
              <p className='text-center font-sans text-xl font-semibold text-white'>
                Total Amount Spent: ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className='justify-self-center mt-2'>
          <p className='text-center ml-2 mt-24 text-xl font-semibold text-white'>Daily Report!</p>
          <div className='ml-9'>
            <label for='date' className='block mb-2 text-l font-medium text-gray-900 dark:text-white'>
              Date (YYYY-MM-DD):
            </label>
            <input
              type='text'
              id='date'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={date}
              onChange={handleDateChange}
              placeholder='Enter date'
            />
            <div className='ml-8 mt-5'>
              <button
                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                onClick={fetchEntries}
              >
                Fetch Entries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
