import React, { useEffect, useState } from "react";
import "./App.scss";

const Converter = () => {
  const BASE_URL = "https://api.exchangerate.host/latest";

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount = 1,
    fromAmount = 1;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function fromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function toAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const options = currencyOptions.map((option, i) => {
    return (
      <option key={i} value={option}>
        {option}
      </option>
    );
  });

  return (
    <div className="converterContainer">
      <h2>Money converter</h2>
      <div className="flex">
        <div className="converterWrapper">
          <div className="inputContainer">
            <label>Value</label>
            <input
              type="number"
              name="value"
              value={fromAmount}
              onChange={fromAmountChange}
            />
          </div>
          <div className="inputContainer">
            <label>Currency</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {options}
            </select>
          </div>
          <div className="inputContainer">
            <label>Label</label>
            <input
              type="number"
              name="value"
              value={toAmount}
              onChange={toAmountChange}
            />
          </div>
          <div className="inputContainer">
            <label>Currency</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {options}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Converter;
