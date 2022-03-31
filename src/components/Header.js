import React from "react";
import { ReactComponent as Logo } from "../img/Logo.svg";
import "./App.scss";

const Header = (props) => {
  const currency = {
    "U.S. Dollar": "USD",
    Euro: "EUR",
    "British Pound": "GBP",
    "Swiss Franc": "CHF",
    "Canadian Dollar": "CAD",
    "Japanese Yen": "JPY",
  };
  const setCurrency = Object.entries(currency).map((cur, i) => {
    return (
      <option key={i} value={cur[1]}>
        {cur[0]}
      </option>
    );
  });

  const changeCurrency = (e) => {
    props.changeCurrencyHandler(e.target.value);
  };

  const current = new Date();
  const dateArr = current.toDateString().split(" ");
  const week = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(current);
  const weekArr = week.split(",");
  const date = `${dateArr[1]} ${dateArr[2]}, ${weekArr[0]}`;

  return (
    <div className="headerContainer">
      <div className="flex">
        <Logo className="imgSize" />
      </div>
      <div className="flex">
        <h1>Dashboard</h1>
      </div>
      <div className="flex dateWrapper">
        <h4>{date}</h4>
        <select onChange={changeCurrency} value={props.currency}>
          {setCurrency}
        </select>
      </div>
    </div>
  );
};

export default Header;
