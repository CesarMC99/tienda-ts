import { Categories } from '.'
import { ListOfProducts } from '.'

export const Home = () => {
    return (
        <main className='flex justify-around gap-2 px-30 pt-32 pb-20'>
            <Categories />
            <ListOfProducts />
        </main>
    )
}
