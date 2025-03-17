import axios from 'axios'
import { ProductsAPIResponseSchema } from '../schema/productsSchema'

export const getProducts = async () => {
    try {
        const { data } = await axios(
            `https://dummyjson.com/products?limit=1000`
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
