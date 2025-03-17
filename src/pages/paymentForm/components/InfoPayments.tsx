import { FaArrowRight } from 'react-icons/fa'
import { useAppStore } from '../../../store'
// import { useMemo } from 'react'
import { formatCurrency } from '../../../helpers'

export const InfoPayment = () => {
    const { productsTotalPrice } = useAppStore()

    return (
        <>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <span className='text-sm text-stone-500 font-medium'>
                        Subtotal
                    </span>
                    <span className='text-sm font-bold text-black'>
                        {formatCurrency(productsTotalPrice)}
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm text-stone-500 font-medium'>
                        Descuento
                    </span>
                    <span className='text-sm font-bold text-black'>$0</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm text-black font-medium'>
                        Total
                    </span>
                    <span className='text-sm font-bold text-black'>
                        {formatCurrency(productsTotalPrice)}
                    </span>
                </div>
            </div>

            <button className='bg-black text-white flex justify-center items-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:scale-105'>
                Pagar {formatCurrency(productsTotalPrice)}
                <FaArrowRight size={14} />
            </button>
        </>
    )
}
