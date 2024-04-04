import React, { useContext } from 'react'
import { ExpenseContext } from '../Contexts/ExpenseContext'

const Header = () => {

    const { income, expense, balance } = useContext(ExpenseContext)

    return (
        <div className=''>
            <h2 className='text-lg' style={{marginBottom:'8px'}}>Your Balance: <span className='text-gray-500 font-medium'>Rs.{balance}/-</span></h2>
            <div className=' grid grid-cols-2 mb-5'>
                <div className='flex text-base w-full p-2' style={{backgroundColor:'#e6ecfc', marginBottom:"4px"}}>
                    <h2 className=''>Income :&nbsp;</h2>
                    <h3 className='font-medium text-green-500' style={{ color: 'green' }}>
                        {
                            income && `${income}/-`
                        }
                    </h3>
                </div>
                <div className='flex text-base w-full p-2' style={{backgroundColor:'#e6ecfc'}}>
                    <h2 className=''>Expense:&nbsp;</h2>
                    <h3 className='font-medium text-red-500' style={{ color: 'red' }}>
                        {
                            expense &&  `${expense}/-`
                        }
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Header