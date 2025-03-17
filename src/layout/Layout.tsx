import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAppStore } from '../store/useAppStore'
import { NavBar } from '../components/NavBar'

export const Layout = () => {
    const { fetchProducts, fetchCategories } = useAppStore()

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    return (
        <>
            <header>
                <NavBar />
            </header>

            <>
                <Outlet />
            </>
        </>
    )
}
