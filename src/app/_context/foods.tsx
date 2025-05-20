"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { FoodType } from "@/utils/type";

type FoodFoodContextType = {
  getFood: FoodType[];
  setGetFood: (foods: FoodType[]) => void;
  addFoods: (
    foodname: string,
    foodprice: string,
    ingredients: string,
    image: string,
    connect_id: string
  ) => Promise<void>;
  updateFoods: (
    food_id: number,
    foodname: string,
    foodprice: string,
    ingredients: string,
    image: string,
    connect_id: string
  ) => Promise<void>;
  deleteFoods: (food_id: string) => Promise<void>;
};

const foodContext = createContext<FoodFoodContextType>(
  {} as FoodFoodContextType
);

export const useFood = () => useContext(foodContext);

const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [getFood, setGetFood] = useState<FoodType[]>([]);

  const GetFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/foods");
      setGetFood(response.data.foods);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addFoods = async (
    foodname: string,
    foodprice: string,
    ingredients: string,
    image: string,
    connect_id: string
  ) => {
    try {
      await axios.post("http://localhost:3000/api/foods", {
        foodname,
        foodprice,
        ingredients,
        image,
        connect_id,
      });
      await GetFoods();
    } catch (error) {
      console.error("Add food error:", error);
      throw error;
    }
  };
  const updateFoods = async (
    food_id: number,
    foodname: string,
    foodprice: string,
    ingredients: string,
    image: string,
    connect_id: string
  ) => {
    try {
      await axios.patch("http://localhost:3000/api/foods", {
        foodname,
        foodprice,
        ingredients,
        image,
        connect_id,
        food_id,
      });
      await GetFoods();
    } catch (error) {
      console.error("Update food error:", error);
      throw error;
    }
  };

  const deleteFoods = async (food_id: string) => {
    try {
      console.log("id :>> ", food_id);
      await axios.post("http://localhost:3000/api/foods/delete", {
        food_id,
      });
      await GetFoods();
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  };

  useEffect(() => {
    GetFoods();
  }, []);

  return (
    <foodContext.Provider
      value={{
        getFood,
        setGetFood,
        addFoods,
        updateFoods,
        deleteFoods,
      }}
    >
      {children}
    </foodContext.Provider>
  );
};

export default FoodProvider;
