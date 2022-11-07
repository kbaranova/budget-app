import ChartStart from "./ChartStart";
import React, { useState, useEffect } from "react";
import "./App.scss";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Overview = (props) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [dataExpenseArray, setExpenseDataArray] = useState([]);
  const calcTotalExpense = () => {
    let totalExpense = 0;
    const dataExpenseArray = [];
    props.expenses.map((expense) => {
      totalExpense += Number(expense.number);
      dataExpenseArray.push(Number(expense.number));
    });
    setTotalExpense(totalExpense);
    setExpenseDataArray(dataExpenseArray);
  };

  const [totalIncome, setTotalIncome] = useState(0);
  const [dataIncomeArray, setIncomeDataArray] = useState([]);
  const calcTotalIncome = () => {
    let totalIncome = 0;
    const dataIncomeArray = [];
    props.incomes.map((income) => {
      totalIncome += Number(income.number);
      dataIncomeArray.push(Number(income.number));
    });
    setTotalIncome(totalIncome);
    setIncomeDataArray(dataIncomeArray);
  };
  let totalBudget = totalIncome - totalExpense;
  if (totalBudget < 0) {
    totalBudget = 0;
  }
  // else if (totalExpense === 0) {
  //   totalBudget = totalIncome;
  // }
  const budgetArray = [totalExpense, totalBudget];

  useEffect(() => {
    calcTotalExpense();
  }, [props.expenses]);

  useEffect(() => {
    calcTotalIncome();
  }, [props.incomes]);

  return (
    <div className="overviewContainer">
      <h2>Overview</h2>
      <div className="overviewWrapper flex">
        <div className="overviewItem">
          <h3>Income</h3>
          <div className="centerData">
            <div className="canvasOverviewContainer">
              <ChartStart data={dataIncomeArray} />
              <div className="chartNumber">
                {totalIncome}
                <br></br>
                {props.currency}
              </div>
            </div>
          </div>
        </div>
        <div className="overviewItem">
          <h3>Expense</h3>
          <div className="centerData">
            <div className="canvasOverviewContainer">
              <ChartStart data={dataExpenseArray} />
              <div className="chartNumber">
                <div>{totalExpense}</div>
                <div>{props.currency}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="overviewItem">
          <h3>Budget</h3>
          <div className="centerData">
            <div className="canvasOverviewContainer">
              <ChartStart data={budgetArray} />
              <div className="chartNumber">
                <div>{totalIncome - totalExpense}</div>
                <div>{props.currency}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
