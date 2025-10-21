"use client";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { setNewTextTodo } from "../../../lib/store";
import AddTodoButton from "./AddTodoButton";
import CheckCircle from "./CheckCircleStyle";

export default function MainInput() {
  const { todoText } = useAppSelector((state) => state.todos);
  const appDisp = useAppDispatch();
  return (
    <>
      <div className=" p-5 pl-7 gap-x-4 bg-light-card-bg dark:bg-dark-card-bg flex items-center rounded-md shadow-md">
        <AddTodoButton />
        <input
          value={todoText}
          onChange={(e) => appDisp(setNewTextTodo({ newText: e.target.value }))}
          type="text"
          className=" flex-1 text-[1.3rem] caret-light-active-color tracking-normal focus-within:outline-none text-dark-bg-color dark:text-light-check-color"
          placeholder="Create new todo..."
          id="mainInput"
          aria-label="add todos"
        />
      </div>
    </>
  );
}
