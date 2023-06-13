import { configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./Api/NoteSlice";

export const store = configureStore({
  reducer: {
    notes: NoteSlice,
  },
});
