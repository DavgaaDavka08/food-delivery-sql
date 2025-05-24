"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleSignup = async (email: string, password: string) => {
    setError("");
    try {
      const res = await axios.post("/api/signup", { email, password });
      setUser(res.data.user);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const handleSignin = async (email: string, password: string) => {
    setError("");
    try {
      const res = await axios.post("/api/signin", { email, password });
      setUser(res.data.user);
      return true;
    } catch (error) {
      console.error("Signin error:", error);
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
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
