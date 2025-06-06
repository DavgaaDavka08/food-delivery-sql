"use client";
import { useCloudnary } from "@/app/_context/cloudnaryimage";
import { useFood } from "@/app/_context/foods";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import UpdateFoodMap from "./updatefood";
import { useCategory } from "@/app/_context/category";

export const AddFoods = ({ data }: { data: number }) => {
  const { addFoods } = useFood();
  const { getCategory } = useCategory();
  const { previewUrl, handleChange, uploadImage, articleImageFile } =
    useCloudnary();

  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foodprice, setFoodPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const imageUrl = await uploadImage(articleImageFile);
      if (!imageUrl || typeof imageUrl === "object") {
        console.error("Image upload амжилтгүй боллоо.");
        return;
      }

      if (!selectedCategoryId) {
        console.error("Ангилал сонгогдоогүй байна.");
        return;
      }

      await addFoods(
        foodName,
        foodprice,
        ingredients,
        imageUrl,
        selectedCategoryId
      );

      setFoodName("");
      setFoodPrice("");
      setIngredients("");
      setSelectedCategoryId(null);
      setDialogOpen(false);
      console.log("Амжилттай хоол нэмэгдлээ!");
    } catch (error) {
      console.error("Submit алдаа:", error);
    }
  };

  return (
    <div className="flex flex-wrap p-5 items-start gap-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="w-[280px] h-[100px] z-0 flex flex-col justify-center items-center gap-6 rounded-[20px] border border-dashed border-red-500">
            <Button
              className="flex w-[40px] h-[40px] px-4 items-center gap-2 rounded-full bg-[#EF4444]"
              variant="outline"
            >
              +
            </Button>
            <h4>Шинэ хоол нэмэх</h4>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Шинэ хоол нэмэх</DialogTitle>
            <DialogDescription>
              Доорх формыг бөглөж Submit дарна уу.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Хоолны нэр
              </label>
              <input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-sm"
                type="text"
                placeholder="Жишээ: Бууз"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Хоолны зураг
              </label>
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm file:text-sm file:bg-red-500 file:text-white file:px-4 file:py-2 file:rounded file:border-0"
                type="file"
                onChange={(e) => handleChange(e)}
              />
              {typeof previewUrl === "string" && previewUrl && (
                <div className="relative w-full h-[120px] mt-4 overflow-hidden rounded-md border">
                  <Image
                    src={previewUrl}
                    alt="Uploaded preview image"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Орц найрлага
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-sm resize-none"
                placeholder="Жишээ: Гурил, мах, сонгино..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Үнэ</label>
              <input
                value={foodprice}
                onChange={(e) => setFoodPrice(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-sm"
                type="text"
                placeholder="Жишээ: 8000₮"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Ангилал
              </label>
              <select
                value={selectedCategoryId ?? ""}
                onChange={(e) =>
                  setSelectedCategoryId(Number(e.target.value) || null)
                }
                className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
              >
                <option value="">Ангилал сонгох</option>
                {getCategory?.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`w-full mt-4 ${
              isSaving
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#EF4444] text-white hover:bg-[#dc2626]"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogContent>
      </Dialog>

      <UpdateFoodMap category={data} />
    </div>
  );
};
