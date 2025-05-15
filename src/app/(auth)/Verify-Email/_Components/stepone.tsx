"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StepTwoProps = {
  next: () => void;
  email: string;
};

export default function StepTwo({ next, email }: StepTwoProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Нууц үг таарахгүй байна");
      return;
    }

    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Нууц үг амжилттай тохируулагдлаа");
      next(); // Optional: next step
    } else {
      alert(data.error || "Алдаа гарлаа");
    }
  };

  return (
    <div className="flex w-[416px] flex-col justify-center items-start gap-6">
      <div className="w-full">
        <ArrowLeft size={24} />

        <h1 className="text-3xl font-bold mb-2">Create a strong password</h1>
        <p className="text-gray-500 mb-6">
          Create a strong password with letters, numbers.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-6 px-4 text-lg"
            required
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-6 px-4 text-lg"
            required
          />

          <Button
            type="submit"
            className="w-full py-6 bg-gray-300 hover:bg-gray-400 text-white text-lg font-medium"
          >
            Lets Go
          </Button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
