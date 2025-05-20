"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";

import { CategoryType } from "@/utils/type";
import { useCategory } from "@/app/_context/category";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  categoryName: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters." }),
});

export function Category() {
  const [open, setOpen] = useState(false);
  const { addCategory, getCategory, deleteCategory, updateCategory } =
    useCategory();

  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [categoryName, setCategoryName] = useState("");

  async function onSubmit() {
    try {
      formSchema.parse({ categoryName });
      await addCategory(categoryName);
      setCategoryName("");
      setOpen(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {getCategory?.map((data: CategoryType, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger className="px-4 py-2 border border-indigo-200 rounded-full bg-white hover:bg-indigo-100 transition cursor-pointer text-sm font-medium text-indigo-600">
              {data.categoryName}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem
                inset
                className="text-red-500 hover:text-red-600"
                onClick={() => deleteCategory(data.category_id)}
              >
                Устгах
              </ContextMenuItem>

              <Dialog
                open={editTargetId === data.category_id}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setEditTargetId(data.category_id);
                    setEditName(data.categoryName);
                  } else {
                    setEditTargetId(null);
                    setEditName("");
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">Засах</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Категори засах</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Нэр
                      </Label>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={async () => {
                        if (!editName.trim()) {
                          console.error("Категори нэр хоосон байна");
                          return;
                        }
                        await updateCategory(data.category_id, editName);
                        setEditTargetId(null);
                      }}
                    >
                      Хадгалах
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-10 h-10 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition">
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Категори нэмэх</DialogTitle>
            <DialogDescription>
              Шинэ категори нэрээ оруулна уу.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Жишээ: Спорт, Хоол, Технологи"
              className="w-full"
            />
            <Button type="button" onClick={onSubmit} className="w-full">
              Нэмэх
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
