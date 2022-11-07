import React from "react";
import "./App.scss";
import IncomeList from "./IncomeList";

class Income extends React.Component {
  state = {
    label: "",
    number: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.label === "" || this.state.number === "") {
      alert("Fill all the fields!");
      return;
    }
    this.props.addIncomeHandler(this.state);
    this.setState({ label: "", number: "" });
  };

  render() {
    return (
      <div className="incomeContainer">
        <h2>Income</h2>
        <h3>Add Income</h3>
        <form onSubmit={this.add}>
          <div className="flex inputWrapper">
            <div className="inputContainer">
              <label>Label</label>
              <input
                type="text"
                name="name"
                placeholder="Ex. Salary"
                value={this.state.label}
                onChange={(e) => this.setState({ label: e.target.value })}
              />
            </div>
            <div className="inputContainer">
              <label>Value</label>
              <input
                type="number"
                name="number"
                placeholder="Ex. 5000"
                value={this.state.number}
                onChange={(e) => this.setState({ number: e.target.value })}
              />
            </div>
            <button className="addButton">+</button>
          </div>
        </form>
        <IncomeList
          currency={this.props.currency}
          incomes={this.props.incomes}
          removeIncomeHandler={this.props.removeIncomeHandler}
          removeIncomeList={this.props.removeIncomeList}
        />
      </div>
    );
  }
}

export default Income;
