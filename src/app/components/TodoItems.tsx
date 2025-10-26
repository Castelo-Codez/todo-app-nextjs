"use client";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { clearCompleted } from "../../../lib/store";
import ListControlers from "./ListControlers";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../../../lib/features/todoSlice";
import Skeleton from "./Skeleton";
export default function TodoItems() {
  const store = useAppSelector((state) => state.todos);
  const { todos, filter } = store;
  const appDisp = useAppDispatch();
  useEffect(() => {
    appDisp(fetchTodos());
  }, []);
  return (
    <>
      <div
        className={clsx(
          " mt-5  rounded-md relative  w-full bg-light-card-bg dark:bg-dark-card-bg",
          todos.length <= 0 ? "min-h-[200px]" : ""
        )}
      >
        {store.reqPen ? (
          <Skeleton />
        ) : !store.reqPen ? (
          <>
            <ul aria-label="todo items list" role="list">
              {todos.length <= 0 ? (
                <div className=" absolute top-2/4 flex flex-col justify-center items-center gap-y-3 -translate-y-2/4 left-2/4 -translate-x-2/4 ">
                  <svg
                    width="90px"
                    height="90px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        className=" fill-dark-card-bg  dark:fill-light-card-bg"
                        d="M128 384v448h768V384H128zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32zm64-128h704v64H160zm96-128h512v64H256z"
                      ></path>
                    </g>
                  </svg>
                  <p className=" tracking-normal text-[1.1rem]  text-center capitalize  ">
                    there is not todos to show
                  </p>
                </div>
              ) : (
                todos.map((el) => {
                  if (filter == "all") {
                    return <TodoItem key={el.id} {...el} />;
                  }
                  if (filter == "active" && !el.completed) {
                    return <TodoItem key={el.id} {...el} />;
                  }
                  if (filter == "completed" && el.completed) {
                    return <TodoItem key={el.id} {...el} />;
                  }
                })
              )}
            </ul>
            {todos.length > 0 && (
              <div className=" p-2 px-5 border-t-[0.5px]  border-t-dark-hover-color dark:border-t-[#383a4e]  text-gray-400 text-[0.82rem]  tracking-normal flex items-center  justify-between dark:text-dark-check-color">
                <p className="    ">
                  {(filter === "all"
                    ? todos.length
                    : filter === "completed"
                    ? todos.filter((el) => el.completed).length
                    : todos.filter((el) => !el.completed).length) +
                    ` items left`}
                </p>
                <ListControlers moreStyl="hidden sm:flex" filter={filter} />
                <button
                  className=" cursor-pointer"
                  onClick={() => {
                    appDisp(clearCompleted());
                  }}
                >
                  Clear Completed
                </button>
              </div>
            )}
            {todos.length > 0 && (
              <ListControlers moreStyl="mt-7 sm:hidden absolute w-full" filter={filter} />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

