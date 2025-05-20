"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import { FoodType } from "@/utils/type";

import { useCloudnary } from "@/app/_context/cloudnaryimage";
import { useFood } from "@/app/_context/foods";

const UpdateFoodMap = ({ category }: { category: string }) => {
  const { getFood, deleteFoods, updateFoods } = useFood();
  const { handleChange, uploadImage, articleImageFile } = useCloudnary();
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<FoodType>({
    food_id: 0,
    foodName: "",
    foodprice: "",
    ingredients: "",
    image: "",
    connect_id: category,
  });

  const handleOpenEdit = (item: FoodType) => {
    setEditData({
      ...item,
      connect_id: item.connect_id || category,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setEditData((prev) => ({ ...prev, image: tempUrl }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let imageUrl = editData.image;
      if (articleImageFile) {
        const uploaded = await uploadImage(articleImageFile);
        if (uploaded && typeof uploaded === "string") {
          imageUrl = uploaded;
        }
      }

      await updateFoods(
        String(editData.food_id),
        editData.foodName,
        editData.foodprice,
        editData.ingredients,
        imageUrl,
        editData.connect_id
      );
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {getFood
        .filter((item) => item.connect_id === category)
        .map((item) => (
          <div
            key={item.food_id}
            className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="w-full h-[150px] rounded-md overflow-hidden mb-2">
              <Image
                src={item.image || "/fallback-image.png"}
                alt={item.foodName}
                width={400}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title + Edit */}
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800 truncate">
                {item.foodName}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    ✎
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Food</DialogTitle>
                    <DialogDescription>Update the food item</DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="foodName">Name</Label>
                      <Input
                        id="foodName"
                        value={editData.foodName}
                        onChange={(e) =>
                          setEditData({ ...editData, foodName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="foodprice">Price</Label>
                      <Input
                        id="foodprice"
                        value={editData.foodprice}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            foodprice: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="ingredients">Ingredients</Label>
                      <Input
                        id="ingredients"
                        value={editData.ingredients}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            ingredients: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    {editData.image && (
                      <div className="flex justify-center">
                        <Image
                          src={editData.image}
                          alt="Preview"
                          width={150}
                          height={150}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <DialogFooter className="mt-4 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => deleteFoods(String(item.food_id))}
                      className="text-red-500 border-red-300"
                    >
                      Delete
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Ingredients */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.ingredients}
            </p>

            {/* Price */}
            <span className="text-sm font-medium text-green-600">
              ₮ {item.foodprice}
            </span>
          </div>
        ))}
    </div>
  );
};
export default UpdateFoodMap;
