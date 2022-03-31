import React, { useState } from "react";
import "./App.scss";

const ExpenseList = (props) => {
  const deleteExpense = (id) => {
    props.removeExpenseHandler(id);
  };

  const renderExpenseList = props.expenses.map((expense) => {
    const { id, label, number, category, date } = expense;
    return (
      <tr key={id}>
        <th className="tableLabel">{label}</th>
        <td className="tableNumber">
          {number}
          {props.currency}
        </td>
        <th className="tableCategory">{category}</th>
        <td className="tableDate">{date}</td>
        <th className="tableButton">
          <button onClick={() => deleteExpense(id)} className="removeDisplay">
            -
          </button>
        </th>
      </tr>
    );
  });
  return (
    <>
      <div className="flex clearList">
        <div>
          <h3>Expense Transactions</h3>
        </div>
        <div>
          <div className="flex extraButtons">
            <h4 className="clearButton" onClick={props.openModal}>
              See full list
            </h4>
            <h4>&nbsp;|&nbsp;</h4>
            <h4 className="clearButton" onClick={props.removeExpenseList}>
              Delete All
            </h4>
          </div>
          <div className="modalButton" onClick={props.closeModal}>
            <button>X</button>
          </div>
        </div>
      </div>
      <div className="tableExpenseWrapper">
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Category</th>
              <th>Date</th>
              <th className="removeDisplay">Remove</th>
            </tr>
          </thead>
          <tbody>{renderExpenseList}</tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
