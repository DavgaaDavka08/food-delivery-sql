import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/utils/querySrvice";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category_id } = body;

    if (!category_id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    const deleteQuery = `DELETE FROM "category" WHERE category_id = $1 RETURNING *;`;
    const result = await runQuery(deleteQuery, [category_id]);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully", data: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}
