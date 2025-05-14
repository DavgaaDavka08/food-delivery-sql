"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function FoodMenu() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const toggleSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  const appetizers = [
    {
      id: "finger-food",
      name: "Finger food",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "cranberry-brie",
      name: "Cranberry Brie Bites",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "sunshine-stackers-1",
      name: "Sunshine Stackers",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className=" min-h-screen ">
      <div>
        <Image
          className="w-full h-[470px] "
          src="/main.png"
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Appetizers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appetizers.map((item) => (
            <Card
              key={item.id}
              className="bg-zinc-800 border-zinc-700 overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleSelection(item.id)}
                  className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedItems.includes(item.id)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {selectedItems.includes(item.id) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-red-400">
                    {item.name}
                  </h3>
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Salads</h2>
        <div className="h-32 flex items-center justify-center border border-dashed border-zinc-700 rounded-lg">
          <p className="text-zinc-500">More menu items coming soon</p>
        </div>
      </div>
    </div>
  );
}
