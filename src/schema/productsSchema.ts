import { z } from 'zod'

// export const ProductAPIResponseSchema = z.object({
//     id: z.number().int().positive(),
//     title: z.string(),
//     description: z.string(),
//     category: z.string(),
//     price: z.number().positive(),
//     discountPercentage: z.number().min(0).max(100),
//     rating: z.number().min(0).max(5),
//     stock: z.number().int().nonnegative(),
//     tags: z.array(z.string()), // Puede estar vacío
//     brand: z.string(),
//     sku: z.string(),
//     weight: z.number().nonnegative(),
//     dimensions: z.record(z.any()), // Objeto vacío en este caso
//     warrantyInformation: z.string(),
//     shippingInformation: z.string(),
//     availabilityStatus: z.string(),
//     reviews: z.array(z.any()), // Puede estar vacío
//     returnPolicy: z.string(),
//     minimumOrderQuantity: z.number().int().positive(),
//     meta: z.record(z.any()), // Objeto vacío en este caso
//     images: z.array(z.string()), // Array de imágenes, vacío en este caso
//     thumbnail: z.string().url(), // URL válida
// })

// export const ProductsAPIResponseSchema = z.array(ProductAPIResponseSchema)

export const Review = z.object({
    rating: z.number(),
    comment: z.string(),
    date: z.string(),
    reviewerName: z.string(),
    reviewerEmail: z.string(),
})

export const ProductAPIResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    rating: z.number(),
    tags: z.array(z.string()),
    brand: z.string().optional(),
    reviews: z.array(Review),
    images: z.array(z.string()),
    thumbnail: z.string(),
})

export const ProductsAPIResponseSchema = z.array(ProductAPIResponseSchema)

export const CategoryAPIResponseSchema = z.object({
    slug: z.string(),
    name: z.string(),
    url: z.string(),
})

export const CategoriesAPIResponseSchema = z.array(CategoryAPIResponseSchema)
