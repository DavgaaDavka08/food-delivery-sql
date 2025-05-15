"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NavMenu() {
  return (
    <div className="w-full sm:w-[250px] h-auto sm:h-screen bg-[#F4F4F5] flex flex-col items-start gap-10 p-5 flex-shrink-0 border-r border-gray-200">
      <div className="flex gap-2">
        <Link href="/">
          <div className="flex flex-col">
            <h4 className="text-[18px] font-semibold text-[#09090B] leading-7">
              Мэдээгээ нэмээрэй
            </h4>
            <p className="text-[12px] text-[#71717A] font-semibold leading-4">
              Хүслээ
            </p>
          </div>
        </Link>
      </div>

      <Link href="/admin/AddFood" className="w-full flex justify-center">
        <Button className="w-full rounded-full h-[40px]">Дар</Button>
      </Link>
      <Link href="/Order" className="w-full flex justify-center">
        <Button className="w-full rounded-full h-[40px]">Order</Button>
      </Link>

      <div className="flex flex-col gap-5 w-full">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-800">Мэдээ хянах хэсэг</h2>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">
              Гарчиг буюу Category-ууд:
            </span>
            <span className="text-2xl font-semibold text-indigo-600"></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-800">Мэдээний тоо</h2>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Нийт мэдээ:</span>
            <span className="text-2xl font-semibold text-green-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
