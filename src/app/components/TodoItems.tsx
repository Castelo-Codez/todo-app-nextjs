"use client";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import ListControlers from "./ListControlers";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { clearCompleted, fetchTodos } from "../../../lib/features/todoSlice";
import Skeleton from "./Skeleton";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrangeTodos, setNewHasError } from "../../../lib/store";
import axios from "axios";
export default function TodoItems() {
  const store = useAppSelector((state) => state.todos);
  const { todos, filter, hasErr } = store;
  const appDisp = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    appDisp(fetchTodos());
  }, []);
  useEffect(() => {
    if (hasErr) {
      throw new Error("Something Went Wrong. Please Try Again Later");
    }
  }, [hasErr]);
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active) {
      if (active.id === over.id) {
        return;
      }
    }
    const getTaskPos = (id: string | number) => {
      return todos.findIndex((task) => id === task.id);
    };

    const originalPos = getTaskPos(active.id);
    const newPos = over?.id && getTaskPos(over.id);
    const newTodos = arrayMove(todos, originalPos, newPos as number);
    appDisp(arrangeTodos({ newTodos }));
    const re_order_req = await axios.post("/api/re-order-todos", {
      activeElId: active.id,
      overElId: over?.id,
      newPosOfActiveEl: newPos,
      newPosOfOverEl: originalPos,
    });
    if (re_order_req.data.errorCode) {
      appDisp(setNewHasError({ newHasErrorState: true }));
    }
  }
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
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
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
                  <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={todos}
                  >
                    {todos.map((el) => {
                      if (filter == "all") {
                        return <TodoItem key={el.id} {...el} />;
                      }
                      if (filter == "active" && !el.completed) {
                        return <TodoItem key={el.id} {...el} />;
                      }
                      if (filter == "completed" && el.completed) {
                        return <TodoItem key={el.id} {...el} />;
                      }
                    })}
                  </SortableContext>
                )}
              </ul>
            </DndContext>
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
              <ListControlers
                moreStyl="mt-7 sm:hidden absolute w-full"
                filter={filter}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
