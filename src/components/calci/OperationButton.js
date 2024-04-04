import React from 'react'
import { ACTIONS } from './Calci'

const OperationButton = ({ dispatch, operation }) => {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload : { operation } })} className="p-4 bg-blue-300 text-xl hover:bg-blue-400">{operation}</button>
    )
}

export default OperationButton