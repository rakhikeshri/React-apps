import React from 'react'

export const Calendar_cell_weeks = ({children}) => {
  return (
    <div className='text-white border text-center text-sm font-medium p-2 flex justify-center items-center bg-blue-600'>
        {children}
    </div>
  )
}
export const Calendar_cell_days = ({children, month, year}) => {

  const currentDate = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  console.log('today date: ', currentDate)
  
  return (
    <div className={
    currentDate === children && currentMonth === month && currentYear === year ? 'border border-white text-center text-l font-medium h-10 flex justify-center items-center bg-blue-500':
    'border border-white text-center text-l font-medium h-10 flex justify-center items-center bg-blue-200'}>
        {children}
    </div>
  )
}
