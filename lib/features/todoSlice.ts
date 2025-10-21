import { createSlice } from "@reduxjs/toolkit";
export type Todo = { id: string | number; text: string; completed: boolean };
interface IntialState {
  todos: Todo[];
  filter: string;
  todoText: string;
}

const initialState: IntialState = {
  todos: [],
  filter: "all",
  todoText: "",
};
export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(
      state: {
        todos: Todo[];
      },
      action: {
        payload: Todo;
      }
    ) {
      state.todos = [...state.todos, { ...action.payload, completed: false }];
    },
    toggleTodo(state: any, action: { payload: { id: string | number } }) {
      state.todos = state.todos.map((el: any) => {
        if (el.id == action.payload.id) {
          return { ...el, completed: !el.completed };
        } else {
          return el;
        }
      });
    },
    deleteTodo(state: any, action: { payload: { id: string | number } }) {
      state.todos = state.todos.filter(
        (el: Todo) => el.id !== action.payload.id
      );
    },
    changeFilter(state, action: { payload: { filter: string } }) {
      state.filter = action.payload.filter;
    },
    setNewTextTodo(state, action: { payload: { newText: string } }) {
      state.todoText = action.payload.newText;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((el) => !el.completed);
    },
  },
});
