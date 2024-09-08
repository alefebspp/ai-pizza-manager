import { getOrder } from "~/actions/orders"
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const order = await getOrder(parseInt(params.id))

    if(!order){
        return NextResponse.json(
            { message: "Order not found"},
            { status: 400 }
          );
    }
   
    return NextResponse.json(
        { ...order},
        { status: 200 }
      );
  }