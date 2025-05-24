"use client";

import { CategoryType } from "@/utils/type";
import { Category } from "./addcategory";
import { useCategory } from "@/app/_context/category";
import { AddFoods } from "./addfood";
import { useState } from "react";

export default function Catagory() {
  const { getCategory } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const clickFilter = (id: number | null) => {
    setSelectedCategory(id);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-4 sm:py-8">
      <div className="w-[92%] flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-indigo-200">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
            category
          </h4>

          <Category />

          <div className="flex gap-2 flex-wrap mt-2">
            <button
              onClick={() => clickFilter(null)}
              className={`px-4 py-1 rounded-full border ${
                selectedCategory === null
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600 border-indigo-400"
              }`}
            >
              All
            </button>
            {(getCategory ?? []).map((cat, index) => (
              <button
                key={index}
                onClick={() => clickFilter(cat.category_id)}
                className={`px-4 py-1 rounded-full border ${
                  selectedCategory === cat.category_id
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 border-indigo-400"
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered category + AddFoods */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {(getCategory ?? [])
            .filter((cat: CategoryType) =>
              selectedCategory ? cat.category_id === selectedCategory : true
            )
            .map((Data: CategoryType, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-indigo-100"
              >
                <p className="text-base sm:text-lg font-semibold text-indigo-600">
                  {Data.categoryName}
                </p>
                <AddFoods data={Data.category_id} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
