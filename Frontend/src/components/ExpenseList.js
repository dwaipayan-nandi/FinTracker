// src/components/ExpenseList.js

import React from 'react';

function ExpenseList({ expenses }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  // Reversing the expenses array to display newer entries at the top
  const reversedExpenses = expenses.slice().reverse();

  return (
    <div class="relative overflow-x-auto  shadow-md sm:rounded-lg">
      <p class='text-center font-sans text-xl mb-3  font-semibold text-white'>Expense List</p>
      <table class=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 text-center font-semibold text-white">Date (YYYY-MM-DD)</th>
            <th scope="col" class="px-6 py-3 text-center font-semibold text-white">Category</th>
            <th scope="col" class="px-6 py-3 text-center font-semibold text-white">Item</th>
            <th scope="col" class="px-6 py-3 text-center font-semibold text-white">Amount</th>
          </tr>
        </thead>
        <tbody>
          {reversedExpenses.map((expense) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={expense.id}>
              <td class="px-6 py-4 text-center text-white ">{formatDate(expense.entry_date)}</td>
              <td class="px-6 py-4 text-center text-white">{expense.category}</td>
              <td class="px-6 py-4 text-center text-white">{expense.item_name}</td>
              <td class="px-6 py-4 text-center text-white">₹{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
