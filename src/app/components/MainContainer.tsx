import { Header } from "./Header";
import MainInput from "./MainInput";
import TodoItems from "./TodoItems";

export default function MainContainer() {
  return (
    <main className=" absolute top-[20%]  sm:top-[80px] tracking-[1rem] w-full left-0">
      <div className="container">
        <Header />
        <section className="mt-3">
          <MainInput />
          <TodoItems />
        </section>
      </div>
    </main>
  );
}
