import { AiFillDelete } from 'react-icons/ai'
import { RiAddFill, RiSubtractLine } from 'react-icons/ri'
import { useAppStore } from '../../../store'
import { formatCurrency } from '../../../helpers'
import { Separation } from '../../../components/Separation'
import { CartProduct } from '../../../types'

interface ItemCartProps {
    product: CartProduct
}

export const ItemCart = ({ product }: ItemCartProps) => {
    const { addQuantity, decreaseQuantity, deleteProductFromCart } =
        useAppStore()

    return (
        <>
            <article className='grid grid-cols-5 place-items-center'>
                {/* IMAGEN DEL PRODUCTO */}
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='bg-[#e5e1dc] w-[150px]'
                />
                {/* TITULO DEL ARTICULO */}
                <h3 className='text-zinc-700 text-xl font-bold'>
                    {product.title}
                </h3>
                {/* PRECIO TOTAL */}
                <p className='text-zinc-700 text-xl font-bold'>
                    {formatCurrency(product.totalPrice)}
                </p>
                {/* BOTONES AGREGAR Y DISMINUIR CANTIDAD */}
                <div className='flex items-center gap-3'>
                    <button
                        className='p-2 bg-red-500 rounded-[50%] cursor-pointer hover:bg-red-300'
                        onClick={() => decreaseQuantity(product.id)}
                    >
                        <RiSubtractLine />
                    </button>

                    <p className='text-xl font-semibold'>{product.cantidad}</p>
                    <button
                        className='p-2 bg-green-500 rounded-[50%] cursor-pointer hover:bg-green-300'
                        onClick={() => addQuantity(product.id)}
                    >
                        <RiAddFill />
                    </button>
                </div>
                {/* BOTON ELIMINAR PRODUCTO */}
                <button
                    className='text-3xl cursor-pointer hover:text-red-800'
                    onClick={() => deleteProductFromCart(product.id)}
                >
                    <AiFillDelete />
                </button>
            </article>

            <Separation />
        </>
    )
}
