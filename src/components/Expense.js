import React, { useState } from "react";
import "./App.scss";
import ExpenseList from "./ExpenseList";

const Expense = (props) => {
  const [expenseList, setExpenseList] = useState({
    label: "",
    number: "",
    category: "",
    date: "",
  });

  const setCategories = props.expenseCategories.map((el, i) => {
    const elUp = el["name"].charAt(0).toUpperCase() + el["name"].slice(1);
    return (
      <option key={i} value={elUp}>
        {elUp}
      </option>
    );
  });

  const add = (e) => {
    e.preventDefault();
    if (
      expenseList.label === "" ||
      expenseList.number === "" ||
      expenseList.category === "" ||
      expenseList.date === ""
    ) {
      alert("Fill all the fields!");
      return;
    }
    props.addExpenseHandler(expenseList);
    setExpenseList({
      label: "",
      number: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="expenseContainer">
      <h2>Expense</h2>
      <h3>Add Expenses</h3>
      <form onSubmit={add}>
        <div className="flex inputWrapper">
          <div className="inputContainer">
            <label>Label</label>
            <input
              type="text"
              name="name"
              placeholder="Ex. Rent"
              value={expenseList.label}
              onChange={(e) =>
                setExpenseList({ ...expenseList, label: e.target.value })
              }
            />
          </div>
          <div className="inputContainer">
            <label>Value</label>
            <input
              type="number"
              name="number"
              placeholder="Ex. 800"
              value={expenseList.number}
              onChange={(e) =>
                setExpenseList({ ...expenseList, number: e.target.value })
              }
            />
          </div>
          <div className="inputContainer">
            <label>Category</label>
            <select
              value={expenseList.category}
              onChange={(e) =>
                setExpenseList({ ...expenseList, category: e.target.value })
              }
            >
              <option value="" disabled hidden>
                Please Choose...
              </option>
              {setCategories}
            </select>
          </div>
          <div className="inputContainer">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={expenseList.date}
              onChange={(e) =>
                setExpenseList({ ...expenseList, date: e.target.value })
              }
            />
          </div>
          <button className="addButton">+</button>
        </div>
      </form>
      <ExpenseList
        expenses={props.expenses}
        currency={props.currency}
        removeExpenseHandler={props.removeExpenseHandler}
        removeExpenseList={props.removeExpenseList}
        openModal={props.openModal}
        closeModal={props.closeModal}
      />
    </div>
  );
};

export default Expense;
