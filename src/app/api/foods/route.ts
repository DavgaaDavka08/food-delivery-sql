import { runQuery } from "@/utils/querySrvice";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const getfoods = `
      SELECT f.*, c."categoryName"
      FROM "foods" f
      JOIN "category" c ON f.connect_id = c.category_id
      ORDER BY f.food_id DESC;
    `;
    const runfoods = await runQuery(getfoods, []);
    return NextResponse.json({ foods: runfoods }, { status: 200 });
  } catch (error) {
    console.error("error :>> ", error);
    return NextResponse.json({ error: "error in foods" }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { foodname, foodprice, ingredients, image, connect_id } = body;
    console.log("POST payload:", {
      foodname,
      foodprice,
      ingredients,
      image,
      connect_id,
    });
    if (!connect_id) {
      return NextResponse.json(
        { error: "Category ID шаардлагатай" },
        { status: 400 }
      );
    }
    const checkCategory = await runQuery(
      `SELECT * FROM "category" WHERE category_id = $1`,
      [connect_id]
    );
    if (checkCategory.length === 0) {
      return NextResponse.json(
        { error: "Ийм category_id байхгүй байна" },
        { status: 404 }
      );
    }
    const addfoods = `
      INSERT INTO "foods" (foodname, foodprice, ingredients, image, connect_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const runfoods = await runQuery(addfoods, [
      foodname,
      foodprice,
      ingredients,
      image,
      connect_id,
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
export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { food_id, foodname, foodprice, ingredients, image, connect_id } =
      body;

    if (
      !food_id ||
      !foodname ||
      !foodprice ||
      !ingredients ||
      !image ||
      !connect_id
    ) {
      return NextResponse.json(
        { error: "Бүх талбарыг бүрэн бөглөнө үү." },
        { status: 400 }
      );
    }

    const editFood = `
      UPDATE "foods"
      SET foodname = $1,
          foodprice = $2,
          ingredients = $3,
          image = $4,
          connect_id = $5
      WHERE food_id = $6
      RETURNING *
    `;

    const values = [
      foodname,
      foodprice,
      ingredients,
      image,
      connect_id,
      food_id,
    ];
    const result = await runQuery(editFood, values);

    return NextResponse.json(
      { message: "Амжилттай заслаа", data: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH алдаа:", error);
    return NextResponse.json(
      { error: "Дотоод серверийн алдаа." },
      { status: 500 }
    );
  }
};
