import { SelectIngredient } from "~/server/db/schema";

export type Ingredient = {
  id: number;
  name: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  quantity: number | null;
};

export type ChatInfos = {
  limit: number;
  has_more: boolean;
  data: Message[];
};

export type Message = {
  user: string;
  message: string;
  id: string;
};

export type Order = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  status: string | null;
  ingredients: SelectIngredient[];
};
