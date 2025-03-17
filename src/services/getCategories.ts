import axios from 'axios'
import { CategoriesAPIResponseSchema } from '../schema/productsSchema'

export const getCategories = async () => {
    try {
        const { data } = await axios(
            `https://dummyjson.com/products/categories`
        )
        const result = CategoriesAPIResponseSchema.safeParse(data)
        if (result.success) {
            return result.data
        } else {
            console.log('falla el comprobante de tipos de zod')
        }
    } catch (error) {
        console.error(error)
    }
}
