import { getOrder } from "~/actions/orders"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const order = await getOrder(parseInt(params.id))
   
    return Response.json({ ...order })
  }