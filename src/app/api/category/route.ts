import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const getQuery = `SELECT * FROM "category" ORDER BY id DESC;`;
    const categories = await runQuery(getQuery, []);
    return NextResponse.json({ getNews: categories }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Мэдээлэл авахад алдаа гарлаа" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { categoryName } = body;

    if (!categoryName) {
      return NextResponse.json(
        { error: "category oldsongui" },
        { status: 400 }
      );
    }

    const createCategory = `INSERT INTO "category" ("categoryName") VALUES($1) RETURNING *;`;
    const runCategory = await runQuery(createCategory, [categoryName]);

    return NextResponse.json(
      { message: "amjilttai nemlee", data: runCategory[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST error :>> ", error);
    return NextResponse.json({ error: "aldaa garlaa" }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, categoryName } = body;

    if (!id || !categoryName) {
      return NextResponse.json(
        { error: "ID болон categoryName шаардлагатай" },
        { status: 400 }
      );
    }

    const updateCategory = `
      UPDATE "category" 
      SET "categoryName" = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const updated = await runQuery(updateCategory, [categoryName, id]);

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Category олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Амжилттай шинэчлэгдлээ", data: updated[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
};
