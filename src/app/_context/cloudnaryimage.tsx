"use client";
import { FoodType } from "@/utils/type";
import { createContext, ReactNode, useContext, useState } from "react";

type CloudnaryImageContextType = {
  getCloudnary: FoodType[];
  setGetCloudnary: (data: FoodType[]) => void;
  articleImageFile: File | null;
  setArticleImageFile: (file: File | null) => void;
  previewUrl?: string;
  setPreviewUrl: (url?: string) => void;
  uploadImage: (
    file: File | null
  ) => Promise<string | { error: string } | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Context үүсгэх
const CloudnaryContext = createContext<CloudnaryImageContextType | undefined>(
  undefined
);

// Custom Hook - context-оос өгөгдөл авах
export const useCloudnary = () => {
  const context = useContext(CloudnaryContext);
  if (!context) {
    throw new Error("useCloudnary must be used within a CloudnaryProvider");
  }
  return context;
};

// Provider component
const CloudnaryProvider = ({ children }: { children: ReactNode }) => {
  const [getCloudnary, setGetCloudnary] = useState<FoodType[]>([]);
  const [articleImageFile, setArticleImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>("");

  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_NAME!;

  // 📤 Зураг upload хийх функц
  const uploadImage = async (
    file: File | null
  ): Promise<string | { error: string } | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return { error: "Image upload failed" };
    }
  };

  // 🖼️ Зураг сонгоход preview харуулах
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArticleImageFile(file);
    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
  };

  return (
    <CloudnaryContext.Provider
      value={{
        getCloudnary,
        setGetCloudnary,
        articleImageFile,
        setArticleImageFile,
        previewUrl,
        setPreviewUrl,
        uploadImage,
        handleChange,
      }}
    >
      {children}
    </CloudnaryContext.Provider>
  );
};

export default CloudnaryProvider;
