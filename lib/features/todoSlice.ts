import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

export type Todo = {
  id: string | number;
  text: string;
  completed: boolean;
  order: number;
};
interface IntialState {
  todos: Todo[];
  filter: string;
  todoText: string;
  reqPen: boolean;
  hasErr: boolean;
}
const initialState: IntialState = {
  todos: [],
  filter: "all",
  todoText: "",
  reqPen: true,
  hasErr: false,
};
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  let req = await axios.get("/api/get-all-todos");
  if (!req.data.errorCode) {
    let todos = await req.data;
    return todos;
  } else {
    throw new Error();
  }
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ id, text, completed, order }: Todo) => {
    let newTodo = await axios.post("/api/add-todo", {
      id,
      completed,
      text,
      order,
    });
    if (!newTodo.data.errorCode) {
      return {
        ...newTodo.data,
      };
    } else {
      throw new Error();
    }
  }
);
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }: { id: string | number; completed: boolean }) => {
    let toggleTodo = await axios.post(`/api/toggle-todo/${id}`, {
      completed,
    });
    if (!toggleTodo.data.errorCode) {
      return {
        id,
        completed,
      };
    } else {
      throw new Error();
    }
  }
);
export const deletTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ id }: { id: string | number }) => {
    let toggleTodo = await axios.delete(`/api/delete-todo/${id}`);
    if (!toggleTodo.data.errorCode) {
      return {
        id,
      };
    } else {
      throw new Error();
    }
  }
);
export const clearCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async () => {
    let clearCompletedTodos = await axios.delete("/api/clear-completed");
    if (!clearCompletedTodos.data.errorCode) {
      return true;
    } else {
      throw new Error();
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
    clearError(state, action: { payload: { status: boolean } }) {
      state.hasErr = action.payload.status;
    },
    arrangeTodos(state, action: { payload: { newTodos: Todo[] } }) {
      const { newTodos } = action.payload;
      state.todos = newTodos;
    },
    setNewHasError(state, action: { payload: { newHasErrorState: boolean } }) {
      state.hasErr = action.payload.newHasErrorState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.reqPen = false;
      const newTodos = action.payload;
      state.todos = [...newTodos].sort((a, b) => a.order - b.order);
    });

    builder.addCase(addTodo.pending, (state, action) => {
      const newTodo = action.meta.arg;
      state.todos = [...state.todos, newTodo];
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
    builder.addCase(deletTodo.pending, (state, action) => {
      const { id } = action.meta.arg;
      state.todos = state.todos.filter((el: Todo) => el.id !== id);
    });
    builder.addCase(clearCompleted.pending, (state, action) => {
      state.todos = state.todos.filter((el: Todo) => !el.completed);
    });
    builder.addMatcher(
      (action) => isRejected(action) && action.type.startsWith("todos"),
      (state, action) => {
        state.hasErr = true;
      }
    );
  },
});
