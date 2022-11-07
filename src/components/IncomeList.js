import React, { useRef } from "react";
import "./App.scss";

const IncomeList = (props) => {
  const deleteIncome = (id) => {
    props.removeIncomeHandler(id);
  };

  const renderIncomeList = props.incomes.map((income) => {
    const { id, label, number } = income;
    return (
      <tr key={id}>
        <th className="tableLabel">{label}</th>
        <td className="tableValue">
          {number}
          {props.currency}
        </td>
        <th className="tableButton">
          <button onClick={() => deleteIncome(id)}>-</button>
        </th>
      </tr>
    );
  });
  return (
    <>
      <div className="flex clearList">
        <div>
          <h3>Income Transactions</h3>
        </div>
        <div>
          <h4 className="clearButton" onClick={props.removeIncomeList}>
            Delete All
          </h4>
        </div>
      </div>
      <div className="tableIncomeWrapper">
        <table>
          <tbody>{renderIncomeList}</tbody>
        </table>
      </div>
    </>
  );
};

export default IncomeList;
