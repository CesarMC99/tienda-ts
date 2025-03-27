import { Link } from 'react-router'
import { formatCurrency } from '../../../helpers/moneyFormatting'
import { Product } from '../../../types'

interface CardProductProps {
    product: Product
}

export const CardProduct = ({ product }: CardProductProps) => {
    return (
        <article className=' flex flex-col items-start gap-1 h-[470px] w-[350px]'>
            {/* TITULO - IMAGEN */}
            <Link
                to={`/producto/${product.title}`}
                className='w-full'
            >
                <div className='group bg-[#e5e1dc] aspect-square overflow-hidden'>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className='w-full h-full group-hover:scale-110 transition-transform duration-700'
                    />
                </div>
            </Link>
            {/* MARCA DEL PRODUCTO */}
            <span className='text-gray-400'>
                {product.brand ? product.brand : 'GENERIC'}
            </span>
            {/* TITULO DEL PRODUCTO */}
            <Link to={`/producto/${product.title}`}>
                <h4 className='font-black'>{product.title}</h4>
            </Link>
            {/* PRECIO DEL PRODUCTO */}
            <span className='font-black'>{formatCurrency(product.price)}</span>
        </article>
    )
}
