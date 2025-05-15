import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET!;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "И-мэйл шаардлагатай" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userResult = await runQuery(`SELECT * FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);

    if (userResult.length === 0) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    const token = jwt.sign({ email: normalizedEmail }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const verificationUrl = `${BASE_URL}/api/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to: normalizedEmail,
        subject: "И-мэйлээ баталгаажуулна уу",
        html: `
          <p>Сайн байна уу?</p>
          <p>Та доорх холбоосоор орж и-мэйл хаягаа баталгаажуулна уу:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { error: "Имэйл илгээхэд алдаа гарлаа" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Имэйл дахин илгээгдлээ" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  }
};
