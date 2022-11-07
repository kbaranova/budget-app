import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import Header from "./Header";
import Income from "./Income";
import Overview from "./Overview";
import Expense from "./Expense";
import Categories from "./Categories";
import Converter from "./Converter";
import Modal from "./Modal";

function App() {
  const INCOME_STORAGE_KEY = "incomes";
  const EXPENSE_STORAGE_KEY = "expenses";
  const CURRENCY_STORAGE_KEY = "currency";

  const [currency, setCurrency] = useState("USD");
  const changeCurrencyHandler = (currency) => {
    setCurrency(currency);
  };

  const [incomes, setIncome] = useState([]);
  const addIncomeHandler = (income) => {
    setIncome([...incomes, { id: uuidv4(), ...income }]);
  };
  const [expenses, setExpense] = useState([]);
  const addExpenseHandler = (expense) => {
    setExpense([...expenses, { id: uuidv4(), ...expense }]);
  };

  const expenseCategories = [
    { id: 1, name: "housing" },
    { id: 2, name: "transportation" },
    { id: 3, name: "food and supplies" },
    { id: 4, name: "utilities and bills" },
    { id: 5, name: "clothing" },
    { id: 6, name: "healthcare" },
    { id: 7, name: "insurance" },
    { id: 8, name: "personal" },
    { id: 9, name: "entertainment" },
  ];

  const removeIncomeHandler = (id) => {
    const newIncomeList = incomes.filter((income) => {
      return income.id !== id;
    });

    setIncome(newIncomeList);
  };

  const removeIncomeList = () => {
    setIncome([]);
  };

  const removeExpenseList = () => {
    setExpense([]);
  };

  const removeExpenseHandler = (id) => {
    const newExpenseList = expenses.filter((expense) => {
      return expense.id !== id;
    });

    setExpense(newExpenseList);
  };

  useEffect(() => {
    const retrieveIncome = JSON.parse(localStorage.getItem(INCOME_STORAGE_KEY));
    const retrieveExpense = JSON.parse(
      localStorage.getItem(EXPENSE_STORAGE_KEY)
    );
    const retrieveCurrency = JSON.parse(
      localStorage.getItem(CURRENCY_STORAGE_KEY)
    );
    if (retrieveIncome) {
      setIncome(retrieveIncome);
    }
    if (retrieveExpense) {
      setExpense(retrieveExpense);
    }
    if (retrieveCurrency) {
      setCurrency(retrieveCurrency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(INCOME_STORAGE_KEY, JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency));
  }, [currency]);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="modalOverlay">
      <div className="contentWrapper">
        <Header
          currency={currency}
          changeCurrencyHandler={changeCurrencyHandler}
        />
        <div className="flex layout">
          <div className="incomeWrapper">
            <Income
              addIncomeHandler={addIncomeHandler}
              currency={currency}
              incomes={incomes}
              removeIncomeHandler={removeIncomeHandler}
              removeIncomeList={removeIncomeList}
            />
            <Converter />
          </div>
          <div className="expenseWrapper">
            <Overview
              currency={currency}
              incomes={incomes}
              expenses={expenses}
            />
            <Expense
              addExpenseHandler={addExpenseHandler}
              expenseCategories={expenseCategories}
              expenses={expenses}
              currency={currency}
              removeExpenseHandler={removeExpenseHandler}
              removeExpenseList={removeExpenseList}
              openModal={openModal}
              closeModal={closeModal}
            />
          </div>
          <div className="dnone">
            <Categories
              expenses={expenses}
              currency={currency}
              expenseCategories={expenseCategories}
            />
          </div>
        </div>
        <div className="dblock">
          <Categories
            expenses={expenses}
            currency={currency}
            expenseCategories={expenseCategories}
          />
        </div>
      </div>

      {modal && (
        <Modal
          expenses={expenses}
          currency={currency}
          removeExpenseHandler={removeExpenseHandler}
          removeExpenseList={removeExpenseList}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
