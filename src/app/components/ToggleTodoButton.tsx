import { Todo, toggleTodo } from "../../../lib/features/todoSlice";
import { useAppDispatch } from "../../../lib/hooks";

import CheckCircle from "./CheckCircleStyle";

export default function ToggleTodoButton({
  id,
  completed,
}: {
  id: string | number;
  completed: boolean;
}) {
  const appDis = useAppDispatch();
  function toggle() {
    appDis(
      toggleTodo({
        id,
        completed,
      })
    );
  }
  return (
    <button onClick={toggle}>
      <CheckCircle job={completed ? "checked" : ""} />
    </button>
  );
}
