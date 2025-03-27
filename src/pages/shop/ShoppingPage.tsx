import { Categories } from '.'
import { ListOfProducts } from '.'

export const Home = () => {
    return (
        <main className='flex justify-between gap-20 px-30 pt-32 pb-20'>
            <Categories />
            <ListOfProducts />
        </main>
    )
}
