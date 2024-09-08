"use server"
import {  count, ilike, asc, eq, gt, and } from "drizzle-orm";
import { db } from "~/server/db";
import { InsertIngredient, ingredients as ingredientsTable } from "~/server/db/schema";

type GetIngredientsParams = {
    page: number;
    q?: string;
    quantityGt?: number
}

export async function createIngredient(data: InsertIngredient){
    await db.insert(ingredientsTable).values(data)
}

export async function updateIngredient({data,id}: {data: InsertIngredient, id: number}){

    await db.update(ingredientsTable).set(data).where(eq(ingredientsTable.id, id));
}

export async function getIngredient(id: number){
    const ingredient = await db.select().from(ingredientsTable).where(eq(ingredientsTable.id, id))

    return ingredient[0]
}

export async function getIngredients({page, q, quantityGt}: GetIngredientsParams){
    const itemsPerPage = 10

    const quantityWhere = gt(ingredientsTable.quantity, quantityGt || 0)
    let where = q ? ilike(ingredientsTable.name, `%${q}%`) : undefined
    
    if(where && quantityGt != undefined){
        where = and(where, quantityWhere)
    }

    if(!where && quantityGt != undefined){
        where = quantityWhere
    }

   const ingredients = await db.query.ingredients.findMany({
    orderBy: [asc(ingredientsTable.name)],
    where,
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
  });

  const [objectCount] = await db.select({ ingredientsCount: count() }).from(ingredientsTable).where(where);
   const ingredientsCount = objectCount?.ingredientsCount ?? 0
   
   return {
    data:ingredients,
    pages: Math.ceil(ingredientsCount / itemsPerPage)
   }
}

export default async function deleteIngredient({id}: {id: number}){
    
    await db.delete(ingredientsTable).where(eq(ingredientsTable.id, id));
}