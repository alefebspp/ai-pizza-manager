import { getIngredients } from "~/actions/ingredients"


export async function GET() {
    const ingredients = await getIngredients({page: 1})
   
    return Response.json({ data: ingredients.data })
  }