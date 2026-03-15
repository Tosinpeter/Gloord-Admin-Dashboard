import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { z } from "zod"

const t = initTRPC.create({ transformer: superjson })

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  category: z.string().min(1),
  usage: z.string().min(1),
  skinTypes: z.string().min(1),
  strength: z.enum(["Gentle", "Moderate", "Strong"]),
  description: z.string().min(1),
  ingredients: z.array(z.string()).optional(),
})

type Product = z.infer<typeof productSchema>

// In-memory demo data store (server-side only)
const products: Product[] = [
  {
    id: "P001",
    name: "Gentle Cleanser",
    category: "Cleanser",
    usage: "Morning & Evening",
    skinTypes: "All Skin Types",
    strength: "Gentle",
    description: "Gentle, non-foaming cleanser that maintains skin barrier",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
  },
  {
    id: "P002",
    name: "Hydrating Cleanser",
    category: "Cleanser",
    usage: "Morning & Evening",
    skinTypes: "Dry, Sensitive",
    strength: "Gentle",
    description: "Hydrating formula for dry and sensitive skin",
    ingredients: ["Squalane", "Aloe Vera", "Vitamin E"],
  },
]

export const appRouter = t.router({
  products: t.procedure.query(() => {
    return products
  }),
  productById: t.procedure.input(z.string()).query(({ input }) => {
    return products.find((product) => product.id === input) ?? null
  }),
  addProduct: t.procedure.input(productSchema).mutation(({ input }) => {
    const newProduct = { ...input, id: `P${String(products.length + 1).padStart(3, "0")}` }
    products.push(newProduct)
    return newProduct
  }),
  updateProduct: t.procedure.input(productSchema).mutation(({ input }) => {
    const index = products.findIndex((p) => p.id === input.id)
    if (index === -1) throw new Error("Product not found")
    products[index] = { ...products[index], ...input }
    return products[index]
  }),
  deleteProduct: t.procedure.input(z.string()).mutation(({ input }) => {
    const index = products.findIndex((p) => p.id === input)
    if (index === -1) throw new Error("Product not found")
    const [deleted] = products.splice(index, 1)
    return deleted
  }),
})

export type AppRouter = typeof appRouter
