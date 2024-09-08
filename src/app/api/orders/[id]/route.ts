import { getOrder } from "~/actions/orders"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const order = await getOrder(parseInt(params.id))

    if(!order){
        return Response.json({ message: "Order not found" })
    }
   
    return Response.json({ ...order })
  }