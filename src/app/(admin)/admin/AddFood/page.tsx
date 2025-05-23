"use client";

import { CategoryType } from "@/utils/type";
import { Category } from "./addcategory";
import { useCategory } from "@/app/_context/category";
import { AddFoods } from "./addfood";

export default function Catagory() {
  const { getCategory } = useCategory();
  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-4 sm:py-8">
      <div className="w-[92%] flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-indigo-200">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
            category
          </h4>
          <Category />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {(getCategory ?? []).map((Data: CategoryType, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-indigo-100"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
                foods
              </h4>
              <p className="text-base sm:text-lg font-semibold text-indigo-600">
                {Data.categoryName}
              </p>

              <AddFoods data={Data.category_id} />
            </div>
          ))}
        </div>
      </div>
      {/* Category Section */}
    </div>
  );
}
