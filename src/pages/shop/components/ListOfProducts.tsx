import { useAppStore } from '../../../store'
import { CardProduct } from './CardProduct'
import { useState } from 'react'

export const ListOfProducts = () => {
    const {
        products,
        productsFilterByCategory,
        selectedCategories,
        currentPage,
        currentFilteredPage,
        nextPage,
        beforePage,
        nextFilteredPage,
        beforeFilteredPage,
    } = useAppStore()

    const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>(
        'default'
    )

    // Verificar si se están aplicando filtros
    const isFiltering = selectedCategories.length > 0

    // Ordenar todos los productos antes de la paginación
    const sortedProducts = [
        ...(isFiltering ? productsFilterByCategory : products),
    ].sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price
        if (sortOrder === 'desc') return b.price - a.price
        return 0 // default mantiene el orden original
    })

    // Aplicar paginación sobre los productos ya ordenados
    const displayedProducts = sortedProducts.slice(
        (isFiltering ? currentFilteredPage - 1 : currentPage - 1) * 12,
        (isFiltering ? currentFilteredPage : currentPage) * 12
    )

    return (
        <section>
            {/* Selector de ordenamiento */}
            <div className='mb-4 flex justify-end'>
                <div className='flex justify-center items-center'>
                    <label className='mr-2 font-medium text-gray-700'>
                        Ordenar por:
                    </label>
                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(
                                e.target.value as 'default' | 'asc' | 'desc'
                            )
                        }
                        className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='default'>Predeterminado</option>
                        <option value='asc'>Precio: Menor a Mayor</option>
                        <option value='desc'>Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            {/* Lista de productos */}
            <div
                className='grid grid-cols-1 gap-8 place-items-center
                           md:grid-cols-2
                           lg:grid-cols-3'
            >
                {displayedProducts.map((product) => (
                    <CardProduct
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className='mt-6 flex justify-center items-center gap-4'>
                <button
                    onClick={isFiltering ? beforeFilteredPage : beforePage}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
                >
                    Anterior
                </button>
                <h4 className='text-lg font-semibold'>
                    {isFiltering ? currentFilteredPage : currentPage}
                </h4>
                <button
                    onClick={isFiltering ? nextFilteredPage : nextPage}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
                >
                    Siguiente
                </button>
            </div>
        </section>
    )
}
