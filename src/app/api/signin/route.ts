import { runQuery } from "@/utils/querySrvice";
import { User } from "@/utils/type";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "И-мэйл болон нууц үгээ оруулна уу" },
        { status: 400 }
      );
    }

    const getUsersQuery = `SELECT * FROM "users" WHERE email = $1`;
    const userQuery = await runQuery(getUsersQuery, [email]);

    if (userQuery.length === 0) {
      return NextResponse.json(
        { error: "Ийм хэрэглэгч бүртгэлгүй байна" },
        { status: 404 }
      );
    }

    const user = userQuery[0] as User;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Нууц үг буруу байна" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { user, message: "Амжилттай нэвтэрлээ" },
      { status: 200 }
    );
  } catch (error) {
    console.error("signin error: ", error);
    return NextResponse.json(
      { error: "Нэвтрэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
};
