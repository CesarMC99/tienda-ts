import { useNavigate } from 'react-router'
import { Separation } from '../../components/Separation'
import { useAppStore } from '../../store/useAppStore'
import { ItemCart } from './components/ItemCart'

export const Cart = () => {
    const navigate = useNavigate()
    const { cartOfProducts } = useAppStore()

    //REDIRECCION AL FORMULARIO DE PAGA
    const goPay = () => {
        navigate('/carrito/pagar')
    }

    return (
        <main className='flex flex-col items-center gap-8 p-30'>
            <h2 className='text-center font-black text-4xl'>CARRITO</h2>
            <Separation />
            {/* SI NO HAY PRODUCTOS EN EL CARRITO */}
            {cartOfProducts.length === 0 && (
                <h3 className='text-center font-bold text-2xl'>
                    No hay productos en el carrito
                </h3>
            )}

            {/* SI HAY PRODUCTOS LO ITERAMOS */}
            <div className='flex flex-col gap-8 w-full'>
                {cartOfProducts.map((product) => (
                    <ItemCart
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            {/* BOTON PARA IR A PAGAR */}
            <button
                className={`bg-black text-white text-xl font-semibold px-8 py-4 rounded-md ${
                    cartOfProducts.length === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                }`}
                onClick={goPay}
                disabled={cartOfProducts.length === 0}
            >
                IR A PAGAR
            </button>
        </main>
    )
}
