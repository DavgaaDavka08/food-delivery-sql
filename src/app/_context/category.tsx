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
  updateCategory: (id: string, categoryName: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
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

  const updateCategory = async (id: string, categoryName: string) => {
    try {
      await axios.patch("http://localhost:3000/api/category", {
        id,
        categoryName,
      });
      await fetchCategories();
    } catch (error) {
      console.error("Update category error:", error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      console.log("id :>> ", id);
      await axios.post("http://localhost:3000/api/category/delete", {
        id,
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
