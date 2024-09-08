"use server"
import {  count, eq, } from "drizzle-orm";
import { db } from "~/server/db";
import { orders as ordersTable, orders_items as ordersItemsTable, SelectIngredient, SelectOrderItem} from "~/server/db/schema";
import { Order } from "~/types";
import { getIngredient, updateIngredient } from "./ingredients";

type OrderItem = {
    ingredient: SelectIngredient
} & SelectOrderItem

type GetOrdersParams = {
    page: number;
}

export type OrderIngredients = {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    order_id: number;
    ingredient_id: number;
    ingredient: SelectIngredient
}

export async function createOrder({ingredients}: {ingredients: SelectIngredient[]}){
    const [order] = await db.insert(ordersTable).values({status: "pending"}).returning()

    if(order){
        for(const ingredient of ingredients){
                const quantity = ingredient.quantity
                if(quantity && quantity > 0){
                    await db.insert(ordersItemsTable).values({order_id: order.id, ingredient_id: ingredient.id})
                    await updateIngredient({id: ingredient.id, data: {quantity: quantity - 1} })
                }
            
        }
        
        return order?.id
    }
}

export async function updateOrder({status, id}: {status: string; id: number}) {
    await db.update(ordersTable).set({status}).where(eq(ordersTable.id, id))
}

export async function getOrders({page}: GetOrdersParams) {
    const itemsPerPage = 10

   const orders = await db.query.orders.findMany({
    with: {
      orderIngredients: {
        with: {
            ingredient: true
        }
      }
    },
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
  });

  const [objectCount] = await db.select({ ordersCount: count() }).from(ordersTable);
  const ordersCount = objectCount?.ordersCount ?? 0

  const formattedOrders: Order[] = []

  orders.forEach(({orderIngredients, ...order}) => {
    const formattedOrder = {
        ...order,
        ingredients: []
    }

    const orderInfos = orderIngredients as OrderIngredients[]
    const ingredients: SelectIngredient[] = []

    orderInfos.forEach(({ ingredient}) => {
        ingredients.push(ingredient)
    })

    Object.assign(formattedOrder, {
        ingredients
    })
    formattedOrders.push(formattedOrder)
  })
  
  return {
   data: formattedOrders,
   pages: Math.ceil(ordersCount / itemsPerPage)
  }
}

export async function getOrder(id: number){
    const data = await db.select().from(ordersTable).where(eq(ordersTable.id, id))

    const order = data[0]

    if(!order){
        return null
    }

    const ingredients: SelectIngredient[] = []

    if(order){
        const orderItems = await db.query.orders_items.findMany({where: eq(ordersItemsTable.order_id, order.id), with: {
            ingredient: true
        }}) as OrderItem[]

        orderItems.forEach(({ingredient}) => {
            ingredients.push(ingredient)
        })
    }

    return {
        orderInfos: order,
        orderIngredients: ingredients
    }
}

export default async function deleteOrder({id}: {id: number}){
    
    await db.delete(ordersTable).where(eq(ordersTable.id, id));
}