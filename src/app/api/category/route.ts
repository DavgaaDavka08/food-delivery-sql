import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const getQuery = `SELECT * FROM "category" ORDER BY category_id DESC;`;
    const categories = await runQuery(getQuery, []);
    return NextResponse.json({ getcategory: categories }, { status: 200 });
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { category_id, categoryName } = body;

    if (!category_id || !categoryName) {
      return NextResponse.json(
        { message: "category_idID болон categoryName шаардлагатай" },
        { status: 400 }
      );
    }

    const updateCategory = `
      UPDATE "category" 
      SET "categoryName" = $1 
      WHERE category_id = $2 
      RETURNING *;
    `;
    const updated = await runQuery(updateCategory, [categoryName, category_id]);

    if (updated.length === 0) {
      return NextResponse.json(
        { message: "Засах категори олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Амжилттай заслаа", data: updated[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Нийтлэл засахад алдаа:", error);
    return NextResponse.json(
      { message: "Алдаа гарлаа нийтлэл засах үед", error },
      { status: 500 }
    );
  }
}
