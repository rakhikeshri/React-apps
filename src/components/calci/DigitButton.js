import React from 'react'
import { ACTIONS } from './Calci'

const DigitButton = ({ dispatch, digit }) => {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload : { digit } })} className="p-4 bg-blue-200 text-xl hover:bg-blue-400">{digit}</button>
    )
}

export default DigitButton