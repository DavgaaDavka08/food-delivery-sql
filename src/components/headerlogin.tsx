import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export const Headerlogin = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=" py-2 px-4 justify-center items-center gap-2 rounded-full bg-[#EF4444] ">
            <Image src="user.svg" alt="" width={26} height={26} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[60px] gap-2 items-center flex flex-col ">
          <DropdownMenuLabel>@gmail.comUser</DropdownMenuLabel>
          <Link href="/">
            <Button>Sign out</Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
