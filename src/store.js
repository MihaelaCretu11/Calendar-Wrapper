import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events/EventsSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
