import React, { useEffect, useState } from "react";

import { Calendar_cell_days, Calendar_cell_weeks } from "./Calendar_cell";
import { useDispatch } from "react-redux";

import { hideModal } from "../../Redux/features/featSlice";

const Calendar = () => {
  const dispatch = useDispatch();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  useEffect(() => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
  }, []);

  const goBack = () => {
    if (month === 0) {
      setYear((prevYear) => prevYear - 1);
      setMonth(11);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const goForward = () => {
    if (month === 11) {
      setYear((prevYear) => prevYear + 1);
      setMonth(0);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  let leftBoxesToFillAfterwards;
  const leftBoxesAfterLastDate = () => {
    const lastDayEndsOnWeek = lastDayOfMonth.getDay();
    if (lastDayEndsOnWeek < 6) {
      leftBoxesToFillAfterwards = 6 - lastDayEndsOnWeek;
    }
  };
  leftBoxesAfterLastDate();

  return (
    <div className="main z-20">
      <div className="flex flex-col gap-2 justify-center items-center inner-main">
        <div className="flex justify-between items-center text-white w-full heading">
          <h1>Calendar</h1>
          <button onClick={() => dispatch(hideModal("calendar"))}>x</button>
        </div>
        <div className="grid grid-cols-7 w-80 ">
          <div
            onClick={goBack}
            className="border bg-blue-400 hover:bg-blue-200 hover:text-black text-white col-span-2 text-center text-l font-medium h-10 flex justify-center items-center cursor-pointer"
          >
            {"<<"}
          </div>

          <div className="border bg-blue-600 text-white col-span-3 text-center text-sm font-medium h-10 flex justify-center items-center cursor-pointer">
            {year} {months[month]}
          </div>

          <div
            onClick={goForward}
            className="border bg-blue-400 text-white hover:bg-blue-200 hover:text-black col-span-2 text-center text-l font-medium h-10 flex justify-center items-center cursor-pointer"
          >
            {">>"}
          </div>

          {days.map((day, idx) => (
            <Calendar_cell_weeks children={day} key={idx} />
          ))}

          {/* filling left boxes before day 1 */}
          {Array.from({ length: firstDayOfMonth.getDay() }).map((_, idx) => {
            return <Calendar_cell_days children={""} key={idx} />;
          })}

          {/* filling actual dates from first day to last day*/}
          {Array.from({ length: lastDayOfMonth.getDate() }).map((_, index) => {
            //// here underscore means we're ignoring that paramaeter, the first parameter is the single element of the iterable array, and second param is the index
            const date = index + 1;
            return (
              <Calendar_cell_days
                children={date}
                key={date}
                month={month}
                year={year}
              />
            );
          })}

          {/* filling left boxes after last day*/}
          {Array.from({ length: leftBoxesToFillAfterwards }).map((_, idx) => {
            return <Calendar_cell_days children={""} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
