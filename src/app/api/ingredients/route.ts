import { getIngredients } from "~/actions/ingredients"


export async function GET() {
    const ingredients = await getIngredients({page: 1, quantityGt: 0})
   
    return Response.json({ data: ingredients.data })
  }