"use client";
import { Todo } from "../../../lib/features/todoSlice";
import DeleteButton from "./DeleteButton";
import TodoItemTitle from "./TodoItemTitle";
import ToggleTodoButton from "./ToggleTodoButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({ id, text, completed }: Todo) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="   p-5 px-6    not-last:border-b-[0.5px] last:border-0 border-b-dark-hover-color dark:border-b-[#383a4e]  flex gap-x-5 items-center"
    >
      <div {...listeners} className="cursor-grab">
        <svg width="16" height="16" fill="gray">
          <path d="M4 2h2v2H4zM10 2h2v2h-2zM4 7h2v2H4zM10 7h2v2h-2zM4 12h2v2H4zM10 12h2v2h-2z" />
        </svg>
      </div>

      <ToggleTodoButton completed={completed} id={id} />
      <div className=" pr-2 flex-1 group flex justify-between items-center">
        <TodoItemTitle checked={completed} text={text} />
        <DeleteButton id={id} moreStyl=" hidden group-hover:block " />
      </div>
    </li>
  );
}
