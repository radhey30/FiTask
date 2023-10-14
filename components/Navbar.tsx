"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="relative px-6 py-8 flex flex-col gap-10 min-[380px]:flex-row min-[380px]:gap-0 justify-center items-center max-w-6xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-bold text-[#000000b7] grow font-serif">
        FiTask
      </h1>
      <Link
        href="/new"
        className={`bg-white text-black p-2 px-5 rounded-full hover:bg-black hover:text-white font-black smooth cursor-pointer text-sm sm:text-base ${
          path === "/new" ? "hidden" : ""
        }`}
      >
        New Task
      </Link>
    </nav>
  );
};

export default Navbar;
