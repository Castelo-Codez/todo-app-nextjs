import ThemeSwitcher from "./ThemeSwitcher";

export function Header() {
  return (
    <header>
      <div className="  flex justify-between items-center py-3">
        <section>
          <h1 className=" text-[2rem] md:text-[3rem] font-[500] text-white">
            TODO
          </h1>
        </section>
        <section>
          <ThemeSwitcher />
        </section>
      </div>
    </header>
  );
}
