import { StateCreator } from 'zustand'
import { Category } from '../../types'
import { getCategories } from '../../services'

export type CategoriesType = {
    categories: Category[]
    fetchCategories: () => Promise<void>
}

export const createCategoriesSlice: StateCreator<CategoriesType> = (set) => ({
    categories: [],
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories,
        })
    },
})
