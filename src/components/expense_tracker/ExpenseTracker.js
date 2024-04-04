import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import History from './components/History';
import Form from './components/Form';
import { ExpenseContext } from './Contexts/ExpenseContext';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../Redux/features/featSlice';

const getLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem('expenseData'));
  return savedData || { history: [], income: 0, expense: 0, balance: 0 };
};

function ExpenseTracker() {
  const [entries, setEntries] = useState({ title: '', amount: '' });
  const [data, setData] = useState(getLocalStorage);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntries({ ...entries, [name]: value });
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const amount = Number(entries.amount);
    const newEntry = { ...entries };
    setData((prevData) => ({
      ...prevData,
      history: [...prevData.history, newEntry],
      income: prevData.income + (amount > 0 ? amount : 0),
      expense: prevData.expense + (amount < 0 ? amount : 0),
      balance: prevData.balance + amount,
    }));
    setEntries({ title: '', amount: '' });
  };

  useEffect(() => {
    localStorage.setItem('expenseData', JSON.stringify(data));
  }, [data]);

  return (
    <div className="main z-20 border">
      <div className="inner-main">
        <div className="pb-2 heading">
          <h1 className="font-bold text-lg">Expense Tracker</h1>
          <button onClick={() => dispatch(hideModal('expense_tracker'))}>X</button>
        </div>

        <div className="bg-white min-w-[320px] p-2">
          <ExpenseContext.Provider
            value={{
              ...data,
              setData,
              entries,
              setEntries,
              addExpenses,
              handleChange,
            }}
          >
            <Header />
            <History />
            <Form />
          </ExpenseContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;






























// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import History from './components/History';
// import Form from './components/Form';
// import { ExpenseContext } from './Contexts/ExpenseContext';
// import { useDispatch } from 'react-redux';
// import { hideModal } from '../../Redux/features/featSlice';

// const getLocalStorage = () => {
//   const savedData = JSON.parse(localStorage.getItem('expenseData'));
//   if (savedData) {
//     return savedData
//   }
// };

// function ExpenseTracker() {
 
//   const { 
//     history:historyLocalStorage,
//     income:incomeLocalStorage,
//     expense:expenseLocalStorage,
//     balance:balanceLocalStorage
//   } = getLocalStorage()

//   const [history, setHistory] = useState(historyLocalStorage || []);
//   const [entries, setEntries] = useState({
//     title: '',
//     amount: '',
//   });
//   const [income, setIncome] = useState(incomeLocalStorage || 0);
//   const [expense, setExpense] = useState(expenseLocalStorage || 0);
//   const [balance, setBalance] = useState(balanceLocalStorage || 0);

//   const dispatch = useDispatch();


//   useEffect(() => {
//     // Save data to localStorage whenever history, income, expense, or balance changes
//     localStorage.setItem(
//       'expenseData',
//       JSON.stringify({ history, income, expense, balance })
//     );
//   }, [history, income, expense, balance]); // Dependency array ensures this effect runs whenever any of these state variables change

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEntries({
//       ...entries,
//       [name]: value,
//     });
//   };

//   const addExpenses = (e) => {
//     e.preventDefault();

//     //updating the history
//     setHistory([...history, entries]);

//     //updating expense/income
//     let amount = Number(entries.amount);
//     amount > 0 ? setIncome(income + amount) : setExpense(expense + amount);

//     //updating overall balance
//     setBalance(balance + amount);

//     // empty the input values
//     setEntries({
//       title: '',
//       amount: '',
//     });
//   };

//   return (
//     <div className="main z-20 border">
//       <div className="inner-main">
//         <div className="pb-2 heading">
//           <h1 className="font-bold text-lg">Expense Tracker</h1>
//           <button onClick={() => dispatch(hideModal('expense_tracker'))}>X</button>
//         </div>

//         <div className="bg-white min-w-[320px] p-2">
//           <ExpenseContext.Provider
//             value={{
//               history,
//               setHistory,
//               entries,
//               setEntries,
//               income,
//               setIncome,
//               expense,
//               setExpense,
//               balance,
//               setBalance,
//               addExpenses,
//               handleChange,
//             }}
//           >
//             <Header />
//             <History />
//             <Form />
//           </ExpenseContext.Provider>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExpenseTracker;
