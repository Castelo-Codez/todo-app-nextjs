"use client";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { setNewTextTodo } from "../../../lib/store";

import CheckCircle from "./CheckCircleStyle";
import { addTodo } from "../../../lib/features/todoSlice";

export default function AddTodoButton() {
  const appDisp = useAppDispatch();
  const { todoText } = useAppSelector((state) => state.todos);

  function setNewTodo() {
    if (todoText == "") {
      return;
    }
    appDisp(
      addTodo({
        id: nanoid(),
        text: todoText,
        completed: false,
      })
    );
    setTimeout(() => {
      appDisp(setNewTextTodo({ newText: "" }));
    });
  }
  return (
    <button onClick={setNewTodo}>
      <CheckCircle job="addTodo" />
    </button>
  );
}
