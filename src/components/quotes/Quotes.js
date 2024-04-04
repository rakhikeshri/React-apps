import React, { useState, useRef, useEffect } from "react";
import { hideModal } from "../../Redux/features/featSlice";
import { useDispatch } from "react-redux";
import { RiDoubleQuotesL } from "react-icons/ri";
import { handleClickOutside } from '../../helper'

const Quotes = () => {

  const dispatch = useDispatch();
  const containerRef = useRef()

  useEffect(() => {
    const cleanup = handleClickOutside(containerRef, dispatch, 'quotes');
    return cleanup;
  }, []);

  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: ''
  })

  // fetching quote
  function generateQuotes() {
    fetch('https://api.quotable.io/quotes/random')
      .then(res => res.json())
      .then(data => {
        const { content, author } = data[0]; // Destructure content and author directly from data
        setQuoteData({ ...quoteData, quote: content, author });
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }

  return (
    <div className="main z-20">
      <div className="inner-main" ref={containerRef}>
        <div className="p-2 heading">
          <h1>Quotes</h1>
          {/* <button onClick={() => dispatch(hideModal("quotes"))}>x</button> */}
        </div>
        <div className="h w-full bg-white p-5 min-h-[150px] grid place-content-center rounded">

          {
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
          }
          <button className="button-generic rounded" onClick={() => generateQuotes()}>Generate random quotes</button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
