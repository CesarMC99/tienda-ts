import { StateCreator } from 'zustand'
import { Category } from '../../types'
import { getCategories } from '../../services'

export type CategoriesType = {
    categories: Category[]
    loading: boolean
    fetchCategories: () => Promise<void>
}

export const createCategoriesSlice: StateCreator<CategoriesType> = (set) => ({
    categories: [],
    loading: false,
    fetchCategories: async () => {
        set({ loading: true })
        const categories = await getCategories()
        set({
            categories,
            loading: false,
        })
    },
})
