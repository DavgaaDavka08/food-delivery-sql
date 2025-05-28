import { runQuery } from "@/utils/querySrvice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // UUID байгааг шалгах (жишээ шалгалт - хэтэрхий энгийн)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return NextResponse.json(
      { error: "Invalid order ID. It must be a valid UUID." },
      { status: 400 }
    );
  }

  try {
    const query = `
      SELECT
        fo.id AS order_id,
        u.email,
        fo.total_price,
        fo.status,
        fo.created_at,
        foi.quantity,
        f.foodname,
        f.foodprice
      FROM food_orders fo
      JOIN users u ON fo.user_id = u.id
      JOIN food_order_items foi ON foi.order_id = fo.id
      JOIN foods f ON foi.food_id = f.food_id
      WHERE fo.id = $1
    `;

    const result = await runQuery(query, [id]);

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
