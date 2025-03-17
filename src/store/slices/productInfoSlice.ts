import { StateCreator } from 'zustand'
import { Product } from '../../types'
import { getProduct } from '../../services'

export type ProductInfoType = {
    selectedProduct: Product // selector
    fetchProduct: (product: string | undefined) => Promise<void> //selector
}

export const createProductInfoSlice: StateCreator<ProductInfoType> = (set) => ({
    selectedProduct: {} as Product,
    fetchProduct: async (nameProduct) => {
        const product = await getProduct(nameProduct)
        set({
            selectedProduct: product,
        })
    },
})
