import { create } from 'zustand'
import { createProductsSlice, ProductsType } from './slices/productsSlice'
import {
    createProductsFilterSlice,
    ProductsFilterType,
} from './slices/productsFilterSlice'
import { CategoriesType, createCategoriesSlice } from './slices/categoriesSlice'
import {
    createProductInfoSlice,
    ProductInfoType,
} from './slices/productInfoSlice'
import { CartType, createCartSlice } from './slices/cartSlice'

export const useAppStore = create<
    ProductsType &
        ProductsFilterType &
        CategoriesType &
        ProductInfoType &
        CartType
>((...a) => ({
    ...createProductsSlice(...a),
    ...createProductsFilterSlice(...a),
    ...createCategoriesSlice(...a),
    ...createProductInfoSlice(...a),
    ...createCartSlice(...a),
}))
