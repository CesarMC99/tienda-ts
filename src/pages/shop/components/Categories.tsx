import { useEffect } from 'react'
import { useAppStore } from '../../../store'
import { CategoryInput } from './CategoryInput'

export const Categories = () => {
    const { categories, fetchCategories } = useAppStore()

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <section className='w-[15%]  flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>FILTROS</h2>
            <ul className='flex flex-col gap-2 p-2'>
                {categories.map((category) => (
                    <CategoryInput
                        key={category.name}
                        category={category}
                    />
                ))}
            </ul>
        </section>
    )
}
