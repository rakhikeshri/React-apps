import React, { useContext } from 'react'
import { ExpenseContext } from '../Contexts/ExpenseContext'
import '../expense.css'

const Form = () => {

    const { entries, addExpenses, handleChange } = useContext(ExpenseContext)

    return (
        <div className='px-2 pb-2'>

            <h2 className='text-lg' style={{marginBottom:'8px'}} >add your expenses here.</h2>

            <form onSubmit={addExpenses} >
                <input className='p-2 w-full expense-inputs'  type="text" placeholder='enter title' onChange={handleChange} value={entries.title} name='title' />
                <br />
                <input className='p-2 w-full expense-inputs' type="text" placeholder='enter amount' onChange={handleChange} value={entries.amount} name='amount' />
                <br />
                <input type='submit' value='Add' className='submit-btn p-2 font-bold cursor-pointer w-full' />
            </form>

        </div>
    )

}

export default Form