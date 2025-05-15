"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
type StepOneProps = {
  next: () => void;
  email: string;
};
export const StepOne: React.FC<StepOneProps> = ({ next, email }) => {
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resend-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Алдаа гарлаа");
      } else {
        alert("Имэйл дахин илгээгдлээ");
        next();
      }
    } catch (err) {
      console.log("err :>> ", err);
      alert("Сүлжээний алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <div className="mb-8">
        <Link
          href="/login"
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200"
        >
          <span className="sr-only">Буцах</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Имэйлээ баталгаажуулна уу
        </h1>

        <p className="text-gray-600 mb-8">
          Бид таны <span className="text-gray-900 font-medium">{email}</span>{" "}
          хаяг руу баталгаажуулах имэйл илгээлээ. Холбоос дээр дарж бүртгэлээ
          баталгаажуулна уу.
        </p>

        <Button
          variant="default"
          className="w-full py-6 text-base bg-black hover:bg-gray-800"
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Дахин илгээж байна..." : "Имэйлийг дахин илгээх"}
        </Button>
      </div>
    </div>
  );
};
