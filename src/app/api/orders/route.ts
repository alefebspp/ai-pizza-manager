import { NextResponse } from "next/server";
import { getIngredient } from "~/actions/ingredients";
import { createOrder } from "~/actions/orders"
import { SelectIngredient } from "~/server/db/schema";

export async function POST(request: Request) {

    const res: {ingredients_ids: number[]} = await request.json().catch(err => {
        return NextResponse.json(
            { message: "Body Json is required"},
            { status: 400 }
          );
    })

    if(!res.ingredients_ids){
        return NextResponse.json(
            { message: "Ingredients Id's are required"},
            { status: 400 }
          );
    }
    const ingredients: SelectIngredient[] = []

    for(const id of res.ingredients_ids){
        const foundIngredient = await getIngredient(id)
        if(foundIngredient){
            ingredients.push(foundIngredient)
        }
        else{
            return NextResponse.json(
                { message: "One of the requested ingredients were not found"},
                { status: 400 }
              );
        }
    }

    const orderId = await createOrder({ingredients})

    if(!orderId){
        return NextResponse.json(
            { message: "Unable to create order.Please, try again."},
            { status: 400 }
          );
    }

     return NextResponse.json(
        { message: `Order id: ${orderId}`},
        { status: 200 }
      );
  }