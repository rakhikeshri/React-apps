import React, { useContext } from 'react'
import { ExpenseContext } from '../Contexts/ExpenseContext'

const History = () => {

    const { history, setData } = useContext(ExpenseContext)

    const clearHistory = () =>{
        const confirmed = window.confirm("Are you sure you want to clear the history?");
        if (confirmed) {
            localStorage.removeItem('expenseData');
            setData({ history: [], income: 0, expense: 0, balance: 0 });
        }
    }

    return (
        <div className='mb-5 bg-gray-100'>
            <h2 className='text-lg' style={{ marginBottom: '10px' }} >History  </h2>
            <div className='history-container'>
                {
                    history.length > 0 ? (
                        history.map((expense, idx) => {
                            return (
                                <div className={
                                    expense.amount > 0
                                        ? 'border-b-green-500 border-b flex justify-between mb-2 pb-1'
                                        : 'border-b border-b-red-500 flex justify-between mb-2 pb-1'
                                } key={idx}>
                                    <h3 className='font-medium text-gray-600'>{expense.title}</h3>
                                    <h3 className='font-medium text-gray-600'>{expense.amount > 0 ? '+' + expense.amount : expense.amount}</h3>
                                </div>
                            )
                        })) : <h2 className='no-history'>No prior history, Start managing your expenses.</h2>
                }
            </div>
            {
                history.length > 0 ? <button onClick={clearHistory} className='submit-btn p-2 font-bold cursor-pointer w-full'>Clear History</button> : null
            }
        </div>
    )
}


export default History