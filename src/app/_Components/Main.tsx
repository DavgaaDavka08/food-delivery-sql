"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { useCategory } from "../_context/category";
import { useFood } from "../_context/foods";
import { Button } from "@/components/ui/button";

export default function FoodMenu() {
  const { getCategory } = useCategory();
  const { getFood } = useFood();

  return (
    <div className=" bg-[#404040] min-h-screen ">
      <div>
        <Image
          className="w-full h-[470px] "
          src="/main.png"
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div className="container mx-auto px-4 py-8 ">
        {getCategory.map((cat) => (
          <div className="flex flex-col gap-5" key={cat.category_id}>
            <p className="text-4xl text-white ">{cat.categoryName}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFood
                .filter((food) => food.connect_id === cat.category_id)
                .map((item) => (
                  <Card
                    key={item.food_id}
                    className=" border-zinc-700 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.foodname}
                        fill
                        className="object-cover"
                      />
                      <div className="w-[368px] h-[189px] flex  justify-end flex-col items-end">
                        <div className="flex absolute justify-end flex-col items-center m-a">
                          <Button className="flex w-[50px] h-[50px] px-4 items-center gap-2 rounded-full bg-[#ffff]">
                            {}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-red-400">
                          {item.foodname}
                        </h3>
                        <span className="font-bold">${item.foodprice}</span>
                      </div>
                      <p className="text-sm ">{item.ingredients}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
        <div className="h-32 flex items-center justify-center border border-dashed border-zinc-700 rounded-lg">
          <p>More menu items coming soon</p>
        </div>
      </div>
    </div>
  );
}
