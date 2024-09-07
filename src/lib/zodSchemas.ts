import z from 'zod'

export const updateIngredientSchema = z.object({
    name: z.string({ message: "Campo obrigatório" }).optional(),
    quantity: z.coerce
      .number({ message: "Campo obrigatório" })
      .min(1, { message: "O valor deve ser maior que 1" })
      .optional(),
})