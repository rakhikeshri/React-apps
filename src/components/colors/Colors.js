import React, { useState, useRef, useEffect } from "react";
import { hideModal } from "../../Redux/features/featSlice";
import { useDispatch } from "react-redux";
import { RiDoubleQuotesL } from "react-icons/ri";
import { handleClickOutside } from '../../helper'
import Values from "values.js";

const Colors = () => {

  const dispatch = useDispatch();
  const containerRef = useRef()

  const [color, setColor] = useState("blue");
  const [colors, setColors] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cleanup = handleClickOutside(containerRef, dispatch, 'quotes');
    return cleanup;
  }, []);


  // fetching quote
  function generateColors() {

    try {
      let colors = new Values(color).all(5);

      console.log('colors', colors)
      // setList(colors);
      // setError(false);
    } catch (error) {
      // console.log(error);
      // setError(true);
    }

  }

  return (
    <div className="main z-20">
      <div className="inner-main" ref={containerRef}>
        <div className="p-2 heading">
          <h1>Colors</h1>
          {/* <button onClick={() => dispatch(hideModal("quotes"))}>x</button> */}
        </div>
        <div className="h w-full bg-white p-5 min-h-[150px] grid place-content-center rounded">

          {/* {
            quoteData.quote === '' ? null : (
              <div className=" mb-4 relative bg-blue-200 pl-2 pr-5 py-5 rounded">
                <div className="flex gap-2 text-lg  mb-4">
                  <RiDoubleQuotesL className="h-fit" style={{ fontSize: '60px' }} />
                  <p className=" leading-normal text-justify ">
                    {quoteData.quote}
                  </p>
                </div>
                <p className="text-end ">
                  ~ {quoteData.author}
                </p>
              </div>
            )
          } */}
          <input onChange={(e) => setColor(e.target.value)} />
          <button className="button-generic rounded" onClick={() => generateColors(color)}>Generate colors</button>
        </div>
      </div>
    </div>
  );
};

export default Colors;
