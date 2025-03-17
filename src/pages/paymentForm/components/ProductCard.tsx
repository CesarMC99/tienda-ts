import { formatCurrency } from '../../../helpers'
import { CartProduct } from '../../../types'

interface ProductCardProps {
    product: CartProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <li className='flex flex-col gap-4'>
            <div className='bg-white p-3 rounded-xl flex flex-col items-center gap-4 md:flex-row'>
                <div className='rounded-xl bg-[#e5e1dc] aspect-square overflow-hidden h-60 flex-1'>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col gap-3 flex-[1.5]'>
                    <h3 className='font-bold'>
                        {product.title} - {formatCurrency(product.totalPrice)}
                    </h3>
                    <p className='text-gray-500 text-sm'>
                        {product.description}
                    </p>
                </div>
            </div>
        </li>
    )
}
