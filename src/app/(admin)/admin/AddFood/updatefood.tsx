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

const UpdateFoodMap = ({ category }: { category: number }) => {
  const { getFood, deleteFoods, updateFoods } = useFood();
  const { handleChange, uploadImage, articleImageFile } = useCloudnary();
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<FoodType>({
    food_id: 0,
    foodname: "",
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
        editData.food_id,
        editData.foodname,
        editData.foodprice,
        editData.ingredients,
        imageUrl,
        editData.connect_id
      );

      setDialogOpen(false);
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
            className="bg-white border rounded-2xl p-4 shadow-md hover:shadow-xl transition-all"
          >
            <div className="w-full h-[150px] rounded-lg overflow-hidden mb-3">
              <Image
                src={item.image || "/fallback-image.png"}
                alt=""
                width={400}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800 text-lg truncate">
                {item.foodname}
              </p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      handleOpenEdit(item);
                      setDialogOpen(true);
                    }}
                    className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    ✎
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Edit Food
                    </DialogTitle>
                    <DialogDescription>
                      Update the food item below.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 mt-4">
                    <div>
                      <Label htmlFor="foodName">Food Name</Label>
                      <Input
                        id="foodName"
                        value={editData.foodname}
                        onChange={(e) =>
                          setEditData({ ...editData, foodname: e.target.value })
                        }
                        placeholder="Enter food name"
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
                      <Image
                        src={editData.image}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover border"
                      />
                    )}

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
                        placeholder="Enter ingredients"
                      />
                    </div>

                    <div>
                      <Label htmlFor="foodprice">Price (₮)</Label>
                      <Input
                        id="foodprice"
                        value={editData.foodprice}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            foodprice: e.target.value,
                          })
                        }
                        placeholder="₮ 0.00"
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-6 flex justify-between gap-4">
                    <Button
                      variant="outline"
                      disabled={isSaving}
                      onClick={() => deleteFoods(String(item.food_id))}
                      className="border border-red-300 text-red-500 hover:bg-red-100"
                    >
                      Delete
                    </Button>

                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`${
                        isSaving
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-[#EF4444] text-white hover:bg-[#dc2626]"
                      } px-6`}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-1">
              {item.ingredients}
            </p>

            <span className="text-sm font-medium text-green-600">
              ₮ {item.foodprice}
            </span>
          </div>
        ))}
    </div>
  );
};

export default UpdateFoodMap;
