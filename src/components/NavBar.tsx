import { BsCart3 } from 'react-icons/bs'
import { useAppStore } from '../store/useAppStore'
import { NavLink } from 'react-router'
import logo from '../assets/logo/logo.png'

const links = [
    {
        id: 1,
        name: 'INICIO',
        link: '/',
    },
]

export const NavBar = () => {
    //RECUPERO PRODUCTOS DE CARTSLICE
    const { cartOfProducts, clearProduct } = useAppStore()

    return (
        <section className='fixed w-full bg-white px-8 py-3 shadow-xl z-10'>
            <nav className='flex items-center justify-between'>
                {/* LINKS DE LA PAGINA */}
                <ul className='flex items-center gap-8'>
                    <li className='border-4 rounded-[50%]'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-[45px] text-black'
                        />
                    </li>
                    {links.map((link) => (
                        <li key={link.id}>
                            <NavLink
                                to={link.link}
                                onClick={clearProduct}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* LINK AL CARRITO DE PRODUCTOS */}
                <NavLink
                    className='flex items-center gap-2'
                    to='/carrito'
                >
                    <span>Carrito</span>
                    <BsCart3 className='text-3xl' />
                    <span className='bg-gray-800 text-white text-center w-8 h-8 rounded-full grid place-items-center'>
                        {cartOfProducts.length}
                    </span>
                </NavLink>
            </nav>
        </section>
    )
}
