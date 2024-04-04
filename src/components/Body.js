import React from "react";
import Calci from "./calci/Calci";
import Clock from "./clock/Clock";
import Timer from "./timer/Timer";
import Todos from "./todos/Todos";
import Calendar from "./calendar/Calendar";
import Tictac from "./tictac/Tictac";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../Redux/features/featSlice";
import {
  BsCalendarDayFill,
  BsCalculatorFill,
  BsFillClockFill,
  BsFillChatQuoteFill,
} from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { GoChecklist } from "react-icons/go";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { PiClockCountdownFill } from "react-icons/pi";
import { FcCurrencyExchange } from "react-icons/fc";
import { IoIosColorPalette } from "react-icons/io";
import { FaStickyNote, FaPaintBrush, FaLink } from "react-icons/fa";
import { GiSandSnake, GiCampCookingPot } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import tictacLogo from "../assets/tictac.png";
import ExpenseTracker from "./expense_tracker/ExpenseTracker";
import Weather from "./weather/Weather";
import Quotes from './quotes/Quotes'
import Recipes from './recipes/Recipes'
import Notes from "./notes/Notes";
import Colors from "./colors/Colors";
import DigitalClock from "./digitalClock/DigitalClock";

const Body = () => {
  const dispatch = useDispatch();

  const { calci, clock, timer, todos, calendar, tictac, expense_tracker, weather, quotes, recipes, notes, colors, digitalClock } = useSelector(
    (store) => store.feat
  );

  return (
    <div>
      <div className="btns-container grid grid-cols-4 gap-2 p-2 bg-slate-900">
        <div>
          <div className="btns" onClick={() => dispatch(showModal("calci"))}>
            <BsCalculatorFill className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("timer"))}>
            <RxLapTimer className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("digitalClock"))}>
            <BsFillClockFill className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("todos"))}>
            <GoChecklist className="text-4xl z-10 bg-black text-white rounded-md" />
            {/* todos with reminder */}
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("calendar"))}>
            <BsCalendarDayFill className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("tictac"))}>
            <img src={tictacLogo} className="w-12 z-10" alt="tictac" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("weather"))}>
            <TiWeatherPartlySunny className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("quotes"))}>
            <BsFillChatQuoteFill className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("calendar"))}>
            <PiClockCountdownFill className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("expense_tracker"))}>
            <FcCurrencyExchange className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("calendar"))}>
            <FaLink className="text-4xl z-10" />
            {/* url shortner */}
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("recipes"))}>
            <GiCampCookingPot className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("notes"))}>
            <FaStickyNote className="text-4xl z-10" />
          </div>
        </div>

        <div>
          <div className="btns" onClick={() => dispatch(showModal("calendar"))}>
            <GiSandSnake className="text-4xl z-10" />
          </div>
        </div>
        
        <div>
          <div className="btns" onClick={() => dispatch(showModal("colors"))}>
            <IoIosColorPalette className="text-4xl z-10" />
            {/* color picker */}
          </div>
        </div>
        <div>
          <div className="btns" onClick={() => dispatch(showModal("calendar"))}>
            <SiAboutdotme className="text-4xl z-10" />
          </div>
        </div>
      </div>

      {calci && <Calci />}

      {clock && <Clock />}

      {timer && <Timer />}

      {todos && <Todos />}

      {calendar && <Calendar />}

      {tictac && <Tictac />}

      {expense_tracker && <ExpenseTracker />}

      {weather && <Weather />}

      {quotes && <Quotes />}

      {recipes && <Recipes />}

      {notes && <Notes/>}

      {colors && <Colors/>}

      {digitalClock && <DigitalClock/>}
    </div>
  );
};

export default Body;
