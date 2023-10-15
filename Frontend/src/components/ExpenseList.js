import React, { useState } from 'react';


function ExpenseList({ expenses }) {
  const itemsPerPage = 7; // Define the number of expenses to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const reversedExpenses = expenses.slice().reverse();

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = reversedExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
          {currentExpenses.map((expense) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={expense.id}>
              <td class="px-6 py-4 text-center text-white ">{formatDate(expense.entry_date)}</td>
              <td class="px-6 py-4 text-center text-white">{expense.category}</td>
              <td class="px-6 py-4 text-center text-white">{expense.item_name}</td>
              <td class="px-6 py-4 text-center text-white">₹{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(reversedExpenses.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-2 mx-1 font-semibold text-white ${
              currentPage === index + 1 ? 'bg-gray-600' : 'bg-gray-400 hover:bg-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>      

    </div>
  );
}

export default ExpenseList;
