import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'
import { Product } from '../../../types'

interface StarRatingProps {
    rating: Product['rating']
    maxStars?: number
    size?: number
}

export const StarRating = ({
    rating,
    maxStars = 5,
    size = 3,
}: StarRatingProps) => {
    const stars = []

    for (let i = 0; i < maxStars; i++) {
        // ESTRELLA COMPLETA
        if (rating >= i + 1) {
            stars.push(
                <IoMdStar
                    key={i}
                    className={`text-yellow-500 text-${size}xl`}
                />
            )
            // MEDIA ESTRELLA
        } else if (rating >= i + 0.5) {
            stars.push(
                <IoMdStarHalf
                    key={i}
                    className={`text-yellow-500 text-${size}xl`}
                />
            )
            // ESTRELLA VACIA
        } else {
            stars.push(
                <IoMdStarOutline
                    key={i}
                    className={`text-gray-400 text-${size}xl`}
                />
            )
        }
    }

    return <div className='flex gap-1'>{stars}</div>
}
