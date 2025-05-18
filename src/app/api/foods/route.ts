import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const getfoods = `SELECT * FROM "foods" ORDER BY id DESC;`;
    const runfoods = runQuery(getfoods, []);
    return NextResponse.json({ getfoods, runfoods }, { status: 200 });
  } catch (error) {
    console.log("error :>> ", error);
    return NextResponse.json({ error: "error in foods" }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { foodname, foodprice, ingredients, image, category_id } = body;

    if (!category_id) {
      return NextResponse.json(
        { error: "Category ID шаардлагатай" },
        { status: 400 }
      );
    }

    const addfoods = `
      INSERT INTO "foods" (foodname, foodprice, ingredients, image, category_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const runfoods = await runQuery(addfoods, [
      foodname,
      foodprice,
      ingredients,
      image,
      category_id,
    ]);

    return NextResponse.json(
      { message: "Амжилттай нэмлээ", data: runfoods[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("error :>> ", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
};
