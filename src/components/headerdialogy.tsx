"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export function DialogDemoHeaders() {
  const [open, setOpen] = useState(false);
  const addHandler = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          src="/loc.svg"
          alt=""
          className="flex items-center w-[35px] h-[35px] "
          width={1000}
          height={1000}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] h-[380px]">
        <DialogHeader>
          <DialogTitle>Delivery address</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="username"
            className=" w-[432px] h-[112px] flex py-2 px-3 flex-col items-start rounded-md border border-[#E4E4E7]"
          />
        </div>
        <DialogFooter>
          <Button onClick={addHandler} type="submit">
            Deliver Here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
