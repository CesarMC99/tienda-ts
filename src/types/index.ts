import { z } from 'zod'
import {
    CategoryAPIResponseSchema,
    ProductAPIResponseSchema,
    Review,
} from '../schema/productsSchema'

export type Product = z.infer<typeof ProductAPIResponseSchema>

export type Review = z.infer<typeof Review>

export type Category = z.infer<typeof CategoryAPIResponseSchema>

export type CartProduct = Product & { cantidad: number; totalPrice: number }
