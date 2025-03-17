import { StateCreator } from 'zustand'
import { getProductsByCategorie } from '../../services'
import { Category, Product } from '../../types'

export type ProductsFilterType = {
    productsFilterByCategory: Product[]
    selectedCategories: string[]
    currentFilteredPage: number
    fetchProductsByCategorie: (categorie: Category['slug']) => Promise<void>
    fetchProductsBySelectedCategories: () => Promise<void>
    toggleCategory: (categorySlug: Category['slug'], isChecked: boolean) => void
    nextFilteredPage: () => void
    beforeFilteredPage: () => void
}

export const createProductsFilterSlice: StateCreator<ProductsFilterType> = (
    set,
    get
) => ({
    productsFilterByCategory: [],
    selectedCategories: [],
    currentFilteredPage: 1,
    fetchProductsByCategorie: async (categorie: Category['slug']) => {
        const productsFilterByCategory = await getProductsByCategorie(categorie)
        set({
            productsFilterByCategory,
        })
    },
    fetchProductsBySelectedCategories: async () => {
        const { selectedCategories } = get()
        let allProducts: Product[] = []

        for (const category of selectedCategories) {
            const products = await getProductsByCategorie(category)
            if (products) {
                allProducts = [...allProducts, ...products]
            }
        }

        set({ productsFilterByCategory: allProducts, currentFilteredPage: 1 })
    },
    toggleCategory: (categorySlug: Category['slug'], isChecked: boolean) => {
        set((state) => ({
            selectedCategories: isChecked
                ? [...state.selectedCategories, categorySlug]
                : state.selectedCategories.filter(
                      (category) => category !== categorySlug
                  ),
        }))
        get().fetchProductsBySelectedCategories()
    },
    nextFilteredPage: () => {
        const totalFilteredPages = Math.ceil(
            get().productsFilterByCategory.length / 12
        )
        set((state) => ({
            currentFilteredPage:
                state.currentFilteredPage < totalFilteredPages
                    ? state.currentFilteredPage + 1
                    : state.currentFilteredPage,
        }))
    },
    beforeFilteredPage: () => {
        set((state) => ({
            currentFilteredPage: Math.max(state.currentFilteredPage - 1, 1),
        }))
    },
})
