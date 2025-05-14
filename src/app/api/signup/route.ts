import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Имэйл болон нууц үгээ оруулна уу." },
        { status: 400 }
      );
    }

    const CheckUser = `SELECT * FROM "users" WHERE email = $1;`;
    const doubleUser = await runQuery(CheckUser, [email]);

    if (doubleUser.length > 0) {
      return NextResponse.json(
        { error: "Email давхардсан байна" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUsers = `INSERT INTO "users" (email, password) VALUES($1,$2) RETURNING *;`;
    const newUsers = await runQuery(createUsers, [email, hashedPassword]);

    return NextResponse.json(
      {
        user: newUsers[0],
        message: "Амжилттай бүртгэгдлээ",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error :>> ", error);
    return NextResponse.json(
      { error: "Бүртгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
};
