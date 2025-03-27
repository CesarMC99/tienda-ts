import { StateCreator } from 'zustand'
import { Product } from '../../types'
import { getProduct } from '../../services'

export type ProductInfoType = {
    selectedProduct: Product | null
    isLoadingProductInfo: boolean
    fetchProduct: (product: string | undefined) => Promise<void>
    clearProduct: () => void
}

export const createProductInfoSlice: StateCreator<ProductInfoType> = (set) => ({
    selectedProduct: null,
    isLoadingProductInfo: true,
    fetchProduct: async (nameProduct) => {
        set({
            isLoadingProductInfo: true,
        })
        const product = await getProduct(nameProduct)
        set({
            selectedProduct: product,
            isLoadingProductInfo: false,
        })
    },
    clearProduct: () => {
        set({ selectedProduct: null })
    },
})
