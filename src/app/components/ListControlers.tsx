"use client";
import clsx from "clsx";
import { useAppDispatch } from "../../../lib/hooks";
import { changeFilter } from "../../../lib/store";


export default function ListControlers({
  filter,
  moreStyl,
}: {
  filter: string;
  moreStyl?: string;
}) {
  const appDisp = useAppDispatch();
  function newFilter(filter: string) {
    appDisp(changeFilter({ filter }));
  }


  return (
    <ul
      className={clsx(
        " tracking-normal p-3 rounded-md   bg-light-card-bg dark:bg-dark-card-bg flex items-center gap-x-4 justify-center",
        moreStyl
      )}
    >
      <li>
        <button
          onClick={() => newFilter("all")}
          className={clsx(
            " cursor-pointer",
            filter === "all"
              ? "text-light-active-color"
              : " text-gray-400 dark:text-dark-check-color"
          )}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => newFilter("active")}
          className={clsx(
            " cursor-pointer",
            filter === "active"
              ? "text-light-active-color"
              : " text-gray-400 dark:text-dark-check-color"
          )}
        >
          Actice
        </button>
      </li>
      <li>
        <button
          onClick={() => newFilter("completed")}
          className={clsx(
            " cursor-pointer",
            filter === "completed"
              ? "text-light-active-color"
              : " text-gray-400 dark:text-dark-check-color"
          )}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
