import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./features/todoSlice";

export const Store = () => {
  return configureStore({
    reducer: {
      todos: todoSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof Store>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

