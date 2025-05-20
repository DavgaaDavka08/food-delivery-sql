import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/utils/querySrvice";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  try {
    const { category_id } = params;

    const deleteQuery = `DELETE FROM "category" WHERE categoryid = $1 RETURNING *;`;
    const deleted = await runQuery(deleteQuery, [category_id]);

    if (!deleted || deleted.length === 0) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully", data: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
