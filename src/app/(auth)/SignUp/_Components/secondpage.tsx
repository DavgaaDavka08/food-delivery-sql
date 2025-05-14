"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/_context/sigupcontext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SecondPageProps = {
  email: string;
  title?: string; // одоогоор ашиглахгүй бол optional болгоно
};

export default function SecondPage({ email }: SecondPageProps) {
  const router = useRouter();
  const { handleSignup, error } = useUser();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await handleSignup(email, password);

    if (success) {
      toast.success("Signup successful!");
      router.push("/");
    } else {
      toast.error("Signup failed: This email is already in use.");
    }
  };

  return (
    <div className="flex w-[416px] flex-col justify-center items-start gap-6">
      <div className="w-full">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 mb-4 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>

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
          <Link href="/login" className="text-blue-600 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
