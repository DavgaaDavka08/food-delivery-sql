"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/_context/sigupcontext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Page = () => {
  const { handleSignin, error } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSignin(email, password);
    if (success) {
      toast.success("SignIn successful!");
      router.push("/");

      console.log("Амжилттай нэвтэрлээ");
    } else {
      toast.success("Signup error");
    }
  };

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <div className="w-full">
        <button className="p-2 mb-4 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold mb-2">Sign in to your account</h1>
        <p className="text-gray-500 mb-6">Welcome back! Please log in.</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-6 px-4 text-lg"
            required
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-6 px-4 text-lg"
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          <p>Forgot password ?</p>
          <Button
            type="submit"
            className="w-full py-6 bg-gray-300 hover:bg-gray-400 text-white text-lg font-medium"
          >
            Lets Go
          </Button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-gray-500">Dont have an account?</span>{" "}
          <Link href="/SignUp" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
