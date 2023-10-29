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
    <nav className="navbar">
      <h1 className="text-5xl sm:text-6xl font-bold text-white grow font-serif">
        FiTask
      </h1>
      {session?.user ? (
        <div className="flex gap-3 items-center max-[350px]:flex-col">
          <Link
            href="/new"
            className={`button ${
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
