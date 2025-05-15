"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { User } from "@/utils/type";
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  handleSignup: (email: string, password: string) => Promise<boolean>;
  handleSignin: (email: string, password: string) => Promise<boolean>;
  error: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleSignup = async (email: string, password: string) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        email,
        password,
      });
      setUser(res.data.user);
      return true;
    } catch (error) {
      console.log("error :>> ", error);

      return false;
    }
  };

  const handleSignin = async (email: string, password: string) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });
      setUser(res.data.user);
      return true;
    } catch (error) {
      console.log("error :>> ", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleSignup, handleSignin, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
