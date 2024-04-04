import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleClickOutside } from '../../helper'

const DigitalClock = () => {

  const dispatch = useDispatch();
  const containerRef = useRef()

  useEffect(() => {
    const cleanup = handleClickOutside(containerRef, dispatch, 'digitalClock');
    return cleanup;
  }, []);

  const [time, setTime] = useState(new Date())

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => {
      clearInterval(intervalId)
    }
  },[])

  function formatTime(){
    let hours = time.getHours() // here hour will show in military format i.e. 12(12 noon) 13pm(1 noon) 14pm(2 noon) etc
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    const meridiem = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12 || 12 //coonverting military format into 12-hour clock format

    return `${padZero(hours)}: ${padZero(minutes)}: ${padZero(seconds)}`
  }

  function padZero(number){
    // return number < 10 ? `0${number}` : number 
    return (number < 10 ? "0" : "") + number; 
  }

  return (
    <div className="main z-20">
      <div className="inner-main" ref={containerRef}>
        <div className="p-2 heading">
          <h1>Digital Clock</h1>
        </div>
        <div className="h w-full bg-white p-5 min-h-[150px] grid place-content-center rounded">
          
          <button className="text-2xl rounded" >{formatTime()}</button>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
