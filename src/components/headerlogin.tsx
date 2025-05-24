"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";

import { useUser } from "@/app/_context/sigupcontext";
import Link from "next/link";

export const Headerlogin = () => {
  const { user, setUser } = useUser();

  const handleSignout = () => {
    setUser(null);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="py-2 px-4 justify-center items-center gap-2 rounded-full bg-[#EF4444]">
            <Image src="/user.svg" alt="User" width={26} height={26} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-2 gap-2 flex flex-col items-center">
          <DropdownMenuLabel className="text-sm font-normal w-full text-center truncate">
            {user?.email || "Хаяг олдсонгүй"}
          </DropdownMenuLabel>
          <Link href="/SignUp">
            <Button
              onClick={handleSignout}
              className="w-full"
              variant="outline"
            >
              Sign out
            </Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
