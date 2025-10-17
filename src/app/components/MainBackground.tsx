import Image from "next/image";

export default function MainBackground() {
  return (
    <section className="w-full">
      <section className="hidden  dark:block">
        <section className=" w-full  hidden sm:block ">
          <Image
            width={4000}
            height={100}
            src={"/images/bg-desktop-dark.jpg"}
            alt="main background dark mode"
          />
        </section>
        <section className="   w-full  sm:hidden ">
          <Image
            width={4000}
            height={100}
            src={"/images/bg-mobile-dark.jpg"}
            alt="main background dark mode"
          />
        </section>
      </section>
      <section className="  dark:hidden">
        <section className=" w-full  hidden sm:block ">
          <Image
            className=" w-full"
            width={4000}
            height={100}
            src={"/images/bg-desktop-light.jpg"}
            alt="main background light mode"
          />
        </section>
        <section className="   w-full  sm:hidden ">
          <Image
            className=" w-full"
            width={4000}
            height={100}
            src={"/images/bg-mobile-light.jpg"}
            alt="main background light mode"
          />
        </section>
      </section>
    </section>
  );
}
