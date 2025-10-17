export default function CheckCircle({
  job,
  changeState,
}: {
  job?: string;
  changeState?: VoidFunction;
}) {
  if (job === "addTodo") {
    return (
      <div
        className="w-[22px] h-[22px]  rounded-full border cursor-pointer  border-light-shadow-color dark:border-light-text-color "
        onClick={changeState}
      ></div>
    );
  }
  if (job === "checked") {
    return (
      <div>
        <div
          onClick={changeState}
          className="w-[24px] h-[24px]  rounded-full border cursor-pointer  flex justify-center  items-center border-light-shadow-color dark:border-light-text-color checkLinearGradient "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={changeState}
        className="w-[24px] h-[24px]  rounded-full border cursor-pointer  flex justify-center group items-center border-light-shadow-color dark:border-light-text-color hover:checkLinearGradient"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" hidden group-hover:block"
          width="11"
          height="9"
        >
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </div>
    </div>
  );
}
