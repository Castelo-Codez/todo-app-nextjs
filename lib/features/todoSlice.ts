import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as { id: string; text: string; completed: boolean }[],
    filter: "all" as string,
  },
  reducers: {
    addTodo(state, action: { payload: { id: string; text: string } }) {
      console.log(action, state);
    },
  },
});


