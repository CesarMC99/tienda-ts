import { useAppStore } from '../../../store'
import { Category } from '../../../types'

interface CategoryProps {
    category: Category
}

export const CategoryInput = ({ category }: CategoryProps) => {
    const { selectedCategories, toggleCategory } = useAppStore()
    return (
        <li
            key={category.name}
            className='flex justify-between'
        >
            <label
                htmlFor={category.name}
                className='text-lg font-medium'
            >
                {category.name}
            </label>
            <input
                type='checkbox'
                id={category.name}
                className='size-5'
                checked={selectedCategories.includes(category.slug)}
                onChange={(e) =>
                    toggleCategory(category.slug, e.target.checked)
                }
            />
        </li>
    )
}
