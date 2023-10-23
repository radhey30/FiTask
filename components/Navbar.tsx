"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const path = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <nav className="relative px-6 py-8 flex flex-col gap-10 min-[380px]:flex-row min-[380px]:gap-0 justify-center items-center max-w-6xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-bold text-[#000000b7] grow font-serif">
        FiTask
      </h1>
      {session?.user ? (
        <div className="flex gap-3 items-center">
          <Link
            href="/new"
            className={`bg-white text-black p-2 px-5 rounded-full hover:bg-black hover:text-white font-black smooth cursor-pointer text-sm sm:text-base ${
              path === "/new" ? "hidden" : ""
            }`}
          >
            New Task
          </Link>
          <button type="submit" className="button" onClick={signOut}>
            Sign Out
          </button>
          <Image
            src={session?.user.image}
            alt="profile"
            width={35}
            height={35}
            className="rounded-full"
          />
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider: any) => {
              return (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="button"
                >
                  Sign In
                </button>
              );
            })}
        </>
      )}
    </nav>
  );
};

export default Navbar;
