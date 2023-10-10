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
    <div>
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reversedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{formatDate(expense.entry_date)}</td>
              <td>{expense.category}</td>
              <td>{expense.item_name}</td>
              <td>₹{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
