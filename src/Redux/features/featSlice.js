import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calci: false,
  timer: false,
  clock: false,
  todos: false,
  calendar: false,
  tictac: false,
  expense_tracker: false,
  weather: false,
  quotes: false,
  recipes: false,
  notes: false,
  colors: false,
  digitalClock: false,
};

const featSlice = createSlice({
  name: "feat",
  initialState,
  reducers: {

    showModal(state, action) {
      if (action.payload === "calci") state.calci = true;
      if (action.payload === "clock") state.clock = true;
      if (action.payload === "timer") state.timer = true;
      if (action.payload === "todos") state.todos = true;
      if (action.payload === "calendar") state.calendar = true;
      if (action.payload === "tictac") state.tictac = true;
      if (action.payload === "expense_tracker") state.expense_tracker = true;
      if (action.payload === "weather") state.weather = true;
      if (action.payload === "quotes") state.quotes = true;
      if (action.payload === "recipes") state.recipes = true;
      if (action.payload === "notes") state.notes = true;
      if (action.payload === "colors") state.colors = true;
      if (action.payload === "digitalClock") state.digitalClock = true;
    },
    
    hideModal(state, action) {
      if (action.payload === "calci") state.calci = false;
      if (action.payload === "clock") state.clock = false;
      if (action.payload === "timer") state.timer = false;
      if (action.payload === "todos") state.todos = false;
      if (action.payload === "calendar") state.calendar = false;
      if (action.payload === "tictac") state.tictac = false;  
      if (action.payload === "expense_tracker") state.expense_tracker = false;  
      if (action.payload === "weather") state.weather = false;
      if (action.payload === "quotes") state.quotes = false;
      if (action.payload === "recipes") state.recipes = false;
      if (action.payload === "notes") state.notes = false;
      if (action.payload === "colors") state.colors = false;
      if (action.payload === "digitalClock") state.digitalClock = false;
    },

  },
});

export const { showModal, hideModal } = featSlice.actions;
export default featSlice.reducer;
