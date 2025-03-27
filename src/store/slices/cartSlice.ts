import { StateCreator } from 'zustand'
import { CartProduct, Product } from '../../types'

export type CartType = {
    cartOfProducts: CartProduct[]
    productsTotalPrice: number
    addToCart: (product: Product) => void
    productExists: (id: Product['id']) => boolean
    addQuantity: (id: CartProduct['id']) => void
    decreaseQuantity: (id: CartProduct['id']) => void
    deleteProductFromCart: (id: CartProduct['id']) => void
    totalPriceAllProducts: (delivery: 'express' | 'free') => void
    clearCart: () => void
}

export const createCartSlice: StateCreator<CartType> = (set, get) => ({
    cartOfProducts: [],
    productsTotalPrice: 0,

    addToCart: (product) => {
        set((state) => {
            if (state.productExists(product.id)) {
                return {
                    cartOfProducts: state.cartOfProducts.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  cantidad: item.cantidad + 1,
                                  totalPrice: (item.cantidad + 1) * item.price,
                              } // Incrementa cantidad
                            : item
                    ),
                }
            }

            return {
                cartOfProducts: [
                    ...state.cartOfProducts,
                    { ...product, cantidad: 1, totalPrice: product.price },
                ],
            }
        })
    },
    productExists: (id) => {
        return get().cartOfProducts.some((product) => product.id === id)
    },
    addQuantity: (id) => {
        set((state) => ({
            cartOfProducts: state.cartOfProducts.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          cantidad: product.cantidad + 1,
                          totalPrice: (product.cantidad + 1) * product.price,
                      }
                    : product
            ),
        }))
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            cartOfProducts: state.cartOfProducts
                .map((product) =>
                    product.id === id
                        ? {
                              ...product,
                              cantidad: product.cantidad - 1,
                              totalPrice:
                                  (product.cantidad - 1) * product.price,
                          }
                        : product
                )
                .filter((product) => product.cantidad > 0), // Elimina si cantidad llega a 0
        }))
    },
    deleteProductFromCart: (id) => {
        set((state) => ({
            cartOfProducts: state.cartOfProducts.filter(
                (product) => product.id !== id
            ),
        }))
    },
    totalPriceAllProducts: (delivery) => {
        set((state) => {
            const baseTotal = state.cartOfProducts.reduce(
                (acc, product) => acc + product.totalPrice,
                0
            )

            const deliveryCost = delivery === 'express' ? 4.99 : 0 // Costo del envío express
            return { productsTotalPrice: baseTotal + deliveryCost }
        })
    },
    clearCart: () => {
        set({ cartOfProducts: [] })
    },
})
