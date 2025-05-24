import { DialogDemoHeaders } from "@/components/headerdialogy";
import { Headerlogin } from "@/components/headerlogin";
import { SheetDemo } from "@/components/headersheet";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <div className="w-full h-[84px] bg-[#18181B]">
      <div className="w-[1440px] flex  py-[12px] px-[88px] justify-between m-auto items-center ">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image width={50} height={50} src="/logo.svg" alt="" />
          </Link>

          <div>
            <div className="flex">
              <h4 className="text-[#FAFAFA] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                Nom
              </h4>
              <h4 className="text-[#EF4444] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                Nom
              </h4>
            </div>
            <h5 className="text-[#F4F4F5] text-center font-inter text-[12px] font-normal leading-[16px]">
              Swift delivery
            </h5>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <div className="absolute left-3 cursor-pointer">
              <DialogDemoHeaders />
            </div>
            <Input
              placeholder="<Add Location"
              className="flex h-[36px] w-[251px] p-2 items-center gap-1 rounded-full bg-white  px-12"
            />
          </div>

          <SheetDemo />

          <Headerlogin />
        </div>
      </div>
    </div>
  );
}
