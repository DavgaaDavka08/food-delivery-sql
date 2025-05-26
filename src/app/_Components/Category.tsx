"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCategory } from "../_context/category";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const Categories = ({ selectedCategory, setSelectedCategory }: Props) => {
  const { getCategory } = useCategory();

  return (
    <div className="w-full bg-[#404040] py-4">
      <div className="container mx-auto px-4">
        <ToggleGroup
          type="single"
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value || "all")}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        >
          <ToggleGroupItem
            value="all"
            className="rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap data-[state=on]:bg-red-500 data-[state=on]:text-white bg-gray-600 text-white hover:bg-red-500 transition-colors duration-200"
          >
            All
          </ToggleGroupItem>

          {getCategory.map((item) => (
            <ToggleGroupItem
              key={item.category_id}
              value={item.category_id.toString()}
              className="rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap data-[state=on]:bg-red-500 data-[state=on]:text-white bg-gray-600 text-white hover:bg-red-500 transition-colors duration-200"
            >
              {item.categoryName}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default Categories;
