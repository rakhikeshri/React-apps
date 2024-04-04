import React, { useReducer, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaBackspace } from "react-icons/fa";
import { hideModal } from "../../Redux/features/featSlice";
import DigitButton from "./DigitButton";
import OperationButton from './OperationButton'
import { handleClickOutside } from '../../helper'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {

    case ACTIONS.ADD_DIGIT:

      if(state.overwrite){
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false
        }
      }

      if (payload.digit === '0' && state.currOperand === '0') return state
      if (payload.digit === '.' && state.currOperand.includes('.')) return state

      return {
        ...state,
        currOperand: `${state.currOperand || ''}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) return state

      // for overwriting the operation sign in calculation
      if (state.currOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      // if prevOperand is empty then move curOperand value to the prevOperand 
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: null
        }
      }

      // default behavior, if prev and curr operand have values then calculat using evaluate function
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currOperand: null
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVALUATE:
      if (state.currOperand == null || state.prevOperand == null || state.operation == null) return state

      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        currOperand: evaluate(state)
      }
  }

}

function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand)
  const curr = parseFloat(currOperand)

  // if any of these doesn't exist just return an empty string cz we don't have any calculation to do
  if (isNaN(prev) || isNaN(curr)) return ''

  let result = ''

  switch (operation) {
    case '+':
      result = prev + curr
      break
    case '-':
      result = prev - curr
      break
    case '×':
      result = prev * curr
      break
    case '÷':
      result = prev / curr
      break
    case '%':
      result = prev % curr
      break
  }

  return result.toString()

}

const Calci = () => {

  const dispatchRedux = useDispatch(); //for redux
  const [{ prevOperand, currOperand, operation }, dispatch] = useReducer(reducer, {})
  const containerRef = useRef()

  useEffect(() => {
    const cleanup = handleClickOutside(containerRef, dispatchRedux, 'calci');
    return cleanup;
  }, []);

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (!containerRef.current || !containerRef.current.contains(e.target)) {
  //       dispatchRedux(hideModal("calci"))
  //     }
  //   }
  
  //   document.addEventListener('mousedown', handler)
  
  //   return () => {
  //     document.removeEventListener('mousedown', handler)
  //   }
  // }, [])
  
  return (
    <div className="main z-20">
      <div className="inner-main" ref={containerRef} >
        <div className="p-2 heading">
          <h1>Calculator</h1>
          {/* <button onClick={() => dispatchRedux(hideModal("calci"))}>X</button> */}
        </div>

        <div className="p-2 grid place-content-center ">

          <div className="bg-blue-200 px-4 rounded min-w-[332px] text-right h-20 flex flex-col justify-around">
            <div className="prev-operand text-gray-500 text-lg">{prevOperand} {operation}</div>
            <div className="curr-operand text-xl">{currOperand}</div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-2">

            <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="p-4 bg-blue-300 text-xl col-span-2 hover:bg-blue-400">
              AC</button>

            <button className="p-4 bg-blue-300 text-xl grid place-content-center hover:bg-blue-400"><FaBackspace /></button>

            <OperationButton operation='%' dispatch={dispatch} />

            <DigitButton digit='7' dispatch={dispatch} />
            <DigitButton digit='8' dispatch={dispatch} />
            <DigitButton digit='9' dispatch={dispatch} />
            <OperationButton operation='÷' dispatch={dispatch} />

            <DigitButton digit='4' dispatch={dispatch} />
            <DigitButton digit='5' dispatch={dispatch} />
            <DigitButton digit='6' dispatch={dispatch} />
            <OperationButton operation='×' dispatch={dispatch} />

            <DigitButton digit='1' dispatch={dispatch} />
            <DigitButton digit='2' dispatch={dispatch} />
            <DigitButton digit='3' dispatch={dispatch} />
            <OperationButton operation='-' dispatch={dispatch} />

            <DigitButton digit='0' dispatch={dispatch} />
            <DigitButton digit='.' dispatch={dispatch} />

            <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="p-4 bg-blue-300 text-xl  hover:bg-blue-400">
              =</button>

            <OperationButton operation='+' dispatch={dispatch} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calci;
