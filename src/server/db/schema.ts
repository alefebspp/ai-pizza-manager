// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ai-pizza-manager_${name}`);

export const ingredients = createTable("ingredients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  quantity: integer("quantity"),
  createdAt: timestamp("created_at", { withTimezone: true })
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
  () => new Date()
),
})

export type InsertIngredient = typeof ingredients.$inferInsert;
export type SelectIngredient = typeof ingredients.$inferSelect;

export const orders = createTable("orders", {
  id: serial("id").primaryKey(),
  status: varchar("status", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: false })
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
  () => new Date()
),
})

 export const orders_items = createTable("orders_items", {
  id: serial("id").primaryKey(),
  order_id: integer('order_id')
  .notNull()
  .references(() => orders.id, { onDelete: 'cascade' }),
  ingredient_id: integer('ingredient_id')
  .notNull()
  .references(() => ingredients.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at", { withTimezone: true })
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
  () => new Date()
),
}) 

export type SelectOrderItem = typeof orders_items.$inferSelect;


export const orderItemsRelations = relations(orders_items, ({ one }) => ({
  ingredient: one(ingredients, { fields: [orders_items.ingredient_id], references: [ingredients.id] }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  orderIngredients: many(orders_items),
}));

export const ordersItemsRelations = relations(orders_items, ({ one }) => ({
  order: one(orders, { fields: [orders_items.order_id], references: [orders.id] }),
}));