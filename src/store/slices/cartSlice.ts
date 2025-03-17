import { StateCreator } from 'zustand'
import { CartProduct, Product } from '../../types'

export type CartType = {
    cartOfProducts: CartProduct[] //carrito
    productsTotalPrice: number
    addToCart: (product: Product) => void // carrito
    productExists: (id: Product['id']) => boolean // carrito
    addQuantity: (id: CartProduct['id']) => void // carrito
    decreaseQuantity: (id: CartProduct['id']) => void // carrito
    deleteProductFromCart: (id: CartProduct['id']) => void // carrito
    totalPriceAllProducts: (delivery: 'express' | 'free') => void
}

export const createCartSlice: StateCreator<CartType> = (set, get) => ({
    cartOfProducts: [],
    // PROBANDO
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
    // PROBANDO
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
})
