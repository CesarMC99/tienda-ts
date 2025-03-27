import { StateCreator } from 'zustand'
import { Product } from '../../types'
import { getProducts } from '../../services'

export type ProductsType = {
    products: Product[]
    isLoadingProducts: boolean
    currentPage: number
    fetchProducts: () => Promise<void>
    nextPage: () => void
    beforePage: () => void
}

export const createProductsSlice: StateCreator<ProductsType> = (set) => ({
    products: [],
    isLoadingProducts: true,
    currentPage: 1,
    fetchProducts: async () => {
        set({ isLoadingProducts: true })
        const products = await getProducts()
        set({
            products,
            isLoadingProducts: false,
        })
    },
    nextPage: () => {
        const maxPages = Math.ceil(194 / 12)

        set((state) => ({
            currentPage:
                maxPages === state.currentPage
                    ? state.currentPage
                    : state.currentPage + 1,
        }))
    },
    beforePage: () => {
        set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })) // Evita valores negativos
    },
})
