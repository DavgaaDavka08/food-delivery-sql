"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { CategoryType } from "@/utils/type";

type CategoryContextType = {
  getCategory: CategoryType[];
  setGetCategory: (categories: CategoryType[]) => void;
  addCategory: (categoryName: string) => Promise<void>;
  updateCategory: (category_id: number, categoryName: string) => Promise<void>;
  deleteCategory: (category_id: number) => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const useCategory = () => useContext(CategoryContext);

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [getCategory, setGetCategory] = useState<CategoryType[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/category");
      setGetCategory(response.data.getcategory);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addCategory = async (categoryName: string) => {
    try {
      await axios.post("http://localhost:3000/api/category", { categoryName });
      await fetchCategories();
    } catch (error) {
      console.error("Add category error:", error);
      throw error;
    }
  };

  const updateCategory = async (category_id: number, categoryName: string) => {
    try {
      await axios.patch("http://localhost:3000/api/category", {
        category_id,
        categoryName,
      });
      await fetchCategories();
    } catch (error) {
      console.error("Update category error:", error);
      throw error;
    }
  };

  const deleteCategory = async (category_id: number) => {
    try {
      console.log("id :>> ", category_id);
      await axios.post("http://localhost:3000/api/category/delete", {
        category_id,
      });

      await fetchCategories();
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        getCategory,
        setGetCategory,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
