

import CheckCircle from "./CheckCircleStyle";

export default function MainInput() {
  return (
    <>
      <div className=" p-5 pl-7 gap-x-4 bg-light-card-bg dark:bg-dark-card-bg flex items-center rounded-md shadow-md">
        <CheckCircle job="addTodo" />
        <input
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
