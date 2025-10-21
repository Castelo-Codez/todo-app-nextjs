import clsx from "clsx";

export default function TodoItemTitle({
  text,
  checked,
}: {
  text: string;
  checked: boolean;
}) {
  return (
    <p
      className={clsx(
        " text-[1.2rem]   tracking-normal  ",
        checked
          ? " line-through  text-light-inactive-color dark:text-dark-check-color"
          : " text-dark-card-bg dark:text-light-bg-color"
      )}
    >
      {text}
    </p>
  );
}
