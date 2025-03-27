import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

import { useAppStore } from '../../../store'
import { formatCurrency } from '../../../helpers'
import { Separation } from '../../../components/Separation'

import { StarRating } from './StarRating'
import { ReviewComment } from './ReviewComment'
import { Spiner } from '../../../components/Spiner'

export const InfoProduct = () => {
    const { product } = useParams()
    const { selectedProduct, fetchProduct, addToCart, isLoadingProductInfo } =
        useAppStore()
    const [currentImage, setCurrentImage] = useState(0)

    //HACEMOS FETCH AL PRODUCTO SELECCIONADO
    useEffect(() => {
        console.log('cambie')
        if (product) {
            fetchProduct(product)
        }
    }, [product, fetchProduct])

    //OBTENEMOS ALGUNOS DATOS NECESARIOS PARA CONDICIONALES
    const images = selectedProduct?.images || []
    const reviews = selectedProduct?.reviews || []
    const hasImages = images.length > 0

    //OBTENEMOS LA SIGUIENTE IMAGEN
    const nextImage = () => {
        if (hasImages) setCurrentImage((prev) => (prev + 1) % images.length)
    }

    //OBTENEMOS LA ANTERIOR IMAGEN
    const prevImage = () => {
        if (hasImages)
            setCurrentImage(
                (prev) => (prev - 1 + images.length) % images.length
            )
    }

    if (isLoadingProductInfo) {
        return <Spiner />
    }

    //SI NO HAY PRODUCTO SELECCIONADO DEVOLVEMOS UN NOT FOUND
    if (!selectedProduct) {
        return <p>NO EXISTE</p>
    }

    return (
        <section className='flex gap-20'>
            {/* CONTENEDOR DE IMAGENES */}
            <div className='relative w-[700px] h-fit overflow-hidden aspect-square'>
                <AnimatePresence mode='wait'>
                    {hasImages ? (
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt={`Imagen ${currentImage + 1}`}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className='w-full aspect-square bg-[#e5e1dc]'
                        />
                    ) : (
                        <p className='text-center'>No hay imágenes</p>
                    )}
                </AnimatePresence>

                {/* BOTONES DE NEXT Y BEFORE DE LAS FOTOS */}
                {images.length > 1 && (
                    <>
                        <button
                            className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 disabled:opacity-50'
                            onClick={prevImage}
                            disabled={images.length <= 1}
                        >
                            ◀
                        </button>
                        <button
                            className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 disabled:opacity-50'
                            onClick={nextImage}
                            disabled={images.length <= 1}
                        >
                            ▶
                        </button>
                    </>
                )}
            </div>

            {/* INFORMACION DEL PRODUCTO */}
            <div className='flex flex-col gap-4 w-[400px]'>
                <h3 className='uppercase text-4xl font-black'>
                    {selectedProduct.title}
                </h3>
                <p className='uppercase text-gray-400 text-xl'>
                    {selectedProduct.brand}
                </p>
                <p className='text-2xl font-bold'>
                    {formatCurrency(selectedProduct.price)}
                </p>
                <Separation />
                <button
                    className='bg-zinc-900 text-white text-2xl font-semibold w-full py-3 cursor-pointer outline-none transition-colors duration-200 hover:bg-zinc-900/80'
                    onClick={() =>
                        selectedProduct && addToCart(selectedProduct)
                    }
                >
                    AGREGAR AL CARRITO
                </button>
                <Separation />
                <p>{selectedProduct.description}</p>
                <Separation />
                <StarRating
                    rating={selectedProduct.rating}
                    size={4}
                />
                <Separation />

                {/* COMENTARIOS DE LOS PRODUCTOS */}
                <p>Algunos comentarios:</p>
                <div className='grid grid-cols-1 gap-3'>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <ReviewComment
                                key={review.reviewerEmail}
                                review={review}
                            />
                        ))
                    ) : (
                        <p>No hay comentarios aún</p>
                    )}
                </div>
            </div>
        </section>
    )
}

// ESTILOS SIN FRAMER MOTION SOLO TAILWIND PARA LA VISTA DE LAS IMAGENES

// <div className='relative w-[400px] h-[500px] overflow-hidden'>
//     {product.images.map((img, index) => (
//         <img
//             key={index}
//             src={img}
//             alt={`Imagen ${index + 1}`}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
//                 index === currentImage ? 'opacity-100' : 'opacity-0'
//             }`}
//         />
//     ))}

//     {/* Botones de navegación */}
//     <button
//         className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2'
//         onClick={prevImage}
//     >
//         ◀
//     </button>
//     <button
//         className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2'
//         onClick={nextImage}
//     >
//         ▶
//     </button>
// </div>
