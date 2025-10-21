import { Todo } from "../../../lib/features/todoSlice";
import DeleteButton from "./DeleteButton";
import TodoItemTitle from "./TodoItemTitle";
import ToggleTodoButton from "./ToggleTodoButton";

export default function TodoItem({ id, text, completed }: Todo) {
  return (
    <li
  
      className="  p-5 px-6    not-last:border-b-[0.5px] last:border-0 border-b-dark-hover-color dark:border-b-[#383a4e]  flex gap-x-5 items-center"
    >
      <ToggleTodoButton completed={completed} id={id} />
      <div className=" pr-2 flex-1 group flex justify-between items-center">
        <TodoItemTitle checked={completed} text={text} />
        <DeleteButton id={id} moreStyl=" hidden group-hover:block " />
      </div>
    </li>
  );
}
