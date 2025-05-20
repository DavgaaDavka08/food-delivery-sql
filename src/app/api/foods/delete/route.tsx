import { runQuery } from "@/utils/querySrvice";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { food_id } = body;
    if (!food_id) {
      return NextResponse.json({ massage: "food_id oldsongui" });
    }
    const deleteFood = `DELETE FROM "foods" WHERE food_id = $1 RETURNING *;`;
    const runDelete = await runQuery(deleteFood, [food_id]);
    if (!runDelete || runDelete.length === 0) {
      return NextResponse.json({ message: "food not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Deleted successfully", data: runDelete[0] },
      { status: 200 }
    );
  } catch (error) {
    console.log("object :>> ", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
};
