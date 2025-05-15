"use client";

import { Category } from "./addcategory";

// import { DialogDemos } from "@/components/ui/myshdchn/api-Shadchn/foodMenuDialogs";
export default function Catagory() {
  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-4 sm:py-8">
      <div className="w-[92%] flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-indigo-200">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
            Чухал дээр харагдах мэдээгээ бичээрэй анай 1 мэдээ энэ дээр бичнэ
            шүү
          </h4>
          <Category />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {/* {(getSeriousCategory ?? []).map(
            (seriousData: SeriousCategoryType, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-indigo-100"
              >
                <p className="text-base sm:text-lg font-semibold text-indigo-600">
                  {seriousData.SeriousName}
                </p>
                <SeriousArticle data={seriousData._id} />
              </div>
            )
          )} */}
        </div>
      </div>
      {/* Category Section */}
      <div className="w-[92%] flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-green-200">
          <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
            Мэдээний Category
          </h4>
          {/* <DialogDemoCategory /> */}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {/* {(getCategory ?? []).map((data: CategoryType, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-green-100"
            >
              <p className="text-base sm:text-lg font-semibold text-green-600">
                {data.categoryName}
              </p>
              <Article data={data._id} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
