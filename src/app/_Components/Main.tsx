"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useCategory } from "../_context/category";
import { useFood } from "../_context/foods";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Categories from "./Category";
import { useState } from "react";

export default function FoodMenu() {
  const { getCategory } = useCategory();
  const { getFood } = useFood();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFoods =
    selectedCategory === "all"
      ? getFood
      : getFood.filter(
          (food) => food.connect_id.toString() === selectedCategory
        );

  return (
    <div className="bg-[#404040] min-h-screen ">
      <Image
        src="/main.png"
        alt="Featured dish"
        width={1000}
        height={1000}
        className="w-[90%] h-[390px] m-auto "
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="container mx-auto px-4 py-8">
        {selectedCategory === "all" ? (
          getCategory.map((cat) => {
            const foods = getFood.filter(
              (food) => food.connect_id === cat.category_id
            );
            if (foods.length === 0) return null;
            return (
              <div key={cat.category_id} className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 capitalize">
                  {cat.categoryName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foods.map((item) => (
                    <Card
                      key={item.food_id}
                      className=" border-gray-700 overflow-hidden "
                    >
                      <div className="relative h-48 group">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.foodname}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Button
                          size="icon"
                          className="absolute bottom-4 right-4 w-12 h-12 rounded-full"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-red-400">
                            {item.foodname}
                          </h3>
                          <span className="text-xl font-bold">
                            ${item.foodprice}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">
                          {item.ingredients}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 capitalize">
              {
                getCategory.find(
                  (cat) => cat.category_id.toString() === selectedCategory
                )?.categoryName
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map((item) => (
                <Card
                  key={item.food_id}
                  className=" border-gray-700 overflow-hidden "
                >
                  <div className="relative h-48 group">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.foodname}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-red-400">
                        {item.foodname}
                      </h3>
                      <span className="text-xl font-bold">
                        ${item.foodprice}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {item.ingredients}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg mt-8">
          <p className="text-gray-400 text-lg">More menu items coming soon</p>
        </div>
      </div>
    </div>
  );
}
