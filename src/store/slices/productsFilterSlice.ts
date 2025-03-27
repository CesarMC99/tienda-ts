import { StateCreator } from 'zustand'
import { getProductsByCategorie } from '../../services'
import { Category, Product } from '../../types'

export type ProductsFilterType = {
    productsFilterByCategory: Product[]
    isLoadingProductsFilter: boolean
    selectedCategories: string[]
    currentFilteredPage: number
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
    isLoadingProductsFilter: false,
    selectedCategories: [],
    currentFilteredPage: 1,
    fetchProductsBySelectedCategories: async () => {
        set({ isLoadingProductsFilter: true })
        const { selectedCategories } = get()
        let allProducts: Product[] = []

        //HACEMOS FETCH DE LOS PRODUCTOS DE CADA CATEGORIA GUARDADA EN SELECTEDCATEGORIES
        for (const category of selectedCategories) {
            const products = await getProductsByCategorie(category)
            if (products) {
                allProducts = [...allProducts, ...products]
            }
        }

        set({
            productsFilterByCategory: allProducts,
            currentFilteredPage: 1,
            isLoadingProductsFilter: false,
        })
    },
    toggleCategory: (categorySlug: Category['slug'], isChecked: boolean) => {
        set((state) => ({
            selectedCategories: isChecked
                ? // SI ES TRUE ISCHECKED
                  // HACEMOS UN SPREAD Y AÑADIMOS LA CATEGORIA
                  [...state.selectedCategories, categorySlug]
                : // SI ES FALSE ISCHECKED
                  // A TRAVEZ DEL FILTER QUITAMOS LA CATEGORIA
                  state.selectedCategories.filter(
                      (category) => category !== categorySlug
                  ),
        }))
        //HACEMOS UN FETCH DE TODAS LAS CATEGORIAS DE SELECTEDCATEGORIES
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
