import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '../layout/Layout'
import { Cart } from '../pages/cart/Cart'
import { Home } from '../pages/shop'
import { Product } from '../pages/product'
import { PaymentPage } from '../pages/paymentForm/PaymentPage'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path='/'
                        element={<Home />}
                        index
                    />
                    <Route
                        path='/producto/:product'
                        element={<Product />}
                    />
                    <Route
                        path='/carrito'
                        element={<Cart />}
                    />
                    <Route
                        path='/carrito/pagar'
                        element={<PaymentPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
