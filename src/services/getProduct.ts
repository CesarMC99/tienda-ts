import axios from 'axios'
import { ProductAPIResponseSchema } from '../schema/productsSchema'

export const getProduct = async (nameProduct: string | undefined) => {
    try {
        const { data } = await axios(
            `https://dummyjson.com/products/search?q=${nameProduct}`
        )
        console.log(data, nameProduct)
        const result = ProductAPIResponseSchema.safeParse(data.products[0])

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.error(error)
    }
}
