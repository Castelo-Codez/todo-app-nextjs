import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Todo = { id: string | number; text: string; completed: boolean };
interface IntialState {
  todos: Todo[];
  filter: string;
  todoText: string;
  reqPen: boolean;
}
const initialState: IntialState = {
  todos: [],
  filter: "all",
  todoText: "",
  reqPen: true,
};
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  let req = await fetch("/api/get-all-todos");
  let todos = await req.json();
  return todos;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ id, text, completed }: Todo) => {
    try {
      let newTodo = await axios.post("/api/addTodo", {
        id,
        completed,
        text,
      });
      if (newTodo.status === 200) {
        return {
          ...newTodo.data,
        };
      }
    } catch (err) {
      return err;
    }
  }
);
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }: { id: string | number; completed: boolean }) => {
    try {
      let toggleTodo = await axios.post(`/api/toggle-todo/${id}`, {
        completed,
      });
      if (toggleTodo.status == 200) {
        return {
          id,
          completed,
        };
      }
    } catch (err) {
      return err;
    }
  }
);
export const deletTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ id }: { id: string | number }) => {
    try {
      let toggleTodo = await axios.delete(`/api/deleteTodo/${id}`);
      if (toggleTodo.status == 200) {
        return {
          id,
        };
      }
    } catch (err) {
      return err;
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(addTodo.pending, (state, action) => {
      const newTodo = action.meta.arg;
      state.todos = [...state.todos, newTodo];
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      const { id } = action.meta.arg;
      state.todos = state.todos.filter((el: any) => {
        el.id !== id;
      });
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.reqPen = false;
      const newTodos = action.payload;
      state.todos = [...newTodos];
    });
    builder.addCase(toggleTodo.pending, (state, action) => {
      const { id } = action.meta.arg;
      state.todos = state.todos.map((el: any) => {
        if (el.id == id) {
          return { ...el, completed: !el.completed };
        } else {
          return el;
        }
      });
    });
    builder.addCase(toggleTodo.rejected, (state, action) => {
      const { id } = action.meta.arg;
      state.todos = state.todos.map((el: any) => {
        if (el.id == id) {
          return { ...el, completed: !el.completed };
        } else {
          return el;
        }
      });
    });
    builder.addCase(deletTodo.pending, (state, action) => {
      const { id } = action.meta.arg;
      state.todos = state.todos.filter((el: Todo) => el.id !== id);
    });
  },
});
