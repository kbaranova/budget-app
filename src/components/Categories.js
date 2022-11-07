import ChartStart from "./ChartStart";
import React, { useState } from "react";
import "./App.scss";

const Categories = ({ expenses, currency, expenseCategories }) => {
  const [checked, setChecked] = useState({});

  let totalCategoryNumber = 0;
  const checkCategory = (e, id) => {
    let _checked = { ...checked };
    _checked[id] = e.target.checked;
    setChecked(_checked);
  };
  let dataCategory = [];
  const categoryExpenses = expenseCategories.map((element, i) => {
    const newCategory =
      element["name"].charAt(0).toUpperCase() + element["name"].slice(1);
    let totalExpenseCategory = 0;
    expenses.map((el) => {
      if (el.category === newCategory) {
        totalExpenseCategory += Number(el.number);
      }
    });
    var catChecked = checked[element["id"]] == null || checked[element["id"]];
    if (catChecked) {
      totalCategoryNumber += totalExpenseCategory;
      dataCategory.push(totalExpenseCategory);
    } else {
      dataCategory.push(0);
    }
    return (
      <div key={i} className="checkWrapper">
        <input
          type="checkbox"
          onChange={(e) => checkCategory(e, element["id"])}
          checked={catChecked}
        />
        <label>{newCategory}</label>
      </div>
    );
  });

  return (
    <div className="categoryContainer">
      <h2>Categories</h2>
      <div className="categoryFlex">
        <div className="categoryWrapper">
          <div className="canvasCategoryContainer">
            <ChartStart data={dataCategory} />
          </div>
          <div className="chartNumber">
            <div>{totalCategoryNumber}</div>
            <div>{currency}</div>
          </div>
        </div>
        <div className="checkContent">
          <h3>Sort by Categories</h3>
          <div className="categoryGrid">{categoryExpenses}</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
