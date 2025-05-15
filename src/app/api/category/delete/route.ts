import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ message: "ID шаардлагатай" }, { status: 400 });
    }

    const deleteQuery = `DELETE FROM "category" WHERE id = $1 RETURNING *;`;
    const deleted = await runQuery(deleteQuery, [_id]);

    if (!deleted || deleted.length === 0) {
      return NextResponse.json(
        { message: "Устгах category олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "amjilttai ustgalaa", data: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Нийтлэл устгах үед алдаа: ", error);
    return NextResponse.json(
      { message: "Алдаа гарлаа нийтлэл устгах үед", error },
      { status: 500 }
    );
  }
}
