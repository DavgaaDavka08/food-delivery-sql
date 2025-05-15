"use client";

import type React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/_context/sigupcontext";

export default function FirstPage({
  nextPage,
  email,
  setEmail,
}: {
  nextPage: () => void;
  setEmail: (value: string) => void;
  email: string;
}) {
  const { error } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) nextPage();
  };

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <div className="w-full">
        <button className="p-2 mb-4 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-500 mb-6">
          Sign up to explore your favorite dishes.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-6 px-4 text-lg"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full py-6 bg-gray-300 hover:bg-gray-400 text-white text-lg font-medium"
          >
            Lets Go
          </Button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link href="/SignIn" className="text-blue-600 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
