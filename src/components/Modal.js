import ExpenseList from "./ExpenseList";

const Modal = (props) => {
  return (
    <div className="modalContainer">
      <div className="modalWrapper">
        <ExpenseList
          expenses={props.expenses}
          currency={props.currency}
          removeExpenseHandler={props.removeExpenseHandler}
          removeExpenseList={props.removeExpenseList}
          closeModal={props.closeModal}
        />
      </div>
    </div>
  );
};

export default Modal;
