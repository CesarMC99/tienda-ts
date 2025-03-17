import axios from 'axios'
import { ProductsAPIResponseSchema } from '../schema/productsSchema'
import { Category } from '../types'

export const getProductsByCategorie = async (categorie: Category['slug']) => {
    try {
        const { data } = await axios(
            `https://dummyjson.com/products/category/${categorie}`
        )
        const result = ProductsAPIResponseSchema.safeParse(data.products)
        if (result.success) {
            return result.data
        } else {
            console.log('falla el comprobante de tipos de zod')
        }
    } catch (error) {
        console.error(error)
    }
}
