import { useAppDispatch } from "../../../lib/hooks";
import { toggleTodo } from "../../../lib/store";
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
    appDis(toggleTodo({ id }));
  }
  return (
    <button onClick={toggle}>
      <CheckCircle job={completed ? "checked" : ""} />
    </button>
  );
}
